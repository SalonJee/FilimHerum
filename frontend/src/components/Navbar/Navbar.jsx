import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const Navbar = ({ onHomeClick }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  const handleHomeClick = () => {
    if (onHomeClick) {
      onHomeClick();
    } else {
      navigate('/home');
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-secondary text-white py-4 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex space-x-4 items-center">
          <div 
            onClick={handleHomeClick}
            className="text-xl font-bold hover:text-accent transition-colors cursor-pointer"
          >
            फिलिम HERUM
          </div>
          {currentUser && (
            <>
              <Link 
                to="/home" 
                onClick={handleHomeClick}
                className="hover:text-accent transition-colors"
              >
                Home
              </Link>

              <Link 
                to="/settings" 
                className="hover:text-accent transition-colors"
              >
                Settings
              </Link>

              <Link 
                to="/favorites" 
                className="hover:text-accent transition-colors"
              >
                My Favorites
              </Link>
            </>
          )}
        </div>
        
        {currentUser && (
          <div className="flex items-center space-x-4">
            <span className="text-sm">
            {' Hello, ' + currentUser.email.split('@')[0] + '!'}
            </span>
            <button 
              onClick={handleLogout}
              className="bg-accent hover:bg-accent-dark px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;