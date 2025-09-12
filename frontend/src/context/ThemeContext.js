import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    try {
      const saved = localStorage.getItem('ridauto-dark-mode');
      if (saved !== null) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.warn('Error reading dark mode from localStorage:', error);
    }
    
    // Check system preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    return false;
  });

  useEffect(() => {
    const applyTheme = (darkMode) => {
      const html = document.documentElement;
      
      if (darkMode) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
      
      // Debug logging
      console.log('Theme applied:', darkMode ? 'dark' : 'light');
      console.log('HTML classes:', html.className);
    };

    // Apply theme immediately
    applyTheme(isDarkMode);
    
    // Save to localStorage
    try {
      localStorage.setItem('ridauto-dark-mode', JSON.stringify(isDarkMode));
    } catch (error) {
      console.warn('Error saving dark mode to localStorage:', error);
    }
  }, [isDarkMode]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e) => {
        // Only update if user hasn't manually set a preference
        const saved = localStorage.getItem('ridauto-dark-mode');
        if (saved === null) {
          setIsDarkMode(e.matches);
        }
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const toggleDarkMode = () => {
    console.log('Toggling dark mode from:', isDarkMode, 'to:', !isDarkMode);
    setIsDarkMode(prev => !prev);
  };

  const value = {
    isDarkMode,
    toggleDarkMode
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;