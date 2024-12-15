import React from 'react';

const Spinner = ({ fullScreen = false, size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-24 h-24'
  };

  const spinnerContent = (
    <div 
      className={`
        ${sizeClasses[size]} 
        border-4 border-t-4 border-blue-500 
        border-t-blue-700 rounded-full 
        animate-spin
      `}
    />
  );

  if (fullScreen) {
    return (
      <div 
        className="
          fixed inset-0 z-50 
          flex items-center justify-center 
          bg-black bg-opacity-50
        "
      >
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
};

export default Spinner;