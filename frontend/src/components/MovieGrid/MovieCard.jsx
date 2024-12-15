import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const MovieCard = ({ 
  movie, 
  isSelectMode = false, 
  isSelected = false, 
  onSelect 
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    if (isSelectMode) {
      onSelect();
    } else {
      navigate(`/movie/${movie.id}`);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: isSelectMode ? 1 : 1.05 }}
      className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Existing select mode checkbox */}
      {isSelectMode && (
        <div 
          className={`absolute top-2 right-2 w-6 h-6 z-10 rounded-full border-2 ${
            isSelected 
              ? 'bg-green-500 border-green-500' 
              : 'bg-white border-gray-300'
          }`}
        >
          {isSelected && <span className="text-white text-xs">✓</span>}
        </div>
      )}

      {/* Base Movie Poster */}
      <img
        src={movie.poster_path}
        alt={movie.title}
        className={`w-full h-[400px] object-cover ${
          isSelectMode && !isSelected 
            ? 'opacity-50' 
            : 'opacity-100'
        } ${isHovered && !isSelectMode ? 'opacity-50' : ''}`}
      />

      {/* Hover Details Overlay */}
      <AnimatePresence>
        {isHovered && !isSelectMode && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black bg-opacity-70 text-white p-4 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold">{movie.title}</h3>
              <p className="text-sm mt-2 line-clamp-3">{movie.overview}</p>
            </div>

            <div className="space-y-2">
              {/* Quick Details */}
              <div className="flex justify-between">
                <span>Rating:</span>
                <span className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  {movie.vote_average.toFixed(1)}/10
                </span>
              </div>
              <div className="flex justify-between">
                <span>Release Date:</span>
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Original gradient overlay for non-hover state */}
      {!isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent
                   flex flex-col justify-end p-4 text-white"
        >
          <h3 className="text-xl font-bold">{movie.title}</h3>
          <div className="flex items-center mt-2">
            <span className="text-yellow-400">★</span>
            <span className="ml-1">{movie.vote_average.toFixed(1)}</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MovieCard;