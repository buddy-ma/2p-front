import { watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLanguage } from './useLanguage'
import { useI18n } from './useI18n'
import { getCanonicalUrl, getAlternateUrls, getRobotsContent, hasQueryParams, BASE_URL } from '../utils/seo'

const DEFAULT_OG_IMAGE = '/assets/images/immobilier/immobilier-de-particulier-a-particulier-maroc.webp'
const DEFAULT_SITE_NAME = 'Particulier à Particulier'

/**
 * Update or create a meta tag
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
 * Update or create a link tag
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
  
  // Set additional attributes
  Object.keys(attributes).forEach(key => {
    if (key !== 'hreflang') {
      element.setAttribute(key, attributes[key])
    }
  })
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

export function useSEO(meta = {}) {
  const route = useRoute()
  const { currentLocale } = useLanguage()
  const { t } = useI18n()
  
  // Default meta values
  const defaultMeta = {
    title: t('home.title') || 'Immobilier au Maroc de particulier à particulier',
    description: t('home.description') || '',
    image: DEFAULT_OG_IMAGE,
    type: 'website',
    siteName: DEFAULT_SITE_NAME,
    author: 'Particulier à Particulier',
    ...meta,
  }
  
  /**
   * Update page title
   */
  function updateTitle(title) {
    if (typeof document !== 'undefined') {
      document.title = title || defaultMeta.title
    }
  }
  
  /**
   * Update all SEO meta tags
   */
  function updateSEO(seoMeta = {}) {
    const metaData = { ...defaultMeta, ...seoMeta }
    const currentPath = route.path
    const canonicalUrl = getCanonicalUrl(currentPath)
    const alternateUrls = getAlternateUrls(currentPath)
    const robotsContent = getRobotsContent()
    
    // Update title
    updateTitle(metaData.title)
    
    // Basic meta tags
    updateMetaTag('robots', robotsContent)
    updateMetaTag('author', metaData.author)
    updateMetaTag('description', metaData.description)
    updateMetaTag('theme-color', '#ffffff')
    updateMetaTag('msapplication-TileColor', '#ffc40d')
    
    // Canonical URL
    updateLinkTag('canonical', canonicalUrl)
    
    // Alternate hreflang links
    removeLinkTags('alternate')
    Object.keys(alternateUrls).forEach(locale => {
      updateLinkTag('alternate', alternateUrls[locale], { hreflang: locale })
    })
    
    // Open Graph tags
    const ogImage = metaData.image.startsWith('http') ? metaData.image : `${BASE_URL}${metaData.image}`
    updateMetaTag('og:url', canonicalUrl, 'property')
    updateMetaTag('og:type', metaData.type, 'property')
    updateMetaTag('og:title', metaData.title, 'property')
    updateMetaTag('og:description', metaData.description, 'property')
    updateMetaTag('og:image', ogImage, 'property')
    updateMetaTag('og:site_name', metaData.siteName, 'property')
    updateMetaTag('og:image:width', '600', 'property')
    updateMetaTag('og:image:height', '600', 'property')
    updateMetaTag('og:logo', `${BASE_URL}/assets/images/logo-blue.svg`, 'property')
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', 'name')
    updateMetaTag('twitter:domain', '2p.ma', 'property')
    updateMetaTag('twitter:url', canonicalUrl, 'property')
    updateMetaTag('twitter:title', metaData.title, 'name')
    updateMetaTag('twitter:description', metaData.description, 'name')
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
      description: metaData.description,
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
  }
  
  // Initialize on mount
  onMounted(() => {
    updateSEO()
  })
  
  return {
    updateSEO,
    updateTitle,
  }
}
