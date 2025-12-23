import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import "./App.css";

const API_BASE_URL = "http://127.0.0.1:8000";

interface Article {
  id: number;
  title: string;
  original_content: string;
  rewritten_content: string | null;
  references: string[] | null;
  created_at: string;
  updated_at: string;
}

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const res = await axios.get<Article[]>(
          `${API_BASE_URL}/api/articles`
        );
        const list = (res.data || []).sort((a, b) => b.id - a.id);
        setArticles(list);
        if (list.length > 0) setSelectedArticle(list[0]);
        setError(null);
      } catch (e) {
        console.error(e);
        setError("Failed to fetch articles. Is Laravel running?");
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  return (
    <div className="app-container">
      <aside className="sidebar">
        <header className="sidebar-header">
          <h1>Article Rewriter Dashboard</h1>
          <p className="sidebar-subtitle">
           Browse articles fetched from the Laravel API.
          </p>
        </header>

        <ul className="article-list">
          {loading && <li>Loading...</li>}
          {error && <li className="error-message">{error}</li>}
          {!loading && !error && articles.length === 0 && (
            <li>No articles found.</li>
          )}
          {!loading &&
            !error &&
            articles.map((article) => (
              <li
                key={article.id}
                className={
                  "article-list-item" +
                  (selectedArticle?.id === article.id ? " active" : "")
                }
                onClick={() => setSelectedArticle(article)}
              >
                {article.title}
              </li>
            ))}
        </ul>
      </aside>

      <main className="main-content">
        {loading || error || !selectedArticle ? (
          <div className="centered-state">
            {loading
              ? "Loading articles..."
              : error
              ? error
              : "Select an article from the list to view its details."}
          </div>
        ) : (
          <ArticleDetail article={selectedArticle} />
        )}
      </main>
    </div>
  );
}

function ArticleDetail({ article }: { article: Article }) {
  return (
    <div className="article-detail-card">
      <header className="article-header">
        <h2>{article.title}</h2>
        <p className="article-meta">
         Created at: {new Date(article.created_at).toLocaleString()}
        </p>
      </header>
      <div className="article-body">
        <section className="content-section">
          <h3>Original Content</h3>
          <p className="content-block">{article.original_content}</p>
        </section>

        <section className="content-section">
          <h3>Rewritten Content</h3>
          {article.rewritten_content ? (
            <p className="content-block">{article.rewritten_content}</p>
          ) : (
            <p className="fallback-text">
              Rewritten content not available yet.
            </p>
          )}
        </section>

        {article.references && article.references.length > 0 && (
          <section className="content-section">
            <h3>References</h3>
            <ul className="reference-list">
              {article.references.map((ref, index) => (
                <li key={index}>
                  <a href={ref} target="_blank" rel="noreferrer">
                    {ref}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

export default App;
