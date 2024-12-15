import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar/Navbar';

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('English');
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  const { currentUser, updatePassword, deleteUser } = useAuth();
  const navigate = useNavigate();

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(newTheme);
  };

  const handleChangePassword = async () => {
    try {
      // Implement password change logic
      await updatePassword('newPassword'); // Replace with actual implementation
      toast.success('Password updated successfully');
    } catch (error) {
      toast.error('Failed to update password');
      console.error(error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await deleteUser();
        navigate('/signup');
        toast.success('Account deleted successfully');
      } catch (error) {
        toast.error('Failed to delete account');
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-primary text-white">
      <Navbar />
      
      <div className="pt-24 pb-6 container mx-auto px-4">
        <div className="bg-secondary rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-4">
            Account Settings
          </h2>

        
          {/* Language Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Language</h3>
            <select 
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg"
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                toast.success(`Language set to ${e.target.value}`);
              }}
            >
              {['English', 'Spanish', 'French', 'German'].map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* Notification Settings */}
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Notifications</h3>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => {
                    setNotifications(!notifications);
                    toast.success(`Notifications ${!notifications ? 'enabled' : 'disabled'}`);
                  }}
                  className="form-checkbox h-5 w-5 text-accent"
                />
                <span>Receive notifications</span>
              </label>
            </div>
          </div>

          {/* Account Management */}
          <div className="mt-8 border-t border-gray-700 pt-6">
            <h3 className="text-lg font-semibold mb-4">Account Management</h3>
            <div className="flex space-x-4">
              <button
                onClick={handleChangePassword}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg 
                           hover:bg-green-700 transition-colors"
              >
                Change Password
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg 
                           hover:bg-red-700 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;