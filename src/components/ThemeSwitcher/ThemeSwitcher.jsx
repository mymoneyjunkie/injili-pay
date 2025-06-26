import { useState, useEffect } from 'react';
import { FaPalette } from 'react-icons/fa';

const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState('africa');

  // Define themes
  const themes = ['africa', 'gold', 'purple'];

  // Load saved theme preference on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme');
    if (savedTheme && themes.includes(savedTheme)) {
      setCurrentTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      setCurrentTheme('africa');
      applyAfricaTheme();
    }
  }, []);

  // Function to apply the Africa theme
  const applyAfricaTheme = () => {
    // Remove existing theme styles
    const existingLink = document.getElementById('theme-stylesheet');
    if (existingLink) {
      existingLink.remove();
    }

    // Add Africa theme stylesheet
    const link = document.createElement('link');
    link.id = 'theme-stylesheet';
    link.rel = 'stylesheet';
    link.href = '/styles/theme.css';
    link.type = 'text/css';
    document.head.appendChild(link);

    localStorage.setItem('app-theme', 'africa');
  };

  // Function to apply the gold theme
  const applyGoldTheme = () => {
    const existingLink = document.getElementById('theme-stylesheet');
    if (existingLink) {
      existingLink.remove();
    }

    const link = document.createElement('link');
    link.id = 'theme-stylesheet';
    link.rel = 'stylesheet';
    link.href = '/gold.css';
    link.type = 'text/css';
    document.head.appendChild(link);

    localStorage.setItem('app-theme', 'gold');
  };

  // Function to apply the purple theme
  const applyPurpleTheme = () => {
    const existingLink = document.getElementById('theme-stylesheet');
    if (existingLink) {
      existingLink.remove();
    }

    const link = document.createElement('link');
    link.id = 'theme-stylesheet';
    link.rel = 'stylesheet';
    link.href = '/purple.css';
    link.type = 'text/css';
    document.head.appendChild(link);

    localStorage.setItem('app-theme', 'purple');
  };

  // Function to apply any theme
  const applyTheme = (theme) => {
    switch (theme) {
      case 'africa':
        applyAfricaTheme();
        break;
      case 'gold':
        applyGoldTheme();
        break;
      case 'purple':
        applyPurpleTheme();
        break;
      default:
        applyAfricaTheme();
        break;
    }
  };

  // Cycle through themes
  const toggleTheme = () => {
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    
    setCurrentTheme(nextTheme);
    applyTheme(nextTheme);
  };

  // Get theme display info
  const getThemeInfo = () => {
    switch (currentTheme) {
      case 'africa':
        return { 
          icon: 'text-purple-600', 
          label: 'Africa',
          title: 'Switch to Gold Theme'
        };
      case 'gold':
        return { 
          icon: 'text-yellow-500', 
          label: 'Gold',
          title: 'Switch to Purple Theme'
        };
      case 'purple':
        return { 
          icon: 'text-purple-500', 
          label: 'Purple',
          title: 'Switch to Africa Theme'
        };
      default:
        return { 
          icon: 'text-purple-600', 
          label: 'Africa',
          title: 'Switch to Gold Theme'
        };
    }
  };

  const themeInfo = getThemeInfo();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 text-text-secondary hover:text-primary-500 transition-colors duration-300 px-3 py-2 rounded-md border border-gray-600 hover:border-primary-500"
      title={themeInfo.title}
    >
      <FaPalette className={themeInfo.icon} />
      <span className="hidden sm:inline text-sm">
        {themeInfo.label}
      </span>
    </button>
  );
};

export default ThemeSwitcher; 