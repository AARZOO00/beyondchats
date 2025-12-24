import React from 'react';

interface SidebarProps {
  activeNav?: string;
  onNavChange?: (nav: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeNav, onNavChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'articles', label: 'Articles', icon: '📄' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'help', label: 'Help', icon: '❓' },
  ];

  return (
    <aside className="dashboard-sidebar">
      <a href="#" className="sidebar-logo">
        <span>✨</span>
        <span>Dashboard</span>
      </a>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <a
            key={item.id}
            href="#"
            className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              onNavChange?.(item.id);
            }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};

interface HeaderProps {
  username?: string;
  onSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  username = 'User',
  onSearch,
}) => {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1 style={{ margin: 0, color: 'var(--text-dark)' }}>Welcome back!</h1>
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search articles..."
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
      </div>
      <div className="header-right">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: 'var(--text-gray)' }}>{username}</span>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #5B7FFF, #A78BFA)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.1rem',
            }}
          >
            {username.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
};
