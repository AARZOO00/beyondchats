require("dotenv").config();
const axios = require("axios");
const cheerio = require("cheerio");

const LARAVEL_API_BASE =
  process.env.LARAVEL_API_BASE || "http://127.0.0.1:8000/api";
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

function makeUpdatedTitle(originalTitle) {
  if (originalTitle.trim().endsWith()) {
    return originalTitle;
  }
  return `${originalTitle}`;
}

// ------------ Helper: Latest Article from Laravel ---------------
async function fetchLatestArticle() {
  const res = await axios.get(`${LARAVEL_API_BASE}/articles`);
  const list = res.data;

  if (!Array.isArray(list) || list.length === 0) {
    throw new Error("No articles found in Laravel API");
  }

  list.sort((a, b) => b.id - a.id);
  const latest = list[0];

  console.log("Latest article from Laravel:", latest.id, latest.title);
  return latest;
}

// ------------ Helper: Google Search ----------------------------
async function searchGoogle(query) {
  const q = encodeURIComponent(query);
  const url = `https://www.google.com/search?q=${q}&num=10`;

  try {
    const res = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      },
    });

    const $ = cheerio.load(res.data);
    const results = [];

    $("a").each((_, el) => {
      const href = $(el).attr("href") || "";
      if (!href.startsWith("/url?q=")) return;

      const actualUrl = decodeURIComponent(
        href.split("/url?q=")[1].split("&")[0]
      );

      if (
        actualUrl.includes("google.") ||
        actualUrl.includes("youtube.com") ||
        actualUrl.includes("beyondchats.com")
      ) {
        return;
      }

      if (!results.includes(actualUrl)) {
        results.push(actualUrl);
      }
    });

    const topTwo = results.slice(0, 2);
    console.log("Top 2 reference URLs:", topTwo);
    return topTwo;
  } catch (e) {
    console.error("Google search failed:", e.message);
    return [];
  }
}

// ------------ Helper: Scrape blog content ----------------------
async function scrapeMainContent(url) {
  try {
    const res = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      },
      timeout: 15000,
    });

    const $ = cheerio.load(res.data);

    const candidates = [
      "article",
      "main article",
      "main",
      ".post-content",
      ".entry-content",
      ".blog-content",
    ];

    let text = "";
    for (const sel of candidates) {
      if ($(sel).length) {
        text = $(sel)
          .text()
          .replace(/\s+\n/g, "\n")
          .trim();
        if (text) break;
      }
    }

    if (!text) {
      text = $("p")
        .map((_, el) => $(el).text())
        .get()
        .join("\n\n")
        .replace(/\s+\n/g, "\n")
        .trim();
    }

    if (!text || text.length < 300) {
      console.warn("Scraped content too short from:", url);
      return null;
    }

    console.log(
      "Scraped content length from",
      url,
      "=>",
      text.length,
      "chars"
    );
    return text;
  } catch (e) {
    console.error("Error scraping", url, e.message);
    return null;
  }
}

// ------------ Helper: LLM rewrite via OpenRouter ---------------
async function rewriteArticle(original, refContents) {
  const validRefs = Array.isArray(refContents) ? refContents : [];

  const refsText = validRefs
    .map(
      (r, i) =>
        `Reference ${i + 1} (URL: ${r.url}):\n${r.content.slice(0, 2000)}`
    )
    .join("\n\n");

  const prompt = `
You are an SEO content writer.

Original article:
"${original.original_content}"

${refsText ? "Reference articles:\n" + refsText : ""}

Task:
Rewrite the original article so that:
- Preserve the main meaning.
- Improve clarity and readability.
- Use headings and short paragraphs.
- Be suitable for a tech startup blog.

Return only the rewritten article text, no explanations.
`;

  if (!OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY is missing in .env");
  }

  const res = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "openai/gpt-4o-mini", // ya koi aur OpenRouter-supported model
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      },
    }
  );

  const text = res.data.choices[0].message.content.trim();
  console.log("Received rewritten article, length:", text.length);
  return text;
}

// ------------ Helper: Publish updated article ------------------
async function publishUpdatedArticle(original, rewrittenText, refContents) {
  const references = (Array.isArray(refContents) ? refContents : []).map(
    (r) => r.url
  );

  const payload = {
    title: original.title + " (Updated)",
    original_content: original.original_content,
    rewritten_content: rewrittenText,
    references,
  };

  const res = await axios.post(`${LARAVEL_API_BASE}/articles`, payload);
  console.log("Published updated article id:", res.data.id);
}

// ------------ Main Flow ----------------------------------------
async function main() {
  const latest = await fetchLatestArticle();

  const refUrls = await searchGoogle(latest.title);
  if (refUrls.length === 0) {
    console.warn(
      "No suitable reference URLs found, continuing without them."
    );
  }

  const refContents = [];
  for (const url of refUrls) {
    const content = await scrapeMainContent(url);
    if (content) refContents.push({ url, content });
  }

  if (refContents.length === 0) {
    console.warn(
      "Failed to scrape reference content, rewriting using only original article."
    );
  }

  const rewritten = await rewriteArticle(latest, refContents);

  await publishUpdatedArticle(latest, rewritten, refContents);

  console.log("Done.");
}

// Run script
main().catch((err) => {
  console.error("Fatal error:", err);
});
