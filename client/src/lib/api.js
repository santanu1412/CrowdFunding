import axios from 'axios';

/**
 * Centralized Axios instance for backend communication.
 * Automatically handles the base URL based on the environment and ensures
 * secure cookies (JWT) are sent with every request.
 */
const api = axios.create({
  // Use VITE_API_URL if defined (production), otherwise default to the Vite proxy ('/api')
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true, // Crucial for sending/receiving httpOnly cookies
});

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Extract the exact error message sent from the Express backend
    const message = error.response?.data?.message || 'An unexpected system error occurred';
    
    // Attach the cleaned-up message to the rejected promise so components can display it easily
    return Promise.reject({ ...error, message });
  }
);

export default api;