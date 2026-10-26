import { SERVICE_PAGES } from '../config/services'

const AUDIENCES = ['proprietaires', 'location_vacances', 'acheteurs_locataires']

const PATHS = {
  annoncepremium: SERVICE_PAGES.annoncePremium.path,
  assistancecommerciale: SERVICE_PAGES.assistanceCommerciale.path,
  mandatexclusif: SERVICE_PAGES.mandatExclusif.path,
  locationvacances: SERVICE_PAGES.locationVacances.path,
  passvisites: SERVICE_PAGES.acheteursLocataires.path,
  packpersonnalise: SERVICE_PAGES.acheteursLocataires.path,
}

export function normalizeOfferKey(key) {
  return String(key || '').toLowerCase().replace(/[^a-z0-9]/g, '')
}

export function pathForOffer(key, audience) {
  const norm = normalizeOfferKey(key)
  if (PATHS[norm]) return PATHS[norm]
  if (audience === 'location_vacances') return SERVICE_PAGES.locationVacances.path
  if (audience === 'acheteurs_locataires') return SERVICE_PAGES.acheteursLocataires.path
  return SERVICE_PAGES.proprietaires.path
}

function cleanText(value) {
  if (typeof value !== 'string') return ''
  const text = value.trim()
  return text
}

function cleanFeatures(value) {
  if (!Array.isArray(value)) return []
  return value.map(cleanText).filter(Boolean)
}

function blockHasContent(block) {
  if (!block || typeof block !== 'object') return false
  return Boolean(
    cleanText(block.title)
    || cleanText(block.badge)
    || cleanText(block.price_label)
    || cleanText(block.summary)
    || cleanFeatures(block.features).length
  )
}

function offerHasTexts(offer) {
  const texts = offer?.texts
  if (!texts || typeof texts !== 'object') return false
  return ['fr', 'ar', 'en'].some((locale) => blockHasContent(texts[locale]))
}

function unwrap(body) {
  if (!body || typeof body !== 'object') return null
  if (body.audiences && typeof body.audiences === 'object') return body
  if (body.data?.audiences && typeof body.data.audiences === 'object') return body.data
  return null
}

// null means "keep the hard-coded home cards".
// A failed request, missing/empty audiences, or any offer with no texts in fr/ar/en all return null.
export function parseOffersCatalog(body) {
  const data = unwrap(body)
  if (!data) return null
  const groups = {}
  let count = 0
  for (const audience of AUDIENCES) {
    const list = Array.isArray(data.audiences[audience]) ? data.audiences[audience] : []
    if (list.some((offer) => !offerHasTexts(offer))) return null
    groups[audience] = [...list].sort((a, b) => (Number(a?.sort_order) || 0) - (Number(b?.sort_order) || 0))
    count += list.length
  }
  if (count === 0) return null
  return {
    currency: data.currency || '',
    pricesAre: cleanText(data.prices_are).toUpperCase(),
    audiences: groups,
  }
}

function firstText(...values) {
  for (const value of values) {
    const text = cleanText(value)
    if (text) return text
  }
  return ''
}

function firstFeatures(...values) {
  for (const value of values) {
    const list = cleanFeatures(value)
    if (list.length) return list
  }
  return []
}

function padOrder(value, index) {
  const n = Number(value)
  const shown = Number.isFinite(n) && n > 0 ? n : index + 1
  return String(shown).padStart(2, '0')
}

function numericPrice(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim()) {
    const n = Number(value.trim().replace(/\s/g, '').replace(',', '.'))
    if (Number.isFinite(n)) return n
  }
  return null
}

// "1 000" — regular space, no decimals when the amount is whole.
export function formatGroupedPrice(value) {
  const n = numericPrice(value)
  if (n === null) return null
  const sign = n < 0 ? '-' : ''
  const rounded = Math.round(Math.abs(n) * 100) / 100
  const [intPart, decPart] = rounded.toFixed(2).split('.')
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return `${sign}${grouped}${decPart === '00' ? '' : `,${decPart}`}`
}

function isPriceFrom(offer) {
  return offer?.price_from === true || offer?.price_from === 1
}

function isTwelveMonths(duration) {
  if (!duration || typeof duration !== 'object') return false
  const value = Number(duration.value)
  const unit = String(duration.unit || '').toLowerCase()
  return value === 12 && ['month', 'months', 'mois'].includes(unit)
}

function localizedName(typeName, locale) {
  if (!typeName || typeof typeName !== 'object') return ''
  return cleanText(typeName[locale]) || cleanText(typeName.fr) || cleanText(typeName.en) || cleanText(typeName.ar)
}

function typePriceRows(offer, locale, t) {
  const rows = Array.isArray(offer?.type_prices) ? [...offer.type_prices] : []
  rows.sort((a, b) => {
    const ap = numericPrice(a?.price_ht)
    const bp = numericPrice(b?.price_ht)
    if (ap === null && bp === null) return 0
    if (ap === null) return 1
    if (bp === null) return -1
    return ap - bp
  })
  return rows.map((row) => {
    const name = localizedName(row?.type_name, locale)
    const amount = formatGroupedPrice(row?.price_ht)
    if (!name || !amount) return null
    const price = t ? t('home.typePriceAmount', { price: amount }) : `${amount} DH`
    return { name, price }
  }).filter(Boolean)
}

function priceFromLabel(offer, audience, t) {
  if (!isPriceFrom(offer) || !t) return ''
  const amount = formatGroupedPrice(offer.price_ht)
  if (!amount) return ''
  let label = t('home.priceFrom', { price: amount })
  if (!label || label === 'home.priceFrom') return ''
  if (audience === 'location_vacances' && isTwelveMonths(offer.duration)) {
    const suffix = t('home.priceFromYearSuffix')
    if (suffix && suffix !== 'home.priceFromYearSuffix') label += suffix
  }
  return label
}

// Locale text, then French, then the static card strings already on the home page.
export function presentOffers(offers, { locale, pricesAre, staticByKey, audience, t }) {
  return (offers || []).map((offer, index) => {
    const norm = normalizeOfferKey(offer?.key)
    const staticCard = staticByKey?.[norm] || null
    const texts = offer?.texts || {}
    const primary = texts[locale] && typeof texts[locale] === 'object' ? texts[locale] : {}
    const fr = texts.fr && typeof texts.fr === 'object' ? texts.fr : {}
    const generatedPrice = priceFromLabel(offer, audience, t)
    const labelPrice = firstText(primary.price_label, fr.price_label)
    const apiPrice = generatedPrice || labelPrice
    const price = apiPrice || cleanText(staticCard?.price)
    const features = firstFeatures(primary.features, fr.features, staticCard?.includes)
    const typePrices = typePriceRows(offer, locale, t)
    const card = {
      ...(staticCard || {}),
      n: staticCard?.n || padOrder(offer?.sort_order, index),
      name: firstText(primary.title, fr.title, staticCard?.name),
      badge: firstText(primary.badge, fr.badge, staticCard?.badge),
      price,
      includes: features,
      text: firstText(primary.summary, fr.summary, staticCard?.text, staticCard?.lead),
    }
    if (typePrices.length) {
      card.typePrices = typePrices
      card.typePricesTitle = t ? t('home.priceByType') : ''
    }
    if (apiPrice) {
      delete card.fees
      delete card.highlight
    }
    // Generated labels already say HT / excl. tax / دون احتساب الضريبة.
    const priceNote = !generatedPrice && pricesAre === 'HT' && price && !/\bHT\b/i.test(price) ? 'HT' : ''
    return {
      key: offer?.key || `${norm || 'offer'}-${index}`,
      card,
      to: pathForOffer(offer?.key, audience),
      priceNote,
    }
  })
}
