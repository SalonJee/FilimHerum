import React, { useState, useEffect } from 'react';

const FavoritesPage = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavoriteMovies = () => {
      // Simulate fetching favorites from local storage or mock data
      try {
        const storedFavorites = localStorage.getItem('favoriteMovies');
        const parsedFavorites = storedFavorites 
          ? JSON.parse(storedFavorites) 
          : [];

        setFavoriteMovies(parsedFavorites);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load favorites');
        setIsLoading(false);
      }
    };

    fetchFavoriteMovies();
  }, []);

  const removeFromFavorites = (movieToRemove) => {
    try {
      const updatedFavorites = favoriteMovies.filter(
        movie => movie.id !== movieToRemove.id
      );

      // Update local storage
      localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
      
      // Update state
      setFavoriteMovies(updatedFavorites);

      // Optional: Show success message
      alert('Movie removed from favorites');
    } catch (error) {
      alert('Failed to remove movie');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary text-white flex items-center justify-center">
        <p className="text-xl">Loading favorites...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Favorite Movies</h1>
        
        {favoriteMovies.length === 0 ? (
          <div className="text-center text-gray-400">
            <p>You haven't added any favorite movies yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {favoriteMovies.map(movie => (
              <div 
                key={movie.id} 
                className="relative group"
              >
                <img 
                  src={movie.poster_path} 
                  alt={movie.title} 
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={() => removeFromFavorites(movie)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
                <p className="text-center mt-2 truncate">{movie.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;