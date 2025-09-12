import React from 'react';
import Header from './Header';
import Footer from './Footer';

const PageLayout = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 ${className}`}>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;