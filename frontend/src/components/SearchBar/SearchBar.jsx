import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ onSearch, isSelectMode = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setIsFocused(false); // Reset focus on submission
    }
  };

  return (
    <>
      <AnimatePresence>
        {isFocused && !isSelectMode && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      <div className={`relative w-full max-w-3xl mx-auto transition-all duration-500 
        ${isFocused && !isSelectMode 
          ? 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50' 
          : ''}`}>
        <motion.form
          onSubmit={handleSubmit}
          animate={{
            scale: isFocused && !isSelectMode ? 1.2 : 1,
            width: isFocused && !isSelectMode ? '100%' : 'auto',
            maxWidth: isFocused && !isSelectMode ? '600px' : '48rem'
          }}
          className="relative"
        >
          <input
            type="text"
            placeholder="Search for movies or genres..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              if (!isSelectMode) {
                setTimeout(() => setIsFocused(false), 200)
              }
            }}
            className="w-full px-6 py-4 text-lg bg-secondary text-white rounded-full
                     border-2 border-transparent focus:border-accent
                     outline-none transition-all duration-300
                     placeholder:text-gray-400"
          />
        </motion.form>
      </div>
    </>
  );
};

export default SearchBar;