import { ref } from 'vue'

// Global state to track if FooterLinks is being shown
const hasFooterLinks = ref(false)

export function useFooterLinks() {
  const setHasFooterLinks = (value) => {
    hasFooterLinks.value = value
  }

  return {
    hasFooterLinks,
    setHasFooterLinks
  }
}
