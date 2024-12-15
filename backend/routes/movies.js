const express = require('express');
const axios = require('axios');
const router = express.Router();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';


// NEW: Recommendations Route
router.get('/recommendations', async (req, res) => {
  try {
    // Fetch trending movies as recommendations
    const response = await axios.get(`${TMDB_BASE_URL}/trending/movie/week`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
        page: Math.floor(Math.random() * 10) + 1 // Random page to get variety
      }
    });

    const transformedMovies = transformMovies(response.data.results);
    res.status(200).json(transformedMovies);
  } catch (error) {
    console.error('Recommendations Fetch Error:', error.message);
    res.status(500).json({ 
      message: 'Failed to fetch recommendations', 
      error: error.response?.data || error.message
    });
  }
});


// Helper function to transform movie data
const transformMovies = (movies) => {
  return movies.map(movie => ({
    ...movie,
    poster_path: movie.poster_path 
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null
  }));
};

// Get Popular Movies or Search Movies
router.get('/popular', async (req, res) => {
  try {
    const { query } = req.query;
    
    const endpoint = query 
      ? `${TMDB_BASE_URL}/search/movie`
      : `${TMDB_BASE_URL}/movie/popular`;

    const response = await axios.get(endpoint, {
      params: {
        api_key: TMDB_API_KEY,
        query: query || undefined,
        language: 'en-US',
        include_adult: false,
        page: 1
      }
    });

    const transformedMovies = transformMovies(response.data.results);
    res.status(200).json(transformedMovies);
  } catch (error) {
    console.error('Movie Fetch Error:', error.message);
    res.status(500).json({ 
      message: 'Failed to fetch movies', 
      error: error.response?.data || error.message
    });
  }
});

// Get Genres
router.get('/genres', async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US'
      }
    });

    res.status(200).json(response.data.genres);
  } catch (error) {
    console.error('Genres Fetch Error:', error.message);
    res.status(500).json({ 
      message: 'Failed to fetch genres', 
      error: error.response?.data || error.message
    });
  }
});

// Get Movies by Genre
router.get('/genre', async (req, res) => {
  try {
    const { genre } = req.query;

    // First, fetch genre ID
    const genreResponse = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US'
      }
    });

    const genreObj = genreResponse.data.genres.find(
      g => g.name.toLowerCase() === genre.toLowerCase()
    );

    if (!genreObj) {
      return res.status(404).json({ message: 'Genre not found' });
    }

    // Fetch movies by genre ID
    const moviesResponse = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        with_genres: genreObj.id,
        language: 'en-US',
        include_adult: false,
        page: 1
      }
    });

   
    const transformedMovies = transformMovies(moviesResponse.data.results);
    res.status(200).json(transformedMovies);
  } catch (error) {
    console.error('Genre Movies Fetch Error:', error.message);
    res.status(500).json({ 
      message: 'Failed to fetch movies by genre', 
      error: error.response?.data || error.message
    });
  }
});



module.exports = router;