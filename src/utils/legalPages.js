// Footer legal articles are CMS posts under /conseils/:slug.
// Live /api/home footer_blogs (language_id 1 FR, 2 EN, 3 AR) — not the
// fr=1 / ar=2 / en=3 ids used for product types in HeroSearch.
// English "Legal Notice" is the English edition of French "Confidentialité"
// (same created_at and image), so it is one page, not a fourth link.
// Arabic has no privacy article; that slot uses the French slug.

export const LEGAL_PAGES = [
  {
    id: 'confidentialite',
    labelKey: 'footer.legalPagesItems.confidentialite',
    slugs: { fr: 'confidentialite', en: 'legal-notice', ar: null },
  },
  {
    id: 'conditionsUtilisation',
    labelKey: 'footer.legalPagesItems.conditionsUtilisation',
    slugs: {
      fr: 'conditions-dutilisation',
      en: 'terms-of-use-cgu',
      ar: 'alshrot-alaaam-lastkhdam-almokaa-cgu',
    },
  },
  {
    id: 'politiqueCookies',
    labelKey: 'footer.legalPagesItems.politiqueCookies',
    slugs: {
      fr: 'politique-de-cookies',
      en: 'cookie-policy',
      ar: 'syas-mlfat-taaryf-alartbat-alkokyz',
    },
  },
]

export function legalPagesForLocale(locale) {
  const lang = locale === 'en' || locale === 'ar' ? locale : 'fr'
  return LEGAL_PAGES.map((page) => {
    const own = page.slugs[lang]
    const slug = own || page.slugs.fr
    if (!slug) return null
    return {
      id: page.id,
      labelKey: page.labelKey,
      slug,
      fallback: !own,
    }
  }).filter(Boolean)
}
