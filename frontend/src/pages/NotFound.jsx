import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Page Not Found</p>
      <Link 
        to="/" 
        className="
          bg-blue-600 text-white 
          px-6 py-3 rounded-lg 
          hover:bg-blue-700 
          transition duration-300
        "
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;