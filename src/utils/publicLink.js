export const SITE_HOME = 'https://2p.ma'

// The old /app page 404s. Match a relative /app and the same path on 2p.ma,
// with or without www, a trailing slash, a query, or a hash.
const APP_PAGE = /^(?:(?:https?:)?\/\/(?:www\.)?2p\.ma)?\/app\/?(?:[?#].*)?$/i

export function replaceAppHref(href) {
  if (typeof href !== 'string') return href
  const value = href.trim()
  return APP_PAGE.test(value) ? SITE_HOME : value
}

export function adHref(link) {
  if (typeof link !== 'string' || !link.trim()) return '#'
  return replaceAppHref(link)
}
