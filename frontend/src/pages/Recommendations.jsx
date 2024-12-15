import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { movieService } from '../../../backend/services/movieService';
import toast from 'react-hot-toast';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const fetchedRecommendations = await movieService.getRecommendations();
        setRecommendations(fetchedRecommendations);
      } catch (error) {
        toast.error('Failed to fetch recommendations');
        navigate('/home');
      }
    };

    fetchRecommendations();
  }, [navigate]);

  const addToFavorites = () => {
    const currentMovie = recommendations[currentMovieIndex];
    
    try {
      // Retrieve existing favorites
      const storedFavorites = localStorage.getItem('favoriteMovies');
      const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

      // Check if movie already exists in favorites
      const isAlreadyFavorite = favorites.some(movie => movie.id === currentMovie.id);
      
      if (!isAlreadyFavorite) {
        // Add to favorites
        const updatedFavorites = [...favorites, currentMovie];
        localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
        
        toast.success('Added to favorites!');
      } else {
        toast.error('Movie already in favorites');
      }

      // Move to next movie
      moveToNextMovie();
    } catch (error) {
      toast.error('Failed to add to favorites');
    }
  };

  const moveToNextMovie = () => {
    if (currentMovieIndex < recommendations.length - 1) {
      setCurrentMovieIndex(prev => prev + 1);
    } else {
      // If no more recommendations, go back to home
      toast.info('No more recommendations');
      navigate('/home');
    }
  };

  if (recommendations.length === 0) {
    return (
      <div className="min-h-screen bg-primary text-white flex items-center justify-center">
        <p className="text-xl">Loading recommendations...</p>
      </div>
    );
  }

  const currentMovie = recommendations[currentMovieIndex];

  return (
    <div className="min-h-screen bg-primary text-white flex items-center justify-center">
      <div className="text-center">
        <img 
          src={currentMovie.poster_path} 
          alt={currentMovie.title} 
          className="mx-auto mb-6 w-64 h-auto rounded-lg shadow-lg"
        />
        <h2 className="text-2xl font-bold mb-4">{currentMovie.title}</h2>
        <p className="mb-6 max-w-md mx-auto">{currentMovie.overview}</p>
        
        <div className="flex justify-center space-x-4">
          <button 
            onClick={addToFavorites}
            className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent-dark transition-all"
          >
            Add to Favorites
          </button>
          <button 
            onClick={moveToNextMovie}
            className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            Next Recommendation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;