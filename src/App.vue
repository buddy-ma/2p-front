<template>
  <div id="app" class="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors">
    <Header />
    <main class="flex-grow bg-white dark:bg-gray-900 transition-colors">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { useLanguage } from './composables/useLanguage'
import { useDarkMode } from './composables/useDarkMode'
import { useSEO } from './composables/useSEO'
import { initializeAnalytics, addVerificationTags } from './utils/analytics'

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

