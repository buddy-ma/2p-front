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
 * Load Google Analytics
 */
export function loadGoogleAnalytics() {
  if (typeof window === 'undefined' || ANALYTICS_LOADED.gtag) return
  
  // Load gtag script
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-LFPV895XGZ'
  document.head.appendChild(script)
  
  // Initialize dataLayer
  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', 'AW-10939895437')
  gtag('config', 'G-LFPV895XGZ')
  
  ANALYTICS_LOADED.gtag = true
}

/**
 * Load Facebook Pixel
 */
export function loadFacebookPixel() {
  if (typeof window === 'undefined' || ANALYTICS_LOADED.facebook) return
  
  if (window.fbq) return
  
  window.fbq = function() {
    window.fbq.callMethod ? window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments)
  }
  if (!window._fbq) window._fbq = window.fbq
  window.fbq.push = window.fbq
  window.fbq.loaded = true
  window.fbq.version = '2.0'
  window.fbq.queue = []
  
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'
  const firstScript = document.getElementsByTagName('script')[0]
  firstScript.parentNode.insertBefore(script, firstScript)
  
  window.fbq('init', '1027173928317519')
  window.fbq('track', 'PageView')
  
  ANALYTICS_LOADED.facebook = true
}

/**
 * Load Yandex Metrika
 */
export function loadYandexMetrika() {
  if (typeof window === 'undefined' || ANALYTICS_LOADED.yandex) return
  
  (function(m, e, t, r, i, k, a) {
    m[i] = m[i] || function() {
      (m[i].a = m[i].a || []).push(arguments)
    }
    m[i].l = 1 * new Date()
    for (var j = 0; j < document.scripts.length; j++) {
      if (document.scripts[j].src === r) {
        return
      }
    }
    k = e.createElement(t)
    a = e.getElementsByTagName(t)[0]
    k.async = 1
    k.src = r
    a.parentNode.insertBefore(k, a)
  })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym')
  
  window.ym(97358163, 'init', {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
  })
  
  ANALYTICS_LOADED.yandex = true
}

/**
 * Load Microsoft Clarity
 */
export function loadClarity() {
  if (typeof window === 'undefined' || ANALYTICS_LOADED.clarity) return
  
  ;(function(c, l, a, r, i, t, y) {
    c[a] = c[a] || function() {
      (c[a].q = c[a].q || []).push(arguments)
    }
    t = l.createElement(r)
    t.async = 1
    t.src = 'https://www.clarity.ms/tag/' + i
    y = l.getElementsByTagName(r)[0]
    y.parentNode.insertBefore(t, y)
  })(window, document, 'clarity', 'script', 'mbgrxongwo')
  
  ANALYTICS_LOADED.clarity = true
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
