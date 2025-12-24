import React, { useState, useEffect } from 'react';
import type { Article } from '../../types';
import { Card, StatCard, Button, Badge } from './Components';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

// Dashboard Page
export const DashboardPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalArticles: 0,
    views: 0,
    engagement: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/articles`);
        if (!res.ok) throw new Error('Failed to fetch articles');
        
        const data: Article[] = await res.json();
        setArticles(data.slice(0, 6));
        
        setStats({
          totalArticles: data.length,
          views: Math.floor(Math.random() * 5000) + 1000,
          engagement: Math.floor(Math.random() * 100) + 40,
        });
      } catch (err) {
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="section-header fade-in">
        <h2 className="section-title">Dashboard Overview</h2>
        <p className="section-description">
          Welcome to your article management hub. Track performance and manage your content.
        </p>
      </div>

      <div className="grid-3" style={{ marginBottom: '2rem' }}>
        <StatCard
          label="Total Articles"
          value={stats.totalArticles}
          change="+2 this month"
          changeType="positive"
          icon="📚"
        />
        <StatCard
          label="Total Views"
          value={`${stats.views.toLocaleString()}`}
          change="+12.5%"
          changeType="positive"
          icon="👁️"
        />
        <StatCard
          label="Engagement Rate"
          value={`${stats.engagement}%`}
          change="+5%"
          changeType="positive"
          icon="💬"
        />
      </div>

      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-gray)' }}>
          Loading articles...
        </div>
      ) : (
        <div style={{ marginTop: '3rem' }}>
          <div className="section-header">
            <h2 className="section-title">Recent Articles</h2>
            <p className="section-description">Your latest published content</p>
          </div>
          <div className="grid-2">
            {articles.map((article) => (
              <Card key={article.id}>
                <div style={{ marginBottom: '1rem' }}>
                  <Badge variant="primary">{article.id}</Badge>
                </div>
                <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
                  {article.title}
                </h3>
                <p
                  style={{
                    color: 'var(--text-gray)',
                    fontSize: '0.9rem',
                    marginBottom: '1rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {article.original_content?.substring(0, 100)}...
                </p>
                <Button variant="secondary" size="sm">
                  View Details
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

// Articles Page
export const ArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/articles`);
        if (!res.ok) throw new Error('Failed to fetch articles');
        const data: Article[] = await res.json();
        setArticles(data);
      } catch (err) {
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="section-header fade-in">
        <h2 className="section-title">All Articles</h2>
        <p className="section-description">
          Manage and view all your published articles
        </p>
        <div style={{ marginTop: '1rem' }}>
          <Button variant="primary" size="md">
            + New Article
          </Button>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-gray)' }}>
          Loading articles...
        </div>
      ) : (
        <div style={{ marginTop: '2rem' }}>
          <div
            style={{
              display: 'grid',
              gap: '1rem',
              gridTemplateColumns: '1fr',
            }}
          >
            {articles.map((article) => (
              <Card key={article.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <Badge variant="primary">ID: {article.id}</Badge>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                      {article.created_at ? new Date(article.created_at).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  <h3 style={{ margin: '0.5rem 0', color: 'var(--text-dark)' }}>
                    {article.title}
                  </h3>
                  <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', margin: 0 }}>
                    {article.original_content?.substring(0, 150)}...
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button variant="secondary" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

// Analytics Page
export const AnalyticsPage: React.FC = () => {
  const [stats] = useState({
    pageViews: 12450,
    uniqueVisitors: 3892,
    avgSessionTime: '5m 23s',
    bounceRate: '42%',
    conversionRate: '8.5%',
    topPages: [
      { page: 'Article #1', views: 2450, engagement: '75%' },
      { page: 'Article #2', views: 1890, engagement: '68%' },
      { page: 'Article #3', views: 1520, engagement: '62%' },
    ],
  });

  return (
    <>
      <div className="section-header fade-in">
        <h2 className="section-title">Analytics & Performance</h2>
        <p className="section-description">
          Track your article performance and user engagement metrics
        </p>
      </div>

      <div className="grid-3" style={{ marginBottom: '2rem' }}>
        <StatCard
          label="Page Views"
          value={stats.pageViews.toLocaleString()}
          change="+18.2%"
          changeType="positive"
          icon="👀"
        />
        <StatCard
          label="Unique Visitors"
          value={stats.uniqueVisitors.toLocaleString()}
          change="+9.1%"
          changeType="positive"
          icon="👥"
        />
        <StatCard
          label="Bounce Rate"
          value={stats.bounceRate}
          change="-2.5%"
          changeType="positive"
          icon="📊"
        />
      </div>

      <div className="grid-2" style={{ marginTop: '2rem' }}>
        <Card>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-dark)' }}>
            Engagement Metrics
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-gray)' }}>Avg. Session Time</span>
              <span style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--primary-blue)' }}>
                {stats.avgSessionTime}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-gray)' }}>Conversion Rate</span>
              <span style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--primary-purple)' }}>
                {stats.conversionRate}
              </span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-dark)' }}>
            Top Performing Articles
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {stats.topPages.map((item, idx) => (
              <div key={idx} style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: '500', color: 'var(--text-dark)' }}>
                    {item.page}
                  </span>
                  <Badge variant="success">{item.views.toLocaleString()} views</Badge>
                </div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                  Engagement: {item.engagement}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
};

// Settings Page
export const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState({
    siteTitle: 'Article Rewriter Dashboard',
    siteDescription: 'Manage and rewrite your articles efficiently',
    postsPerPage: 10,
    emailNotifications: true,
    darkMode: false,
  });

  return (
    <>
      <div className="section-header fade-in">
        <h2 className="section-title">Settings</h2>
        <p className="section-description">
          Manage your account and application preferences
        </p>
      </div>

      <div className="grid-1" style={{ maxWidth: '600px' }}>
        <Card>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-dark)' }}>
            General Settings
          </h3>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)', fontWeight: '500' }}>
                Site Title
              </label>
              <input
                type="text"
                value={settings.siteTitle}
                onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.95rem',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)', fontWeight: '500' }}>
                Site Description
              </label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.95rem',
                  fontFamily: 'inherit',
                  minHeight: '100px',
                  resize: 'vertical',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)', fontWeight: '500' }}>
                Posts Per Page
              </label>
              <input
                type="number"
                value={settings.postsPerPage}
                onChange={(e) => setSettings({ ...settings, postsPerPage: parseInt(e.target.value) })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.95rem',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <input
                type="checkbox"
                id="notifications"
                checked={settings.emailNotifications}
                onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <label htmlFor="notifications" style={{ color: 'var(--text-dark)', cursor: 'pointer' }}>
                Enable Email Notifications
              </label>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <input
                type="checkbox"
                id="darkmode"
                checked={settings.darkMode}
                onChange={(e) => setSettings({ ...settings, darkMode: e.target.checked })}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <label htmlFor="darkmode" style={{ color: 'var(--text-dark)', cursor: 'pointer' }}>
                Dark Mode
              </label>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <Button variant="primary" size="md">
                Save Settings
              </Button>
              <Button variant="secondary" size="md">
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

// Help Page
export const HelpPage: React.FC = () => {
  const faqs = [
    {
      question: 'How do I create a new article?',
      answer: 'Navigate to the Articles page and click the "New Article" button. Fill in the required fields and save.',
    },
    {
      question: 'How can I track my article performance?',
      answer: 'Visit the Analytics page to view detailed statistics about your articles including views, engagement, and conversion rates.',
    },
    {
      question: 'How do I edit an existing article?',
      answer: 'Go to the Articles page, find the article you want to edit, and click the "Edit" button.',
    },
    {
      question: 'Can I delete articles?',
      answer: 'Yes, you can delete articles from the Articles page by clicking the "Delete" button on any article.',
    },
    {
      question: 'How often are analytics updated?',
      answer: 'Analytics data is updated in real-time as your articles receive views and engagement.',
    },
  ];

  return (
    <>
      <div className="section-header fade-in">
        <h2 className="section-title">Help & Support</h2>
        <p className="section-description">
          Find answers to common questions and get support
        </p>
      </div>

      <div className="grid-1" style={{ maxWidth: '700px' }}>
        <Card>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-dark)' }}>
            Frequently Asked Questions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {faqs.map((faq, idx) => (
              <div key={idx} style={{ borderBottom: idx < faqs.length - 1 ? '1px solid var(--border-subtle)' : 'none', paddingBottom: '1.5rem' }}>
                <h4 style={{ marginBottom: '0.75rem', color: 'var(--text-dark)', fontSize: '1rem' }}>
                  ❓ {faq.question}
                </h4>
                <p style={{ color: 'var(--text-gray)', margin: 0, lineHeight: '1.6' }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ marginTop: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-dark)' }}>
            Need More Help?
          </h3>
          <p style={{ color: 'var(--text-gray)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            If you can't find the answer you're looking for, our support team is here to help. Contact us at any time.
          </p>
          <Button variant="primary" size="md">
            Contact Support
          </Button>
        </Card>
      </div>
    </>
  );
};
