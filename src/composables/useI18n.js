import { computed } from 'vue'
import { useLanguage } from './useLanguage'
import fr from '../locales/fr.js'
import en from '../locales/en.js'
import ar from '../locales/ar.js'

const translations = {
  fr,
  en,
  ar,
}

export function useI18n() {
  const { currentLocale } = useLanguage()

  const t = (key, params = {}) => {
    const locale = currentLocale.value || 'fr'
    const keys = key.split('.')
    let value = translations[locale] || translations.fr

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // Fallback to French if translation not found
        value = translations.fr
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey]
          } else {
            return key // Return key if translation not found
          }
        }
        break
      }
    }

    // Replace parameters if provided (supports both :param and {param} formats)
    if (typeof value === 'string' && Object.keys(params).length > 0) {
      // Laravel format: :param
      value = value.replace(/:(\w+)/g, (match, paramKey) => {
        return params[paramKey] !== undefined ? params[paramKey] : match
      })
      // Also support {param} format
      value = value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey] !== undefined ? params[paramKey] : match
      })
    }

    return typeof value === 'string' ? value : key
  }

  return {
    t,
    currentLocale: computed(() => currentLocale.value),
  }
}
