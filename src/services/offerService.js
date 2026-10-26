import api from './api'

export const offerService = {
  // GET ${VITE_API_BASE_URL}/api/offers — api.js already appends /api.
  getOffers() {
    return api.get('/offers')
  },
}
