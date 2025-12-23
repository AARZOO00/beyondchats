const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");
require("dotenv").config();

// --- Configuration ---
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const LARAVEL_API_URL = process.env.LARAVEL_API_URL || "http://127.0.0.1:8000";
const GEMINI_MODEL = "gemini-1.5-flash";

if (!GEMINI_API_KEY) {
  console.error("Fatal Error: GEMINI_API_KEY is not defined in your .env file.");
  process.exit(1);
}

// --- Main Execution ---
async function main() {
  console.log("Starting content engine...");

  let latestArticle;

  // 1) Fetch latest article from Laravel
  try {
    console.log(`Fetching articles from ${LARAVEL_API_URL}/api/articles...`);
    const response = await axios.get(`${LARAVEL_API_URL}/api/articles`);
    const articles = response.data.data || response.data; // paginated or plain

    if (!Array.isArray(articles) || articles.length === 0) {
      console.log("No articles found in the database. Exiting.");
      return;
    }

    // Pick article with highest id
    latestArticle = articles.reduce((latest, current) =>
      latest.id > current.id ? latest : current
    );

    console.log(
      `Selected latest article (ID: ${latestArticle.id}): "${latestArticle.title}"`
    );
  } catch (error) {
    handleApiError(error, "Failed to fetch articles from Laravel API");
    return;
  }

  // 2) Call Gemini to rewrite content
  try {
    console.log(`Generating rewritten content with ${GEMINI_MODEL}...`);

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      generationConfig: { responseMimeType: "application/json" },
    });

    const prompt = buildPrompt(latestArticle.original_content);
    const result = await model.generateContent(prompt);
    const geminiResponseText = result.response.text();

    let geminiOutput;
    try {
      geminiOutput = JSON.parse(geminiResponseText);

      if (
        !geminiOutput.rewrittenContent ||
        !Array.isArray(geminiOutput.references)
      ) {
        throw new Error(
          "Gemini output missing 'rewrittenContent' or 'references' array."
        );
      }
    } catch (parseError) {
      console.error("Error: Failed to parse Gemini's JSON response.");
      console.error("Gemini raw response:", geminiResponseText);
      console.error("Parsing error details:", parseError.message);
      return;
    }

    console.log("Successfully generated content from Gemini.");

    // 3) Update article in Laravel
    const updatePayload = {
      rewritten_content: geminiOutput.rewrittenContent,
      references: geminiOutput.references || [],
    };

    console.log(
      `Updating article (ID: ${latestArticle.id}) in Laravel API...`
    );
    await axios.put(
      `${LARAVEL_API_URL}/api/articles/${latestArticle.id}`,
      updatePayload
    );

    console.log("\n✅ Success! Article rewritten and updated.");
    console.log("-----------------------------------------");
    console.log(`Article Title: ${latestArticle.title}`);
    console.log("Rewritten Content Snippet:");
    console.log(
      `"${updatePayload.rewritten_content.substring(0, 200)}..."`
    );
    console.log("-----------------------------------------");
  } catch (error) {
    if (error.response) {
      handleApiError(
        error,
        `An API error occurred during processing for article ID ${latestArticle.id}`
      );
    } else if (error.request) {
      console.error(
        "Network Error: Could not connect to the service. Please check your network and the service status."
      );
      console.error(`Details: ${error.message}`);
    } else {
      console.error("An unexpected error occurred:", error.message);
    }
  }
}

// --- Helper Functions ---

function buildPrompt(originalContent) {
  return `
You are an expert content strategist and SEO specialist.

Rewrite the following article to be professional, engaging, and highly optimized for search engines.

Your task is to:
1. Preserve the core meaning, facts, and intent of the original text.
2. Improve the structure using clear headings (##) and subheadings (###).
3. Use an authoritative but accessible tone.
4. Improve readability without keyword stuffing.
5. Generate 3–5 realistic, relevant reference URLs.

Return a single, valid JSON object with:
{
  "rewrittenContent": "full rewritten article as Markdown string",
  "references": ["https://example.com/1", "..."]
}

Original article:
---
${originalContent}
---
`;
}

function handleApiError(error, contextMessage) {
  console.error(`Error: ${contextMessage}.`);
  if (error.response) {
    console.error(
      `  - Status: ${error.response.status} ${error.response.statusText}`
    );
    console.error(
      `  - URL: ${error.config.method.toUpperCase()} ${error.config.url}`
    );
    const responseData = error.response.data;
    if (typeof responseData === "object") {
      console.error(`  - Details: ${JSON.stringify(responseData, null, 2)}`);
    } else {
      console.error(`  - Response: ${responseData}`);
    }
  } else {
    console.error(`  - Details: ${error.message}`);
  }
}

main();
