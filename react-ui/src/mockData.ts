// src/mockData.ts
import { Article } from './types';

export const mockArticles: Article[] = [
  {
    "id": 1,
    "title": "Chatbots Magic: Beginner’s Guidebook",
    "source_url": "https://beyondchats.com/blogs/introduction-to-chatbots/",
    "image_url": null,
    "original_content": "Embrace the evolution by understanding your website’s unique needs and leveraging Chatbots to create meaningful user experiences.\nIn the fast-paced world of technology, the buzz around\n“Chatbots”\nis louder than ever! Whether it’s for customer service or your virtual helper, these cool digital buddies have become an essential part of our online world. Wondering what makes this virtual chit-chat so special? Well, get ready for an awesome adventure!\nWe’re diving deep into the fascinating world of Chatbots. We’ll uncover what they are, why they matter, how they work, and why everyone’s talking about these digital pals. Ready for a tech-savvy journey? Let’s roll!\nWhat is an AI Chatbot?\nImagine having a personal assistant available 24/7, ready to respond to your queries, guide you through tasks, and engage in meaningful conversations. That’s precisely what an AI chatbot is designed to do. It is a computer program equipped with artificial intelligence that enables it to simulate natural language conversations with users.\nUnlike static web pages or traditional apps, chatbots bring a human touch to digital interactions. They leverage natural language processing (NLP) and machine learning algorithms to understand user inputs and provide relevant responses. This ability to understand and respond in real-time makes chatbots a dynamic and engaging tool for various applications.\nWhy Exactly Do You Need a Chatbot?\nThe question lingers: Why are chatbots garnering so much attention, and why do businesses and websites increasingly find them indispensable?\n1. Enhanced Customer Engagement\n: It redefines customer interaction by offering instant responses and personalized experiences. Whether it’s answering frequently asked questions or guiding users through product selections, it keeps customers engaged and satisfied.\n2. 24/7 Availability:\nUnlike human agents, chatbots don’t need to sleep or take breaks. They provide round-the-clock support, ensuring that customer queries are addressed promptly, regardless of the time of day.",
    "rewritten_content": "This is the rewritten article content. It has been restructured to follow the style of high-ranking articles, focusing on clarity, structure, and a professional tone. It includes an introduction, distinct sections for key topics, and a concluding summary, all while preserving the core information from the original source."
  }
];

// This simulates an API call
export const fetchArticles = async (): Promise<Article[]> => {
  try {
    const response = await fetch('http://localhost:8000/api/articles');
    if (!response.ok) {
      throw new Error('Failed to fetch articles from API');
    }
    const articles = await response.json();
    
    // If no articles from API, return mock articles
    if (articles.length === 0) {
      return mockArticles;
    }
    
    return articles;
  } catch (error) {
    console.warn('Could not fetch from API, using mock data:', error);
    // Fallback to mock data if API is not available
    return mockArticles;
  }
};
