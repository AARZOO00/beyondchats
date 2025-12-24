import React, { useState } from 'react';
import { Sidebar, Header } from './Layout';
import {
  DashboardPage,
  ArticlesPage,
  AnalyticsPage,
  SettingsPage,
  HelpPage,
} from './Pages';
import '../../styles/dashboard.css';

export const Dashboard: React.FC = () => {
  const [activeNav, setActiveNav] = useState('dashboard');

  const renderPage = () => {
    switch (activeNav) {
      case 'dashboard':
        return <DashboardPage />;
      case 'articles':
        return <ArticlesPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'help':
        return <HelpPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />
      <div className="dashboard-content">
        <Header username="Aarzoo" />
        <main className="dashboard-main">
          {renderPage()}
          <div style={{ height: '2rem' }} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
