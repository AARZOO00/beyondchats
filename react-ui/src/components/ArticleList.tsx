// src/components/ArticleList.tsx
import React from 'react';
import type { Article } from '../types';

interface ArticleListProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, onSelectArticle }) => {
  return (
    <div className="article-list">
      <h1>Articles</h1>
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <li 
              key={article.id} 
              className="article-item"
              onClick={() => onSelectArticle(article)}
            >
              <h2>{article.title}</h2>
              <p>Click to see original vs. rewritten content.</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArticleList;
