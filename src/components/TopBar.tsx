import React, { useState, useRef, useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import './TopBar.css';

const TopBar: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        buttonRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    setShowDropdown(false);
  };

  return (
    <div className="top-bar">
      <h1 className="app-title">Lens</h1>
      <div className="profile-section">
        <button 
          ref={buttonRef}
          className="profile-button"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <PersonIcon />
        </button>
        {showDropdown && (
          <div ref={dropdownRef} className="profile-dropdown">
            <div className="dropdown-item">
              <div className="persona-label">
                <label htmlFor="persona">Persona:</label>
                <div 
                  className="info-icon"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <InfoIcon fontSize="small" />
                  {showTooltip && (
                    <div className="tooltip">
                      Persona allows you to focus only on what absolutely requires your attention. 
                      Based on your selected persona, the tool provides views that are most relevant to you, 
                      ensuring you see what's important rather than everything.
                    </div>
                  )}
                </div>
              </div>
              <select id="persona" value="product-manager">
                <option value="director" disabled>Director/Leader</option>
                <option value="product-manager">Product Manager</option>
                <option value="team-lead" disabled>Team Lead</option>
                <option value="agile-champion" disabled>Agile Champion</option>
                <option value="engineer" disabled>Engineer</option>
              </select>
            </div>
            <div className="divider"></div>
            <button className="sign-out-button" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar; 