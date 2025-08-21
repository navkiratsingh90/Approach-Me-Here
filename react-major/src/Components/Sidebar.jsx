import React, { useState } from 'react';
import { 
  FiHome, FiUsers, FiShoppingBag, FiGrid, 
  FiSettings, FiMoon, FiSun, FiMenu, FiX , 
} from 'react-icons/fi';
import {IoExitOutline} from 'react-icons/io5'
import s from './Sidebar.module.css';
<IoExitOutline />
const Sidebar = ({ activeSection, setActiveSection, darkMode, toggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiHome /> },
    { id: 'users', label: 'User Management', icon: <FiUsers /> },
    { id: 'products', label: 'Product Management', icon: <FiShoppingBag /> },
    { id: 'categories', label: 'Categories', icon: <FiGrid /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings /> },
    { id: 'exit', label: 'Exit', icon: <IoExitOutline /> }
  ];

  return (
    <>
      <div className={`${s.sidebar} ${mobileMenuOpen ? s.mobileOpen : ''} ${darkMode ? s.dark : ''}`}>
        <div className={s.logoContainer}>
          <div className={s.logo}>mnq</div>
          <button className={s.mobileClose} onClick={() => setMobileMenuOpen(false)}>
            <FiX />
          </button>
        </div>
        
        <nav className={s.nav}>
          {navItems.map(item => (
            <button
              key={item.id}
              className={`${s.navItem} ${activeSection === item.id ? s.active : ''}`}
              onClick={() => {
                setActiveSection(item.id);
                setMobileMenuOpen(false);
              }}
            >
              <span className={s.navIcon}>{item.icon}</span>
              <span className={s.navLabel}>{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className={s.themeToggleContainer}>
          <button className={s.themeToggle} onClick={toggleTheme}>
            {darkMode ? (
              <>
                <FiSun className={s.themeIcon} />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <FiMoon className={s.themeIcon} />
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      <button className={s.mobileMenuButton} onClick={() => setMobileMenuOpen(true)}>
        <FiMenu />
      </button>
    </>
  );
};

export default Sidebar;