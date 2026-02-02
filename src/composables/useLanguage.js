import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const STORAGE_KEY = 'app_locale'
const AVAILABLE_LOCALES = ['fr', 'en', 'ar']
const DEFAULT_LOCALE = 'fr'

// Global state
const currentLocale = ref(DEFAULT_LOCALE)

export function useLanguage() {
  const route = useRoute()
  const router = useRouter()

  // Sync currentLocale with localStorage on initialization
  try {
    const storedLocale = localStorage.getItem(STORAGE_KEY)
    if (storedLocale && AVAILABLE_LOCALES.includes(storedLocale)) {
      currentLocale.value = storedLocale
    }
  } catch (error) {
    // Ignore localStorage errors
  }

  // Initialize locale from localStorage or URL
  const initializeLocale = () => {
    // First, try to get from URL path
    const pathLocale = extractLocaleFromPath(route.path)
    if (pathLocale) {
      currentLocale.value = pathLocale
      saveLocaleToStorage(pathLocale)
      updateDocumentAttributes(pathLocale)
      return pathLocale
    }

    // Then try localStorage
    const storedLocale = localStorage.getItem(STORAGE_KEY)
    if (storedLocale && AVAILABLE_LOCALES.includes(storedLocale)) {
      currentLocale.value = storedLocale
      updateDocumentAttributes(storedLocale)
      return storedLocale
    }

    // Default to French
    currentLocale.value = DEFAULT_LOCALE
    saveLocaleToStorage(DEFAULT_LOCALE)
    updateDocumentAttributes(DEFAULT_LOCALE)
    return DEFAULT_LOCALE
  }

  // Extract locale from path (e.g., /en/vente -> 'en', /ar/vente -> 'ar', /vente -> null)
  const extractLocaleFromPath = (path) => {
    const segments = path.split('/').filter(Boolean)
    const firstSegment = segments[0]
    
    if (AVAILABLE_LOCALES.includes(firstSegment) && firstSegment !== DEFAULT_LOCALE) {
      return firstSegment
    }
    return null
  }

  // Get current locale
  const getCurrentLocale = () => {
    return currentLocale.value
  }

  // Set locale
  const setLocale = (locale) => {
    if (!AVAILABLE_LOCALES.includes(locale)) {
      console.warn(`Invalid locale: ${locale}. Using default: ${DEFAULT_LOCALE}`)
      locale = DEFAULT_LOCALE
    }

    currentLocale.value = locale
    saveLocaleToStorage(locale)
    updateDocumentAttributes(locale)
  }

  // Save locale to localStorage
  const saveLocaleToStorage = (locale) => {
    try {
      localStorage.setItem(STORAGE_KEY, locale)
    } catch (error) {
      console.error('Failed to save locale to localStorage:', error)
    }
  }

  // Update document lang and dir attributes
  const updateDocumentAttributes = (locale) => {
    const html = document.documentElement
    html.setAttribute('lang', locale)
    
    // Set direction: Arabic is RTL, others are LTR
    if (locale === 'ar') {
      html.setAttribute('dir', 'rtl')
    } else {
      html.setAttribute('dir', 'ltr')
    }
  }

  // Get localized path (adds or removes language prefix)
  const getLocalizedPath = (path, locale = null) => {
    const targetLocale = locale || currentLocale.value
    
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
    if (targetLocale === DEFAULT_LOCALE) {
      return cleanPath || '/'
    }

    // Ensure path starts with /
    if (!cleanPath.startsWith('/')) {
      cleanPath = '/' + cleanPath
    }

    return `/${targetLocale}${cleanPath}`
  }

  // Switch language preserving current route
  const switchLanguage = (newLocale) => {
    if (!AVAILABLE_LOCALES.includes(newLocale)) {
      console.warn(`Invalid locale: ${newLocale}`)
      return
    }

    try {
      const currentPath = route.path
      const newPath = getLocalizedPath(currentPath, newLocale)
      
      setLocale(newLocale)
      // Refresh the page to ensure all components reload with the new language
      window.location.href = newPath
    } catch (error) {
      console.error('Error switching language:', error)
      // Fallback: just update locale and refresh
      setLocale(newLocale)
      window.location.reload()
    }
  }

  // Check if current route has locale prefix
  const hasLocalePrefix = computed(() => {
    return extractLocaleFromPath(route.path) !== null
  })

  // Get current locale from path or state
  const localeFromPath = computed(() => {
    return extractLocaleFromPath(route.path) || currentLocale.value
  })

  // Watch route changes to update locale
  watch(() => route.path, (newPath) => {
    const pathLocale = extractLocaleFromPath(newPath)
    if (pathLocale && pathLocale !== currentLocale.value) {
      currentLocale.value = pathLocale
      saveLocaleToStorage(pathLocale)
      updateDocumentAttributes(pathLocale)
    } else if (!pathLocale && currentLocale.value !== DEFAULT_LOCALE) {
      // If no locale in path, it's French
      currentLocale.value = DEFAULT_LOCALE
      saveLocaleToStorage(DEFAULT_LOCALE)
      updateDocumentAttributes(DEFAULT_LOCALE)
    }
  }, { immediate: true })

  return {
    currentLocale: computed(() => currentLocale.value),
    availableLocales: AVAILABLE_LOCALES,
    defaultLocale: DEFAULT_LOCALE,
    getCurrentLocale,
    setLocale,
    switchLanguage,
    getLocalizedPath,
    initializeLocale,
    hasLocalePrefix,
    localeFromPath,
    updateDocumentAttributes,
  }
}
