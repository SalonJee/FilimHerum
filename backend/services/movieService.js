import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/movies';

export const movieService = {
  async getPopularMovies(query = '') {
    try {
      const response = await axios.get(`${BASE_URL}/popular`, {
        params: { query }
      });
      
      // Ensure response.data is an array
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  },

  // New method to fetch genres
  async getGenres() {
    try {
      const response = await axios.get(`${BASE_URL}/genres`);
      return response.data;
    } catch (error) {
      console.error('Error fetching genres:', error);
      throw error;
    }
  },

  // New method to fetch movies by genre
  async getMoviesByGenre(genre) {
    try {
      const response = await axios.get(`${BASE_URL}/genre`, {
        params: { genre }
      });
      
      // Ensure response.data is an array
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching movies by genre:', error);
      throw error;
    }
  },


// NEW: Recommendations method
async getRecommendations() {
  try {
    const response = await axios.get(`${BASE_URL}/recommendations`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
}
};