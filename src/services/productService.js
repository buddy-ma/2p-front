import api from './api'

export const productService = {
  /**
   * Get products for achat category
   * @param {Object} params - Query parameters (ville, quartier, type, extra, etc.)
   * @returns {Promise} Product listing data
   */
  getAchatProducts(params = {}) {
    return api.get('/products/achat', { params })
  },

  /**
   * Get products for location category
   * @param {Object} params - Query parameters
   * @returns {Promise} Product listing data
   */
  getLocationProducts(params = {}) {
    return api.get('/products/location', { params })
  },

  /**
   * Get products for vacances category
   * @param {Object} params - Query parameters
   * @returns {Promise} Product listing data
   */
  getVacancesProducts(params = {}) {
    return api.get('/products/vacances', { params })
  },

  /**
   * Get products for immoneuf category
   * @param {Object} params - Query parameters
   * @returns {Promise} Product listing data
   */
  getImmoneufProducts(params = {}) {
    return api.get('/products/immoneuf', { params })
  },

  /**
   * Get quartiers
   * @param {Object} params - Query parameters (title)
   * @returns {Promise} Quartiers data
   */
  getQuartiers(params = {}) {
    return api.get('/quartiers', { params })
  },

  /**
   * Get product types
   * @param {Object} params - Query parameters (product_category_id, language_id)
   * @returns {Promise} Product types data
   */
  getTypes(params = {}) {
    return api.get('/types', { params })
  },

  /**
   * Get product extras
   * @param {Object} params - Query parameters (product_type_id)
   * @returns {Promise} Product extras data
   */
  getExtras(params = {}) {
    return api.get('/extras', { params })
  },

  /**
   * Get product categories
   * @returns {Promise} Product categories data
   */
  getCategories() {
    return api.get('/categories')
  },

  /**
   * Get villes
   * @returns {Promise} Villes data
   */
  getVilles() {
    return api.get('/villes')
  },

  /**
   * Create a new product
   * @param {FormData} formData - Product form data including images
   * @returns {Promise} Created product data
   */
  createProduct(formData) {
    return api.post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
  },

  /**
   * Create product with authentication (combined endpoint)
   * Validates product data first, then handles auth, then creates product
   * @param {FormData} formData - Product form data including images and auth data
   * @returns {Promise} Created product data with token
   */
  createProductWithAuth(formData) {
    return api.post('/products/with-auth', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
  },
}

