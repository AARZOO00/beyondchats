// src/components/ArticleDetail.tsx
import React from "react";
import type { Article } from "../types";

interface ArticleDetailProps {
  article: Article;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {
  return (
    <div className="article-detail-card">
      <header className="article-header">
        <h2>{article.title}</h2>
        <p className="article-meta">Latest version • ID #{article.id}</p>
      </header>

      <div className="article-body">
        <section className="content-section">
          <h3>Original Content</h3>
          <div className="content-block">
            {article.original_content || "No original content available."}
          </div>
        </section>

        <section className="content-section">
          <h3>Rewritten Content</h3>
          <div className="content-block">
            {article.rewritten_content || "No rewritten content available."}
          </div>
        </section>

        {Array.isArray(article.references) && article.references.length > 0 && (
          <section className="content-section">
            <h3>References</h3>
            <ul className="reference-list">
              {article.references.map((url) => (
                <li key={url}>
                  <a href={url} target="_blank" rel="noreferrer">
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default ArticleDetail;
