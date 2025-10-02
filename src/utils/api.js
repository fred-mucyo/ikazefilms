// Frontend-only movie data utilities
import staticMovies from './staticMovies.js';

// Simple cache for movie list
let movieCache = null;

export const api = {
  // Fetch all movies (now returns static data)
  getMovies: async () => {
    try {
      if (movieCache) {
        console.log('Returning cached movies');
        return movieCache;
      }

      console.log('Loading static movies:', staticMovies.length);

      // Cache results
      movieCache = staticMovies;
      return staticMovies;
    } catch (error) {
      console.error('Error loading movies:', error);
      throw new Error(`Failed to load movies: ${error.message}`);
    }
  },

  // Fetch single movie by ID (now searches static data)
  getMovie: async (id) => {
    try {
      const movie = staticMovies.find((m) => m.id === id);
      if (!movie) {
        throw new Error(`Movie not found: ${id}`);
      }
      console.log('Movie found:', movie.title);
      return movie;
    } catch (error) {
      console.error('Error fetching movie:', error);
      throw new Error(`Failed to load movie: ${error.message}`);
    }
  },

  // Mock user profile (frontend-only)
  getUserProfile: async (token) => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      if (!userData.id) {
        throw new Error('User not found');
      }
      return userData;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  // Mock update user profile (frontend-only)
  updateUserProfile: async (token, userData) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('userData') || '{}');
      const updatedUser = { ...currentUser, ...userData };
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  // Mock change password (frontend-only)
  changePassword: async (token, currentPassword, newPassword) => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      if (userData.password !== currentPassword) {
        throw new Error('Current password is incorrect');
      }

      const updatedUser = { ...userData, password: newPassword };
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      return { message: 'Password changed successfully' };
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  },
};

// Helper: get streaming URL (now returns direct video URL)
export const getStreamUrl = (movieId) => {
  const movie = staticMovies.find((m) => m.id === movieId);
  return movie?.video_url || '#';
};

// Helper: format date
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Helper: truncate text
export const truncateText = (text, maxLength = 150) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
