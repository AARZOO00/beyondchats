// src/components/ArticleDetail.tsx
import React from 'react';
import { Article } from '../types';

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onBack }) => {
  return (
    <div className="article-detail">
      <button onClick={onBack} className="back-button">
        &larr; Back to List
      </button>
      <h1>{article.title}</h1>
      <div className="comparison-container">
        <div className="content-column">
          <h2>Original Content</h2>
          <pre className="content-box">{article.original_content}</pre>
        </div>
        <div className="content-column">
          <h2>Rewritten Content</h2>
          <pre className="content-box">{article.rewritten_content || 'No rewritten content available.'}</pre>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
