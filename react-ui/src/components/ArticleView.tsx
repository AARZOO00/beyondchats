// src/components/ArticleView.tsx
import React, { useState, useEffect } from "react";
import type { Article } from "../types";
import ArticleDetail from "./ArticleDetail";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8001";

const ArticleView: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        setLoading(true);
        const res = await axios.get<Article[]>(`${API_BASE_URL}/api/articles`);
        const list = (res.data || []).sort((a, b) => b.id - a.id);
        setArticles(list);
        setSelectedArticle(list[0] || null); // default first article
      } catch (err) {
        setError("Failed to fetch articles.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  if (loading) {
    return <div className="centered-state">Loading articles...</div>;
  }

  if (error) {
    return <div className="centered-state error-message">{error}</div>;
  }

  return (
    <div className="app-container">
      {/* LEFT SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Article Rewriter Dashboard</h1>
          <p className="sidebar-subtitle">
            Browse articles fetched from the Laravel API.
          </p>
        </div>

        <ul className="article-list">
          {articles.map((article) => (
            <li
              key={article.id}
              className={
                "article-list-item " +
                (selectedArticle?.id === article.id ? "active" : "")
              }
              onClick={() => setSelectedArticle(article)}
            >
              {article.title}
            </li>
          ))}
        </ul>
      </aside>

      {/* RIGHT DETAIL CARD */}
      <main className="main-content">
        {selectedArticle ? (
          <ArticleDetail article={selectedArticle} />
        ) : (
          <div className="centered-state">
            Select an article from the left panel.
          </div>
        )}
      </main>
    </div>
  );
};

export default ArticleView;
