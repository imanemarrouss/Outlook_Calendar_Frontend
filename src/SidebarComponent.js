// SidebarComponent.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendar, faCog, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

import './SidebarComponent.css';
import { Link } from 'react-router-dom';

const SidebarComponent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const iconSize = 'lg';
  const iconColors = ['#FF5733', '#33FF57', '#5733FF'];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className={`sidebar ${isSidebarOpen ? '' : 'close'} ${isDarkMode ? 'dark-mode' : ''}`}>
      <header>
        <FontAwesomeIcon
          icon={isSidebarOpen ? faTimes : faBars}
          size={iconSize}
          color={iconColors[2]}
          onClick={toggleSidebar}
          className="toggle-icon"
        />
      </header>

      <div className="menu-bar">
        <div className="menu">
          <li className="search-box">
            <FontAwesomeIcon icon={faSearch} size={iconSize} color={iconColors[2]} />
            <input type="text" placeholder="Search..." />
          </li>

          <ul className="menu-links">
            <li className="nav-link">
              <Link to="/calendar">
                <FontAwesomeIcon icon={faCalendar} size={iconSize} color={iconColors[2]} />
                <span className="text nav-text">Calendar</span>
              </Link>
            </li>

            <li className="nav-link">
              <Link to="/settings">
                <FontAwesomeIcon icon={faCog} size={iconSize} color={iconColors[2]} />
                <span className="text nav-text">Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SidebarComponent;
