import React from 'react';

const LoadingSpinner = ({ size = 'medium', message = 'Cargando...', className = '' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <div className={`loading-spinner ${sizeClasses[size]} mb-4`}></div>
      {message && (
        <p className="text-gray-600 dark:text-gray-400 text-sm">{message}</p>
      )}
    </div>
  );
};

export const SectionLoading = ({ message = 'Cargando...', className = '' }) => (
  <div className={`flex items-center justify-center py-16 ${className}`}>
    <div className="text-center">
      <div className="loading-spinner w-10 h-10 mb-4 mx-auto"></div>
      <p className="text-gray-600 dark:text-gray-400">{message}</p>
    </div>
  </div>
);

export const InlineLoading = ({ message = 'Cargando...', className = '' }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="loading-spinner w-5 h-5"></div>
    <span className="text-gray-600 dark:text-gray-400 text-sm">{message}</span>
  </div>
);

export const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="loading-spinner w-16 h-16 mb-6 mx-auto"></div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        Cargando página...
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        Por favor espera un momento
      </p>
    </div>
  </div>
);

export default LoadingSpinner;