<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from '../composables/useI18n'
import { useLanguage } from '../composables/useLanguage'
import DecouvrezFilter from '../components/DecouvrezFilter.vue'
import heroImageUrl from '../assets/images/bgs/DECOUVREZ-LE-MAROC-2p.webp'

defineOptions({
  name: 'DecouvrezMaroc',
  seo: {
    titleKey: 'navigation.discoverMorocco',
    descriptionKey: 'home.description',
    image: '/assets/images/immobilier/immobilier-de-particulier-a-particulier-maroc.webp'
  }
})

const { t } = useI18n()
const { currentLocale } = useLanguage()

// Meta tags management
const setMetaTags = () => {
  const metaDescription = t('decouvrezMaroc.meta.description')
  const ogTitle = t('decouvrezMaroc.meta.og_title')
  const ogDescription = t('decouvrezMaroc.meta.og_description')
  const twitterTitle = t('decouvrezMaroc.meta.twitter_title')
  const twitterDescription = t('decouvrezMaroc.meta.twitter_description')

  // Set document title
  document.title = t('decouvrezMaroc.title')

  // Set or update meta tags
  const setMetaTag = (name, content, property = false) => {
    const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
    let meta = document.querySelector(selector)
    if (!meta) {
      meta = document.createElement('meta')
      if (property) {
        meta.setAttribute('property', name)
      } else {
        meta.setAttribute('name', name)
      }
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', content)
  }

  // Basic meta tags
  setMetaTag('description', metaDescription)
  setMetaTag('robots', 'index,follow')
  setMetaTag('author', 'Particulier à Particulier')

  // Open Graph tags
  setMetaTag('og:url', '/decouvrezMaroc', true)
  setMetaTag('og:type', 'website', true)
  setMetaTag('og:title', ogTitle, true)
  setMetaTag('og:description', ogDescription, true)
  setMetaTag('og:image', heroImageUrl, true)
  setMetaTag('og:site_name', 'Particulier à Particulier', true)
  setMetaTag('og:image:width', '600', true)
  setMetaTag('og:image:height', '600', true)
  setMetaTag('og:logo', '../assets/images/logos/logo-orange.svg', true)

  // Twitter tags
  setMetaTag('twitter:card', 'summary_large_image')
  setMetaTag('twitter:domain', '2p.ma', true)
  setMetaTag('twitter:url', '/decouvrezMaroc', true)
  setMetaTag('twitter:title', twitterTitle)
  setMetaTag('twitter:description', twitterDescription)
  setMetaTag('twitter:image', heroImageUrl)
  setMetaTag('twitter:site', '@2Pmaimmobilier')
  setMetaTag('twitter:creator', '@2Pmaimmobilier')

  // Canonical link
  let canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', '/decouvrezMaroc')
}

// Set body classes
const setBodyClasses = () => {
  document.body.className = 'decouvrez homepage-3 the-search'
  if (currentLocale.value === 'ar') {
    document.body.classList.add('rtl')
  }
}

// Load CSS
const loadCSS = () => {
  const linkId = 'decouvrez-orange-css'
  if (!document.getElementById(linkId)) {
    const link = document.createElement('link')
    link.id = linkId
    link.rel = 'stylesheet'
    link.href = '/assets/css/colors/orange.css'
    document.head.appendChild(link)
  }
}

onMounted(() => {
  setMetaTags()
  setBodyClasses()
  loadCSS()
})

const isRtl = computed(() => currentLocale.value === 'ar')
const textAlign = computed(() => isRtl.value ? 'text-right' : 'text-left')
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Filter Component -->
    <DecouvrezFilter />

    <!-- Content Section -->
    <section class="bg-white py-24">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div class="w-full md:w-1/2 flex flex-col gap-3">
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800">{{ t('decouvrezMaroc.content.section_title') }}
            </h2>
            <h3 class="text-lg md:text-xl text-gray-700 font-semibold">{{ t('decouvrezMaroc.content.section_subtitle')
            }}</h3>
            <p class="text-gray-600">{{ t('decouvrezMaroc.content.description') }}</p>
          </div>
          <div class="w-full md:w-1/2 flex justify-center">
            <img class="w-auto object-contain rounded-lg shadow-md" :src="heroImageUrl"
              :alt="t('decouvrezMaroc.content.image_alt')" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
