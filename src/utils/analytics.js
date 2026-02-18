/**
 * Analytics and Tracking Scripts
 * Loads Google Analytics, Facebook Pixel, Yandex Metrika, and other tracking scripts
 */

const ANALYTICS_LOADED = {
  gtag: false,
  facebook: false,
  yandex: false,
  clarity: false,
}

/**
 * Load Google Analytics (deferred for performance)
 */
export function loadGoogleAnalytics() {
  if (typeof window === 'undefined' || ANALYTICS_LOADED.gtag) return
  
  // Initialize dataLayer early (doesn't block)
  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', 'AW-10939895437')
  gtag('config', 'G-LFPV895XGZ')
  
  // Defer script loading until idle or after 2 seconds
  const loadScript = () => {
    const script = document.createElement('script')
    script.async = true
    script.defer = true
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-LFPV895XGZ'
    document.head.appendChild(script)
    ANALYTICS_LOADED.gtag = true
  }
  
  // Use requestIdleCallback if available, otherwise setTimeout
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadScript, { timeout: 2000 })
  } else {
    setTimeout(loadScript, 2000)
  }
}

/**
 * Load Facebook Pixel (deferred for performance)
 */
export function loadFacebookPixel() {
  if (typeof window === 'undefined' || ANALYTICS_LOADED.facebook) return
  
  if (window.fbq) return
  
  // Initialize fbq queue early (doesn't block)
  window.fbq = function() {
    window.fbq.callMethod ? window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments)
  }
  if (!window._fbq) window._fbq = window.fbq
  window.fbq.push = window.fbq
  window.fbq.loaded = true
  window.fbq.version = '2.0'
  window.fbq.queue = []
  
  window.fbq('init', '1027173928317519')
  window.fbq('track', 'PageView')
  
  // Defer script loading until idle or after 3 seconds
  const loadScript = () => {
    const script = document.createElement('script')
    script.async = true
    script.defer = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    document.head.appendChild(script)
    ANALYTICS_LOADED.facebook = true
  }
  
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadScript, { timeout: 3000 })
  } else {
    setTimeout(loadScript, 3000)
  }
}

/**
 * Load Yandex Metrika (deferred for performance)
 */
export function loadYandexMetrika() {
  if (typeof window === 'undefined' || ANALYTICS_LOADED.yandex) return
  
  // Initialize ym queue early (doesn't block)
  window.ym = window.ym || function() {
    (window.ym.a = window.ym.a || []).push(arguments)
  }
  window.ym.l = 1 * new Date()
  
  window.ym(97358163, 'init', {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
  })
  
  // Defer script loading until idle or after 4 seconds
  const loadScript = () => {
    // Check if already loaded
    for (var j = 0; j < document.scripts.length; j++) {
      if (document.scripts[j].src === 'https://mc.yandex.ru/metrika/tag.js') {
        ANALYTICS_LOADED.yandex = true
        return
      }
    }
    
    const k = document.createElement('script')
    const a = document.getElementsByTagName('script')[0]
    k.async = 1
    k.defer = true
    k.src = 'https://mc.yandex.ru/metrika/tag.js'
    a.parentNode.insertBefore(k, a)
    ANALYTICS_LOADED.yandex = true
  }
  
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadScript, { timeout: 4000 })
  } else {
    setTimeout(loadScript, 4000)
  }
}

/**
 * Load Microsoft Clarity (deferred for performance)
 */
export function loadClarity() {
  if (typeof window === 'undefined' || ANALYTICS_LOADED.clarity) return
  
  // Initialize clarity queue early (doesn't block)
  window.clarity = window.clarity || function() {
    (window.clarity.q = window.clarity.q || []).push(arguments)
  }
  
  // Defer script loading until idle or after 5 seconds
  const loadScript = () => {
    const t = document.createElement('script')
    const y = document.getElementsByTagName('script')[0]
    t.async = 1
    t.defer = true
    t.src = 'https://www.clarity.ms/tag/mbgrxongwo'
    y.parentNode.insertBefore(t, y)
    ANALYTICS_LOADED.clarity = true
  }
  
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadScript, { timeout: 5000 })
  } else {
    setTimeout(loadScript, 5000)
  }
}

/**
 * Initialize all analytics scripts
 */
export function initializeAnalytics() {
  if (typeof window === 'undefined') return
  
  // Only load in production
  if (import.meta.env.PROD) {
    loadGoogleAnalytics()
    loadFacebookPixel()
    loadYandexMetrika()
    loadClarity()
  }
}

/**
 * Add verification meta tags
 */
export function addVerificationTags() {
  if (typeof document === 'undefined') return
  
  updateMetaTag('yandex-verification', 'c91cae9ec385daef')
  updateMetaTag('p:domain_verify', 'b922dfebe37c7c7fd6fb75e85358d85f')
}

function updateMetaTag(name, content) {
  let element = document.querySelector(`meta[name="${name}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute('name', name)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}
