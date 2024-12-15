import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar/Navbar';
import toast from 'react-hot-toast';

const Profile = () => {
  const { currentUser, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.displayName || '');

  const handleUpdateProfile = async () => {
    try {
      await updateProfile({ displayName: name });
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <div className="container mx-auto px-4 py-24 max-w-2xl">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              User Profile
            </h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="
                px-4 py-2 
                bg-blue-500 text-white 
                rounded-lg 
                hover:bg-blue-600 
                transition-colors
              "
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <div className="space-y-4">
            {/* Profile Picture */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img
                  src={currentUser?.photoURL || '/default-avatar.png'}
                  alt="Profile"
                  className="
                    w-32 h-32 
                    rounded-full 
                    object-cover 
                    border-4 
                    border-white 
                    dark:border-gray-700 
                    shadow-lg
                  "
                />
                {/* Optional: Add camera icon for upload */}
                <button className="
                  absolute bottom-0 right-0 
                  bg-blue-500 text-white 
                  rounded-full 
                  w-10 h-10 
                  flex items-center justify-center
                  shadow-lg
                ">
                  📷
                </button>
              </div>
            </div>

            {/* Name */}
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="
                    w-full px-3 py-2 
                    bg-gray-100 dark:bg-gray-600 
                    text-gray-900 dark:text-white 
                    rounded-lg 
                    focus:ring-2 focus:ring-blue-500
                  "
                />
              ) : (
                <p className="text-lg text-gray-800 dark:text-white">
                  {currentUser?.displayName || 'Not set'}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                Email
              </label>
              <p className="text-lg text-gray-800 dark:text-white">
                {currentUser?.email}
              </p>
            </div>

            {/* Additional Details */}
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                Account Created
              </label>
              <p className="text-lg text-gray-800 dark:text-white">
                {new Date(currentUser?.metadata?.creationTime).toLocaleDateString()}
              </p>
            </div>

            {/* Save Changes Button */}
            {isEditing && (
              <button
                onClick={handleUpdateProfile}
                className="
                  w-full 
                  bg-green-500 text-white 
                  px-6 py-3 
                  rounded-lg 
                  hover:bg-green-600
                  transition-colors
                "
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;