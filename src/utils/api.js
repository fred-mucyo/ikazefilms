// API Configuration - Uses environment variable with fallback to local development
const isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development';

// Use local backend for development, production backend for production
export const API_BASE_URL = isDevelopment
  ? 'http://localhost:5012/api' // Local development
  : (import.meta.env.VITE_API_BASE_URL || 'https://movies-backend-zijv.onrender.com/api'); // Production

// Debug logging
console.log('Environment check:', {
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  isDevelopment,
  API_BASE_URL
});

// Validate environment variable
if (!API_BASE_URL) {
  console.error('❌ API_BASE_URL is not set!');
  console.error('Available environment variables:', Object.keys(import.meta.env));
  console.error('Please create a .env file with VITE_API_BASE_URL=https://movies-backend-zijv.onrender.com/api');
} else {
  console.log('✅ API_BASE_URL is configured:', API_BASE_URL);
}

// Helper to get API URL
export const getApiUrl = () => API_BASE_URL;

// --- Retry Helper ---
const fetchWithRetry = async (url, options, retries = 2, delay = 4000) => {
  for (let i = 0; i <= retries; i++) {
    try {
      return await fetch(url, options);
    } catch (err) {
      if (i < retries) {
        console.warn(`Retrying request... attempt ${i + 2}`);
        await new Promise(r => setTimeout(r, delay));
      } else {
        throw err;
      }
    }
  }
};

// --- Timeout Helper ---
const timeout = isDevelopment ? 100000 : 1000000; // 10s dev, 60s prod (cold start safe)

// --- Simple cache for movie list ---
let movieCache = null;

export const api = {
  // Fetch all movies
  getMovies: async () => {
    try {
      if (movieCache) {
        console.log('Returning cached movies');
        return movieCache;
      }

      const url = `${getApiUrl()}/movies`;
      console.log('Fetching movies from:', url);

      const response = await fetchWithRetry(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(timeout)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Movies fetched successfully:', data.length);

      // Cache results
      movieCache = data;
      return data;
    } catch (error) {
      console.error('Error fetching movies:', error);

      if (error.name === 'AbortError') {
        throw new Error('Request timed out. Server may be waking up.');
      }

      if (error.message.includes('Failed to fetch') || error.message.includes('Unable to connect')) {
        throw new Error('Unable to connect to the server. Please check your internet connection.');
      }

      throw new Error(`Failed to load movies: ${error.message}`);
    }
  },

  // Fetch single movie by ID
  getMovie: async (id) => {
    try {
      const url = `${getApiUrl()}/movies/${id}`;
      console.log('Fetching movie from:', url);

      const response = await fetchWithRetry(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(timeout)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`Movie not found: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Movie fetched successfully:', data.title);
      return data;
    } catch (error) {
      console.error('Error fetching movie:', error);

      if (error.name === 'AbortError') {
        throw new Error('Request timed out. Server may be waking up.');
      }

      if (error.message.includes('Failed to fetch') || error.message.includes('Unable to connect')) {
        throw new Error('Unable to connect to the server. Please check your internet connection.');
      }

      throw new Error(`Failed to load movie: ${error.message}`);
    }
  },

  // Fetch user profile
  getUserProfile: async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch profile');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  // Update user profile
  updateUserProfile: async (token, userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  // Change user password
  changePassword: async (token, currentPassword, newPassword) => {
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const userId = tokenPayload.id;

      const response = await fetch(`${API_BASE_URL}/users/${userId}/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ current_password: currentPassword, new_password: newPassword })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to change password');
      }
      return await response.json();
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  }
};

// Helper: get streaming URL
export const getStreamUrl = (movieId) => `${getApiUrl()}/stream/${movieId}`;

// Helper: format date
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Helper: truncate text
export const truncateText = (text, maxLength = 150) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
