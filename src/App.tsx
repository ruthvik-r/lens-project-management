import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import SideNav from './components/SideNav';
import MenuToggle from './components/MenuToggle';
import Tracker from './components/Tracker';
import './App.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-content">
      <h2 className="welcome-message">Welcome back, Murthy.</h2>
      <p className="summary-text">
        Here you'll find an overview of everything that's important to you. 
        Stay organized and keep track of your progress with ease.
      </p>

      <div className="quick-glance-container">
        <h3 className="section-title">Quick Glance</h3>
        <div className="quick-stats-grid">
          <div className="stat-card">
            <div className="stat-value highlight-box">25.2</div>
            <div className="stat-label">Current Release</div>
          </div>
          <div className="stat-card">
            <div className="stat-value highlight-box">2</div>
            <div className="stat-label">Sprint</div>
          </div>
          <div className="stat-card">
            <div className="stat-value highlight-box">6</div>
            <div className="stat-label">Days Remaining</div>
          </div>
        </div>
      </div>

      <h3 className="section-title">Your Projects</h3>
      <div className="status-card">
        <div className="product-header">
          <div className="title-container">
            <h3 className="section-title">Apollo</h3>
            <span className="role-indicator">[Product Manager]</span>
          </div>
        </div>
        <div className="insights-container">
          <div className="insight-item alert">
            <div className="insight-header">
              <span className="insight-title">Release Planning Required</span>
            </div>
            <p className="insight-text">
              Current release 25.2 is ending in <span className="highlight">6 days</span>. 
              It's time to start planning for Release 25.3 to ensure smooth transition.
            </p>
          </div>

          <div className="insight-item">
            <div className="insight-header">
              <span className="insight-title">Release 25.2 Progress</span>
            </div>
            <div className="sprint-insights">
              <div className="sprint-item completed">
                <h4>Sprint 25.2.1 (Completed)</h4>
                <p>Sprint completed with all <span className="highlight">9</span> planned stories delivered</p>
              </div>
              <div className="sprint-item current">
                <h4>Sprint 25.2.2 (Current)</h4>
                <p>
                  <span className="completed">4 completed</span>, 
                  <span className="on-track">3 on track</span>, and 
                  <span className="needs-attention">1 needs attention</span> 
                  out of <span className="highlight">8</span> planned stories
                </p>
              </div>
            </div>
          </div>

          <div className="insight-item">
            <div className="insight-header">
              <span className="insight-title">Organizational Leaderboards</span>
            </div>
            <div className="sprint-insights">
              <div className="sprint-item">
                <h4>Agile Maturity</h4>
                <p>Ranked <span className="highlight">1st</span></p>
              </div>
              <div className="sprint-item">
                <h4>Code Quality</h4>
                <p>Ranked <span className="highlight">2nd</span></p>
              </div>
              <div className="sprint-item">
                <h4>Organization Standards</h4>
                <p>Ranked <span className="highlight">5th</span></p>
              </div>
            </div>
          </div>
        </div>
        <div className="ai-attribution">
          Insights are generated by LensAI
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <Router>
      <div className="app-container">
        <div className="main-content">
          <TopBar />
          <div className="content-wrapper">
            <MenuToggle isOpen={isMobileNavOpen} onToggle={toggleMobileNav} />
            <SideNav className={isMobileNavOpen ? 'open' : ''} />
            <main className="content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tracker" element={<Tracker />} />
                <Route path="/health" element={<div className="page-content">Health Content</div>} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
