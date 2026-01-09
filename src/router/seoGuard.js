import { getCanonicalUrl, getAlternateUrls, getRobotsContent, BASE_URL } from '../utils/seo'
import fr from '../locales/fr.js'
import en from '../locales/en.js'
import ar from '../locales/ar.js'

const translations = { fr, en, ar }

/**
 * Get translation value
 */
function getTranslation(key, locale) {
  const keys = key.split('.')
  let value = translations[locale] || translations.fr
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      // Fallback to French
      value = translations.fr
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = value[fallbackKey]
        } else {
          return key
        }
      }
      break
    }
  }
  
  return typeof value === 'string' ? value : key
}

/**
 * Update meta tag
 */
function updateMetaTag(name, content, attribute = 'name') {
  if (typeof document === 'undefined') return
  
  let element = document.querySelector(`meta[${attribute}="${name}"]`) ||
                document.querySelector(`meta[property="${name}"]`)
  
  if (!element) {
    element = document.createElement('meta')
    if (name.startsWith('og:') || name.startsWith('twitter:')) {
      element.setAttribute('property', name)
    } else {
      element.setAttribute(attribute, name)
    }
    document.head.appendChild(element)
  }
  
  element.setAttribute('content', content)
}

/**
 * Update link tag
 */
function updateLinkTag(rel, href, attributes = {}) {
  if (typeof document === 'undefined') return
  
  let selector = `link[rel="${rel}"]`
  if (attributes.hreflang) {
    selector += `[hreflang="${attributes.hreflang}"]`
  }
  
  let element = document.querySelector(selector)
  
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    if (attributes.hreflang) {
      element.setAttribute('hreflang', attributes.hreflang)
    }
    document.head.appendChild(element)
  }
  
  element.setAttribute('href', href)
}

/**
 * Remove link tags by rel
 */
function removeLinkTags(rel) {
  if (typeof document === 'undefined') return
  const elements = document.querySelectorAll(`link[rel="${rel}"]`)
  elements.forEach(el => el.remove())
}

/**
 * Update or create JSON-LD structured data
 */
function updateStructuredData(data) {
  if (typeof document === 'undefined') return
  
  // Remove existing organization schema
  let existingScript = document.querySelector('script[type="application/ld+json"][data-schema="organization"]')
  if (existingScript) {
    existingScript.remove()
  }
  
  // Create new script
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.setAttribute('data-schema', 'organization')
  script.textContent = JSON.stringify(data, null, 2)
  document.head.appendChild(script)
}

/**
 * Setup SEO guard to update meta tags on route changes
 */
export function setupSEOGuard(router) {
  router.afterEach((to) => {
    // Get locale from route or localStorage
    let locale = to.meta?.locale || 'fr'
    try {
      const storedLocale = localStorage.getItem('app_locale')
      if (storedLocale && ['fr', 'en', 'ar'].includes(storedLocale)) {
        locale = storedLocale
      }
    } catch (e) {
      // Ignore
    }
    
    // Update HTML lang attribute
    if (typeof document !== 'undefined') {
      const html = document.documentElement
      html.setAttribute('lang', locale)
      if (locale === 'ar') {
        html.setAttribute('dir', 'rtl')
      } else {
        html.setAttribute('dir', 'ltr')
      }
    }
    
    // Get SEO meta from route
    const seoMeta = to.meta?.seo || {}
    
    // Build SEO data
    const title = seoMeta.titleKey ? getTranslation(seoMeta.titleKey, locale) : getTranslation('home.title', locale)
    const description = seoMeta.descriptionKey ? getTranslation(seoMeta.descriptionKey, locale) : getTranslation('home.description', locale)
    const image = seoMeta.image || '/assets/images/immobilier/immobilier-de-particulier-a-particulier-maroc.webp'
    const canonicalUrl = getCanonicalUrl(to.path)
    const alternateUrls = getAlternateUrls(to.path)
    const robotsContent = getRobotsContent()
    
    // Update title
    if (typeof document !== 'undefined') {
      document.title = title
    }
    
    // Update meta tags
    updateMetaTag('robots', robotsContent)
    updateMetaTag('author', 'Particulier à Particulier')
    updateMetaTag('description', description)
    updateMetaTag('theme-color', '#ffffff')
    updateMetaTag('msapplication-TileColor', '#ffc40d')
    
    // Canonical URL
    updateLinkTag('canonical', canonicalUrl)
    
    // Alternate hreflang links
    removeLinkTags('alternate')
    Object.keys(alternateUrls).forEach(loc => {
      updateLinkTag('alternate', alternateUrls[loc], { hreflang: loc })
    })
    
    // Open Graph tags
    const ogImage = image.startsWith('http') ? image : `${BASE_URL}${image}`
    updateMetaTag('og:url', canonicalUrl, 'property')
    updateMetaTag('og:type', 'website', 'property')
    updateMetaTag('og:title', title, 'property')
    updateMetaTag('og:description', description, 'property')
    updateMetaTag('og:image', ogImage, 'property')
    updateMetaTag('og:site_name', 'Particulier à Particulier', 'property')
    updateMetaTag('og:image:width', '600', 'property')
    updateMetaTag('og:image:height', '600', 'property')
    updateMetaTag('og:logo', `${BASE_URL}/assets/images/logo-blue.svg`, 'property')
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', 'name')
    updateMetaTag('twitter:domain', '2p.ma', 'property')
    updateMetaTag('twitter:url', canonicalUrl, 'property')
    updateMetaTag('twitter:title', title, 'name')
    updateMetaTag('twitter:description', description, 'name')
    updateMetaTag('twitter:image', ogImage, 'name')
    updateMetaTag('twitter:site', '@2Pmaimmobilier', 'name')
    updateMetaTag('twitter:creator', '@2Pmaimmobilier', 'name')
    
    // Structured Data (JSON-LD) - Organization Schema
    updateStructuredData({
      '@context': 'https://schema.org/',
      '@type': 'Organization',
      '@id': '#Organization',
      url: `${BASE_URL}/`,
      legalName: 'Particulier à particulier',
      name: '2p',
      description: description,
      image: ogImage,
      logo: `${BASE_URL}/assets/images/logo-blue.svg`,
      telephone: '+212 661 678 714',
      faxNumber: '+212 528 226 080',
      email: 'immo@2p.ma',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '38Bis Avenue Al Hamra',
        addressLocality: 'Agadir',
        addressRegion: 'Souss Massa Draa',
        addressCountry: 'Maroc',
        postalCode: '80000',
      },
      sameAs: [
        'https://www.facebook.com/particulier.ma',
        'https://www.youtube.com/channel/UCTCtax33qZQf-wLY2JQ6oQQ',
        'https://www.instagram.com/2p_ma/',
        'https://ma.linkedin.com/company/2p-ma',
      ],
    })
  })
}
