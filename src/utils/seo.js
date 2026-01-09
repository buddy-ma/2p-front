/**
 * SEO Utilities
 * Functions to generate canonical URLs, alternate URLs, and clean URLs for SEO
 */

const AVAILABLE_LOCALES = ['fr', 'en', 'ar']
const DEFAULT_LOCALE = 'fr'
export const BASE_URL = import.meta.env.VITE_APP_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://www.2p.ma')

/**
 * Get clean URL without query parameters (for canonical)
 * Also removes locale prefix for canonical (canonical should be French version)
 */
export function getCanonicalUrl(path = null) {
  if (!path) {
    // Get current path without query string
    if (typeof window !== 'undefined') {
      path = window.location.pathname
    } else {
      path = '/'
    }
  }
  
  // Remove query string
  let cleanPath = path.split('?')[0]
  
  // Remove locale prefix for canonical (canonical should always be French version)
  for (const locale of AVAILABLE_LOCALES) {
    if (locale !== DEFAULT_LOCALE && cleanPath.startsWith(`/${locale}/`)) {
      cleanPath = cleanPath.replace(`/${locale}/`, '/')
      break
    } else if (cleanPath === `/${locale}`) {
      cleanPath = '/'
      break
    }
  }
  
  // Make absolute URL
  if (cleanPath.startsWith('http')) {
    return cleanPath.split('?')[0]
  }
  
  // Ensure path starts with /
  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath
  }
  
  return `${BASE_URL}${cleanPath}`
}

/**
 * Generate alternate hreflang URLs for current route
 */
export function getAlternateUrls(currentPath = null) {
  if (!currentPath && typeof window !== 'undefined') {
    currentPath = window.location.pathname
  }
  
  if (!currentPath) {
    currentPath = '/'
  }
  
  // Remove query string for base path
  let basePath = currentPath.split('?')[0]
  
  // Remove existing locale prefix if present
  for (const locale of AVAILABLE_LOCALES) {
    if (locale !== DEFAULT_LOCALE && basePath.startsWith(`/${locale}/`)) {
      basePath = basePath.replace(`/${locale}/`, '/')
      break
    } else if (basePath === `/${locale}`) {
      basePath = '/'
      break
    }
  }
  
  // Ensure base path starts with /
  if (!basePath.startsWith('/')) {
    basePath = '/' + basePath
  }
  
  const alternates = {}
  
  // Generate URLs for each locale
  AVAILABLE_LOCALES.forEach(locale => {
    if (locale === DEFAULT_LOCALE) {
      // French: no prefix
      alternates[locale] = `${BASE_URL}${basePath}`
    } else {
      // English and Arabic: with prefix
      alternates[locale] = `${BASE_URL}/${locale}${basePath}`
    }
  })
  
  // Add x-default pointing to default locale
  alternates['x-default'] = `${BASE_URL}${basePath}`
  
  return alternates
}

/**
 * Check if URL has query parameters (should be noindex)
 */
export function hasQueryParams() {
  if (typeof window !== 'undefined') {
    return window.location.search.length > 0
  }
  return false
}

/**
 * Get robots meta content based on environment and query params
 */
export function getRobotsContent() {
  // In production, check for query params
  if (import.meta.env.PROD) {
    if (hasQueryParams()) {
      return 'noindex, nofollow'
    }
    return 'index, follow'
  }
  // In development, noindex
  return 'noindex, nofollow'
}

/**
 * Generate localized URL for a given path
 */
export function getLocalizedUrl(locale, path = null) {
  if (!path && typeof window !== 'undefined') {
    path = window.location.pathname
  }
  
  if (!path) {
    path = '/'
  }
  
  // Remove query string
  const cleanPath = path.split('?')[0]
  
  if (locale === DEFAULT_LOCALE) {
    // French: no prefix
    return `${BASE_URL}${cleanPath}`
  } else {
    // English and Arabic: with prefix
    return `${BASE_URL}/${locale}${cleanPath}`
  }
}
