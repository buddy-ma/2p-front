import axios from 'axios'

/**
 * API Configuration
 * 
 * Development: Uses relative URLs (/api) which are proxied by Vite to http://localhost:8001
 * Production: Uses VITE_API_BASE_URL environment variable for the full API URL
 * 
 * IMPORTANT: Do NOT set VITE_API_BASE_URL in development (.env.local) 
 * as it will bypass the Vite proxy and cause CORS issues
 */

const baseURL = import.meta.env.VITE_API_BASE_URL 
  ? `${import.meta.env.VITE_API_BASE_URL}/api` 
  : 'https://2p.ma/api' // Relative URL - Vite proxy will forward to Laravel backend

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add Accept-Language header based on current locale
    try {
      const locale = localStorage.getItem('app_locale') || 'fr'
      config.headers['Accept-Language'] = locale
    } catch (error) {
      // Fallback to French if localStorage is not available
      config.headers['Accept-Language'] = 'fr'
    }
    
    // Add auth token if available
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    console.error('API Request Error:', error)
    return Promise.reject(error)
  }
)

// Product listing paths that may return 200 with original.error (treat as 410)
const PRODUCT_LISTING_PATHS = ['/products/achat', '/products/location', '/products/vacances', '/products/immoneuf']

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Backend sometimes returns 200 with original.error (e.g. "Extra not found") — treat as 410
    const url = response.config?.url || ''
    if (response.status === 200 && response.data?.original?.error) {
      const isProductListing = PRODUCT_LISTING_PATHS.some(path => url.includes(path))
      if (isProductListing) {
        import('../router').then(({ default: router }) => router.push('/410'))
        return Promise.reject(Object.assign(new Error(response.data.original.error), {
          response: { status: 410, data: response.data },
        }))
      }
    }
    return response
  },
  (error) => {
    console.error('API Response Error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      data: error.response?.data
    })
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login if needed
      localStorage.removeItem('auth_token')
    } else if (error.response?.status === 410) {
      import('../router').then(({ default: router }) => router.push('/410'))
    } else if (error.response?.status === 404) {
      console.error('404 Not Found - Check if Laravel backend is running on the correct port')
    }
    return Promise.reject(error)
  }
)

export default api

