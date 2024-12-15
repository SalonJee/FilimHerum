import MovieCard from './MovieCard';

const MovieGrid = ({ 
  movies, 
  isSelectMode = false, 
  selectedMovies = [], 
  onMovieSelect 
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {movies.map((movie) => (
        <MovieCard 
          key={movie.id} 
          movie={movie} 
          isSelectMode={isSelectMode}
          isSelected={selectedMovies.some(m => m.id === movie.id)}
          onSelect={() => onMovieSelect(movie)}
        />
      ))}
    </div>
  );
};

export default MovieGrid;