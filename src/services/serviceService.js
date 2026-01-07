import api from './api'

export const serviceService = {
  /**
   * Get service page data
   * @param {string} service - Service name (professionnels, service-promoteur, etc.)
   * @returns {Promise} Service page data
   */
  getServiceData(service) {
    return api.get(`/services/${service}`)
  },
  
  /**
   * Get service page (alias for getServiceData)
   * @param {string} service - Service name
   * @returns {Promise} Service page data
   */
  getServicePage(service) {
    return this.getServiceData(service)
  },
}

