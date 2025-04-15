import React from 'react';
import { Link } from 'react-router-dom';
import './SideNav.css';

interface SideNavProps {
  className?: string;
}

const SideNav: React.FC<SideNavProps> = ({ className = '' }) => {
  return (
    <nav className={`side-nav ${className}`}>
      <ul>
        <li>
          <Link to="/" className="nav-item">
            <span className="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </span>
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/tracker" className="nav-item">
            <span className="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </span>
            <span>Tracker</span>
          </Link>
        </li>
        <li>
          <Link to="/health" className="nav-item">
            <span className="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </span>
            <span>Health</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav; 