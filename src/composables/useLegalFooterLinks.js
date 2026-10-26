import { computed } from 'vue'
import { useLanguage } from './useLanguage'
import { legalPagesForLocale } from '../utils/legalPages'

export function useLegalFooterLinks() {
  const { currentLocale, getLocalizedPath } = useLanguage()

  const links = computed(() => legalPagesForLocale(currentLocale.value).map((page) => ({
    ...page,
    to: getLocalizedPath(`/conseils/${page.slug}`),
  })))

  return { links }
}
