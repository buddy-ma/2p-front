/**
 * Route helper functions for localized path generation
 */

const AVAILABLE_LOCALES = ['fr', 'en', 'ar']
const DEFAULT_LOCALE = 'fr'

/**
 * Extract locale from path
 * @param {string} path - Route path
 * @returns {string|null} - Locale code or null if not found
 */
export function getCurrentLocaleFromPath(path) {
  const segments = path.split('/').filter(Boolean)
  const firstSegment = segments[0]
  
  if (AVAILABLE_LOCALES.includes(firstSegment) && firstSegment !== DEFAULT_LOCALE) {
    return firstSegment
  }
  return null
}

/**
 * Generate localized path
 * @param {string} path - Base path (e.g., '/vente')
 * @param {string} locale - Target locale (fr, en, ar)
 * @returns {string} - Localized path (e.g., '/en/vente' or '/vente' for French)
 */
export function getLocalizedPath(path, locale) {
  // Remove any existing locale prefix
  let cleanPath = path
  for (const loc of AVAILABLE_LOCALES) {
    if (loc !== DEFAULT_LOCALE && cleanPath.startsWith(`/${loc}/`)) {
      cleanPath = cleanPath.replace(`/${loc}/`, '/')
      break
    } else if (cleanPath === `/${loc}`) {
      cleanPath = '/'
      break
    }
  }

  // Add locale prefix if needed (not French)
  if (locale === DEFAULT_LOCALE) {
    return cleanPath || '/'
  }

  // Ensure path starts with /
  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath
  }

  return `/${locale}${cleanPath}`
}

/**
 * Remove locale prefix from path
 * @param {string} path - Path with possible locale prefix
 * @returns {string} - Path without locale prefix
 */
export function removeLocalePrefix(path) {
  let cleanPath = path
  for (const loc of AVAILABLE_LOCALES) {
    if (loc !== DEFAULT_LOCALE && cleanPath.startsWith(`/${loc}/`)) {
      cleanPath = cleanPath.replace(`/${loc}/`, '/')
      break
    } else if (cleanPath === `/${loc}`) {
      cleanPath = '/'
      break
    }
  }
  return cleanPath || '/'
}

/**
 * Check if path has locale prefix
 * @param {string} path - Route path
 * @returns {boolean} - True if path has locale prefix
 */
export function hasLocalePrefix(path) {
  return getCurrentLocaleFromPath(path) !== null
}

/**
 * Get base path without locale
 * @param {string} path - Full path
 * @returns {string} - Base path
 */
export function getBasePath(path) {
  return removeLocalePrefix(path)
}
