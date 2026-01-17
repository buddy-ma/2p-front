import api from './api'

export const authService = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise} User and token data
   */
  register(userData) {
    return api.post('/auth/register', userData)
  },

  /**
   * Login user
   * @param {Object} credentials - Login credentials (email, password)
   * @returns {Promise} User and token data
   */
  login(credentials) {
    return api.post('/auth/login', credentials)
  },

  /**
   * Get current authenticated user
   * @returns {Promise} User data
   */
  getCurrentUser() {
    return api.get('/user')
  },
}
