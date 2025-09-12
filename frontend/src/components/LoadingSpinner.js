import React from 'react';

const LoadingSpinner = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16'
  };

  return (
    <div className={`loading-spinner ${className}`}>
      <div className={`spinner ${sizeClasses[size]}`} />
    </div>
  );
};

export const PageLoading = ({ message = 'Cargando...' }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <LoadingSpinner size="xlarge" />
      <p className="mt-4 text-gray-600 font-medium">{message}</p>
    </div>
  );
};

export const SectionLoading = ({ message = 'Cargando...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <LoadingSpinner size="large" />
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  );
};

export const InlineLoading = ({ message = 'Cargando...' }) => {
  return (
    <div className="flex items-center gap-3 py-4">
      <LoadingSpinner size="small" />
      <span className="text-gray-600">{message}</span>
    </div>
  );
};

export default LoadingSpinner;