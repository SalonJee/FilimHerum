import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar/Navbar";
import SearchBar from "../components/SearchBar/SearchBar";
import MovieGrid from "../components/MovieGrid/MovieGrid";


import { movieService } from "../../../backend/services/movieService";
import toast from 'react-hot-toast';

const Home = () => {
  // State Management
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [isGenreMode, setIsGenreMode] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);

  // Hooks
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Fetch Genres
  const fetchGenres = async () => {
    try {
      const fetchedGenres = await movieService.getGenres();
      setGenres(fetchedGenres);
    } catch (error) {
      console.error('Genres Fetch Error:', error);
      toast.error('Failed to fetch genres');
    }
  };

  // Fetch Movies - Reset Method
  const fetchMovies = async (query = '', genre = null) => {
    setIsLoading(true);
    setError(null);
    try {
      let fetchedMovies;
      if (genre) {
        fetchedMovies = await movieService.getMoviesByGenre(genre);
      } else {
        fetchedMovies = await movieService.getPopularMovies(query);
      }
      setMovies(fetchedMovies);
    } catch (error) {
      console.error('Movie Fetch Error:', error);
      setError(error.message || 'Unable to fetch movies');
      toast.error(error.message || 'Failed to fetch movies');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset to Initial State
  const resetToInitialState = () => {
    fetchMovies(); // Fetch popular movies
    setIsSelectMode(false);
    setSelectedMovies([]);
    setIsGenreMode(false);
    setSelectedGenre(null);
    navigate('/home');
  };

  // Initial Fetches
  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, []);

  // Search Handler
  const handleSearch = (query) => {
    fetchMovies(query);
    // Reset genre mode when searching
    setIsGenreMode(false);
    setSelectedGenre(null);
  };

  // Toggle Select Mode
  const toggleSelectMode = () => {
    setIsSelectMode(prev => !prev);
    // Do not reset selected movies when toggling select mode
  };

  // Toggle Genre Mode
  const toggleGenreMode = () => {
    setIsGenreMode(prev => !prev);
    // Do not reset selection when toggling genre mode
  };

  // Genre Selection Handler
  const handleGenreSelect = (genre) => {
    if (selectedGenre === genre.name) {
      // Deselect if same genre clicked
      setSelectedGenre(null);
      fetchMovies(); // Fetch popular movies
    } else {
      setSelectedGenre(genre.name);
      fetchMovies('', genre.name);
    }
    setIsGenreMode(false);
  };

  // Movie Selection Handler
  const handleMovieSelect = (movie) => {
    if (!isSelectMode) return;

    setSelectedMovies(prev => {
      // If movie already selected, remove it
      if (prev.some(m => m.id === movie.id)) {
        return prev.filter(m => m.id !== movie.id);
      }
      
      // Add movie if less than 5 selected
      return prev.length < 5 
        ? [...prev, movie] 
        : prev;
    });
  };

  // Confirm Selection Handler
  const handleConfirmSelection = () => {
    if (selectedMovies.length !== 5) {
      toast.error('Please select exactly 5 movies');
      return;
    }

    navigate('./recommendations');
  
    // Log the selected movies (or handle them as needed)
    console.log('Selected Movies:', selectedMovies);
    toast.success('Selection confirmed!');
  };

  // Render Method
  return (
    <div className="min-h-screen bg-primary text-white">
      <Navbar onHomeClick={resetToInitialState} />
      
      <div className="pt-24 pb-6 container mx-auto px-4">
        {/* Search and Mode Controls */}
        <div className="flex justify-between items-center mb-6">
          <SearchBar 
            onSearch={handleSearch} 
            isSelectMode={isSelectMode}
          />
          <div className="flex items-center space-x-4">
            {/* Select 5 Movies Button */}
            <button 
              onClick={toggleSelectMode}
              className={`px-4 py-2 rounded-lg transition-all ${
                isSelectMode 
                  ? 'bg-green-600 text-white' 
                  : 'bg-secondary text-white hover:bg-green-700'
              }`}
            >
              {isSelectMode ? 'Cancel Selection' : 'Select 5 Movies'}
            </button>

            {/* Genre Button */}
            <button 
              onClick={toggleGenreMode}
              className={`px-4 py-2 rounded-lg transition-all ${
                isGenreMode 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-secondary text-white hover:bg-blue-700'
              }`}
            >
              {selectedGenre || 'Select Genre'}
            </button>
          </div>
        </div>

        {/* Genre Dropdown */}
        {isGenreMode && (
          <div className="grid grid-cols-4 gap-4 mb-6">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleGenreSelect(genre)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedGenre === genre.name 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-secondary text-white hover:bg-blue-700'
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        )}
        
        {/* Loading and Error States */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl">Loading movies...</p>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center mt-6">
            {error}
          </div>
        ) : (
          <MovieGrid 
            movies={movies} 
            isSelectMode={isSelectMode}
            selectedMovies={selectedMovies}
            onMovieSelect={handleMovieSelect}
          />
        )}

        {/* Confirm Selection Button */}
        {isSelectMode && selectedMovies.length === 5 && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
            <button 
              className="bg-accent text-white px-6 py-3 rounded-lg 
                         hover:bg-accent-dark transition-all 
                         flex items-center space-x-2"
              onClick={handleConfirmSelection}
            >
              <span>Confirm Selection</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;