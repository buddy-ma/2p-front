import { computed, ref, watch, nextTick, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from './useI18n'
import { useLanguage } from './useLanguage'
import { useServiceTheme } from './useServiceTheme'
import { useSEO } from './useSEO'
import { BASE_URL } from '../utils/seo'
import { isTodo, withoutTodo } from '../utils/todo'
import { serviceImageUrl } from '../utils/serviceImages'
import { CHECKOUT_URLS, SERVICE_AREA, SERVICE_PAGES } from '../config/services'

const NUMBER_PREFIX = /^\s*(\d+)\s*[—–-]\s*/

// "04 — Comment bénéficier du service ?" -> "Comment bénéficier du service ?"
export const stripNumberPrefix = (s = '') => String(s).replace(NUMBER_PREFIX, '')
// "04 — Comment bénéficier du service ?" -> "04"
export const numberPrefix = (s = '') => (String(s).match(NUMBER_PREFIX) || [])[1] || ''

// Offer selected in the lead form, shared between CTAs and <ServiceLeadForm>.
const selectedOffer = ref('')

/**
 * Shared logic for the FR/AR service pages.
 * const { c, common, localePath, scrollToForm, setServiceSEO } = useServicePage('annoncePremium')
 */
export function useServicePage(pageKey) {
  const route = useRoute()
  const { t, tm, currentLocale } = useI18n()
  const { getLocalizedPath } = useLanguage()
  const { colorClasses } = useServiceTheme()

  const c = computed(() => tm(`servicePages.${pageKey}`) || {})
  const common = computed(() => tm('servicePages.common') || {})
  const isRTL = computed(() => currentLocale.value === 'ar')

  const localePath = (path) => getLocalizedPath(path)
  const absoluteUrl = (path) => `${BASE_URL}${localePath(path)}`

  selectedOffer.value = ''

  const { updateSEO } = useSEO({
    title: c.value.seo?.title,
    description: c.value.seo?.description,
    image: serviceImageUrl(c.value.images?.hero?.src),
  })

  const toOffer = (o) => {
    if ([o.name, o.description].some(isTodo)) return null
    const offer = { '@type': 'Offer', name: o.name, priceCurrency: o.priceCurrency || 'MAD' }
    if (o.description) offer.description = o.description
    if (o.price != null) {
      offer.price = String(o.price)
    } else if (o.minPrice != null) {
      offer.priceSpecification = {
        '@type': o.unitText ? 'UnitPriceSpecification' : 'PriceSpecification',
        minPrice: o.minPrice,
        priceCurrency: o.priceCurrency || 'MAD',
        ...(o.unitText ? { unitText: o.unitText } : {}),
      }
    }
    return offer
  }

  let seoArgs = null

  const applySEO = () => {
    if (!seoArgs) return
    const { serviceName, serviceType, offers = [], faq = [], breadcrumb = [] } =
      typeof seoArgs === 'function' ? seoArgs() : seoArgs
    const pageUrl = `${BASE_URL}${route.path}`

    const crumbs = [{ name: common.value.home || t('common.home'), path: '/' }, ...breadcrumb]
    const graph = [
      {
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          item: absoluteUrl(b.path),
        })),
      },
      {
        '@type': 'Service',
        name: serviceName,
        serviceType,
        description: c.value.seo?.description,
        url: pageUrl,
        inLanguage: currentLocale.value,
        areaServed: [
          { '@type': 'City', name: SERVICE_AREA.city },
          { '@type': 'AdministrativeArea', name: SERVICE_AREA.region },
        ],
        provider: { '@type': 'Organization', name: '2P.ma', url: `${BASE_URL}/` },
        ...(offers.length ? { offers: offers.map(toOffer).filter(Boolean) } : {}),
      },
    ]

    const faqItems = withoutTodo(faq)
    if (faqItems.length) {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: faqItems.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      })
    }

    updateSEO({
      title: c.value.seo?.title,
      description: c.value.seo?.description,
      image: serviceImageUrl(c.value.images?.hero?.src),
      structuredDataKey: 'page',
      structuredData: { '@context': 'https://schema.org', '@graph': graph },
    })
  }

  // Accepts the args object or a getter returning it (re-evaluated on locale change).
  const setServiceSEO = (args) => {
    seoArgs = args
    applySEO()
  }

  watch(currentLocale, applySEO)

  onBeforeUnmount(() => {
    document.querySelectorAll('script[data-schema="page"]').forEach((el) => el.remove())
  })

  const scrollToId = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const scrollToForm = async (offerValue) => {
    if (typeof offerValue === 'string' && offerValue) selectedOffer.value = offerValue
    await nextTick()
    const form = document.getElementById('service-contact')
    if (!form) return
    form.scrollIntoView({ behavior: 'smooth', block: 'start' })
    const field = form.querySelector('input:not([type=hidden]):not([tabindex="-1"]), select, textarea')
    if (field) setTimeout(() => field.focus({ preventScroll: true }), 500)
  }

  // Breadcrumb trail after "Accueil": [{ name, path }]. Owner sub-pages start with the owners hub.
  const ownersLabel = computed(() => tm('servicePages.proprietaires.breadcrumb') || 'Propriétaires')
  const trail = computed(() => {
    const current = { name: c.value.breadcrumb, path: SERVICE_PAGES[pageKey]?.path }
    const underOwners = pageKey !== 'proprietaires' && SERVICE_PAGES[pageKey]?.path.startsWith(`${SERVICE_PAGES.proprietaires.path}/`)
    return underOwners ? [{ name: ownersLabel.value, path: SERVICE_PAGES.proprietaires.path }, current] : [current]
  })
  // Same trail, in the { label, to } shape used by <ServiceHero :breadcrumb>.
  const heroBreadcrumb = computed(() => [
    { label: t('common.home'), to: '/' },
    ...trail.value.map((b, i) => ({ label: b.name, to: i < trail.value.length - 1 ? b.path : undefined })),
  ])

  // Cards for <ServiceCrossLinks>; pages whose content module is missing are skipped.
  const serviceLinks = (keys) => keys
    .map((key) => {
      const m = tm(`servicePages.${key}`)
      if (!m || !SERVICE_PAGES[key]) return null
      return m.card
        ? { title: m.card.name, text: m.card.tagline || m.card.lead || m.card.groupTitle, to: SERVICE_PAGES[key].path }
        : { title: m.breadcrumb, text: m.hero?.title, to: SERVICE_PAGES[key].path }
    })
    .filter(Boolean)

  // "Buy" CTA: online checkout when it exists, otherwise the lead form with the offer preselected.
  const buy = (checkoutKey, offerValue = checkoutKey) => {
    const url = CHECKOUT_URLS[checkoutKey]
    if (url) window.location.href = url
    else scrollToForm(offerValue)
  }

  return {
    c,
    common,
    t,
    tm,
    isRTL,
    currentLocale,
    colorClasses,
    localePath,
    setServiceSEO,
    scrollToForm,
    scrollToId,
    buy,
    selectedOffer,
    trail,
    heroBreadcrumb,
    serviceLinks,
  }
}
