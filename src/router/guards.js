import { getCurrentLocaleFromPath, getLocalizedPath } from '../utils/routeHelpers'

const AVAILABLE_LOCALES = ['fr', 'en', 'ar']
const DEFAULT_LOCALE = 'fr'

// Helper function to update locale (can be called from router guard)
const updateLocaleFromPath = (path) => {
  const pathLocale = getCurrentLocaleFromPath(path)
  const locale = pathLocale || DEFAULT_LOCALE
  
  // Update localStorage
  try {
    localStorage.setItem('app_locale', locale)
  } catch (error) {
    console.error('Failed to save locale:', error)
  }
  
  // Update document attributes
  if (typeof document !== 'undefined') {
    const html = document.documentElement
    html.setAttribute('lang', locale)
    
    if (locale === 'ar') {
      html.setAttribute('dir', 'rtl')
    } else {
      html.setAttribute('dir', 'ltr')
    }
  }
}

/**
 * Router guard to handle language detection and URL normalization
 */
export function setupLanguageGuard(router) {
  router.beforeEach((to, from, next) => {
    // Extract locale from path
    const pathLocale = getCurrentLocaleFromPath(to.path)
    
    // If locale is in path, continue
    if (pathLocale) {
      updateLocaleFromPath(to.path)
      next()
      return
    }

    // If no locale in path, check localStorage
    const storedLocale = localStorage.getItem('app_locale')
    
    if (storedLocale && AVAILABLE_LOCALES.includes(storedLocale) && storedLocale !== DEFAULT_LOCALE) {
      // Redirect to localized path
      const localizedPath = getLocalizedPath(to.path, storedLocale)
      next(localizedPath)
      return
    }

    // Default: use French (no prefix needed)
    updateLocaleFromPath(to.path)
    next()
  })

  router.afterEach((to) => {
    updateLocaleFromPath(to.path)
  })
}
