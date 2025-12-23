// src/components/ArticleList.tsx
import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import { fetchArticles } from '../mockData';
import ArticleDetail from './ArticleDetail';

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        setLoading(true);
        const fetchedArticles = await fetchArticles();
        setArticles(fetchedArticles);
      } catch (err) {
        setError('Failed to fetch articles.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleBack = () => {
    setSelectedArticle(null);
  };

  if (loading) {
    return <div className="loading">Loading articles...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (selectedArticle) {
    return <ArticleDetail article={selectedArticle} onBack={handleBack} />;
  }

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
              onClick={() => handleSelectArticle(article)}
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
