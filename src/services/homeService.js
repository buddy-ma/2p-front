import api from './api'

export const homeService = {
  /**
   * Get home page data
   * @returns {Promise} Home page data including premium products, sold products, cities, types, footer blogs
   */
  getHomeData() {
    return api.get('/home')
  },
}

