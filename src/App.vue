<template>
  <div id="app" class="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors">
    <Header />
    <main class="flex-grow bg-white dark:bg-gray-900 transition-colors">
      <router-view />
    </main>
    <Footer v-if="!hasFooterLinks" />
    <Toaster />
    <LoadingIndicator />
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Toaster from './components/ui/Toaster.vue'
import LoadingIndicator from './components/ui/LoadingIndicator.vue'
import { useLanguage } from './composables/useLanguage'
import { useDarkMode } from './composables/useDarkMode'
import { useSEO } from './composables/useSEO'
import { useFooterLinks } from './composables/useFooterLinks'
import { initializeAnalytics, addVerificationTags } from './utils/analytics'

const route = useRoute()
const { hasFooterLinks } = useFooterLinks()

// Reset footerLinks status on route change
watch(() => route.path, () => {
  hasFooterLinks.value = false
})

const { initializeLocale, updateDocumentAttributes } = useLanguage()
const { initializeDarkMode } = useDarkMode()

// Initialize SEO
useSEO()

onMounted(() => {
  // Initialize language
  const locale = initializeLocale()
  updateDocumentAttributes(locale)

  // Initialize dark mode
  initializeDarkMode()

  // Initialize analytics (only in production)
  if (import.meta.env.PROD) {
    initializeAnalytics()
    addVerificationTags()
  }
})
</script>
