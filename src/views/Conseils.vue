<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from '../composables/useI18n'
import { useLanguage } from '../composables/useLanguage'
import ConseilFilter from '../components/ConseilFilter.vue'
import ConseilImmobilierImage from '../assets/images/immobilier/CONSEILSIMMOBILIER.webp'

defineOptions({
  name: 'Conseils',
  seo: {
    titleKey: 'navigation.realEstateAdvice',
    descriptionKey: 'home.description',
    image: '/assets/images/immobilier/immobilier-de-particulier-a-particulier-maroc.webp'
  }
})

const { t } = useI18n()
const { currentLocale } = useLanguage()

// Meta tags management
const setMetaTags = () => {
  const metaDescription = t('decouvrezMaroc.conseils.meta.description')
  const ogTitle = t('decouvrezMaroc.conseils.meta.og_title')
  const ogDescription = t('decouvrezMaroc.conseils.meta.og_description')
  const twitterTitle = t('decouvrezMaroc.conseils.meta.twitter_title')
  const twitterDescription = t('decouvrezMaroc.conseils.meta.twitter_description')

  // Set document title
  document.title = t('decouvrezMaroc.conseils.title')

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
  setMetaTag('og:url', '/conseils', true)
  setMetaTag('og:type', 'website', true)
  setMetaTag('og:title', ogTitle, true)
  setMetaTag('og:description', ogDescription, true)
  setMetaTag('og:image', '/assets/images/post-5-01.jpg', true)
  setMetaTag('og:site_name', 'Particulier à Particulier', true)
  setMetaTag('og:image:width', '600', true)
  setMetaTag('og:image:height', '600', true)
  setMetaTag('og:logo', '/assets/images/logo-red.svg', true)

  // Twitter tags
  setMetaTag('twitter:card', 'summary_large_image')
  setMetaTag('twitter:domain', '2p.ma', true)
  setMetaTag('twitter:url', '/conseils', true)
  setMetaTag('twitter:title', twitterTitle)
  setMetaTag('twitter:description', twitterDescription)
  setMetaTag('twitter:image', '/assets/images/post-5-01.jpg')
  setMetaTag('twitter:site', '@2Pmaimmobilier')
  setMetaTag('twitter:creator', '@2Pmaimmobilier')

  // Canonical link
  let canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', '/conseils')
}

// Set body classes
const setBodyClasses = () => {
  document.body.className = 'conseils homepage-3 the-search'
  if (currentLocale.value === 'ar') {
    document.body.classList.add('rtl')
  }
}

// Load CSS
const loadCSS = () => {
  const linkId = 'conseils-red-css'
  if (!document.getElementById(linkId)) {
    const link = document.createElement('link')
    link.id = linkId
    link.rel = 'stylesheet'
    link.href = '/assets/css/colors/red.css'
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
    <ConseilFilter />

    <!-- Content Section -->
    <section class="bg-white py-24">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div class="w-full md:w-1/2 flex flex-col gap-3">
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800">{{ t('decouvrezMaroc.conseils.content.section_title') }}</h2>
            <h3 class="text-lg md:text-xl text-gray-700 font-semibold">{{ t('decouvrezMaroc.conseils.content.section_subtitle') }}</h3>
            <p class="text-gray-600">{{ t('decouvrezMaroc.conseils.content.description') }}</p>
          </div>
          <div class="w-full md:w-1/2 flex justify-center">
            <img
              class="w-auto object-contain rounded-lg shadow-md"
              :src="ConseilImmobilierImage"
              :alt="t('decouvrezMaroc.conseils.content.image_alt')"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Custom styles for articlesHub menu - matching original Blade template */
:deep(.articlesHub__menu) {
  color: #495960;
  text-align: center;
  width: 100%;
  height: 50px;
  top: 70px;
  left: 0;
  background: #fff;
}

:deep(.articlesHub__menu__container) {
  padding: 0 20px;
  margin: auto;
  text-align: left;
  width: 100%;
}

:deep(.articlesHub__menu__content) {
  display: inline-block;
  white-space: nowrap;
  position: relative;
}

:deep(.articlesHub__menu__item.selected) {
  border-width: 5px;
  border-color: rgb(225, 25, 111);
  color: rgb(225, 25, 111);
}

:deep(.articlesHub__menu__item:focus),
:deep(.articlesHub__menu__item:hover),
:deep(.articlesHub__menu__item:visited) {
  color: #495960;
  text-decoration: none;
}

:deep(.articlesHub__menu__item) {
  padding: 0 20px;
  height: 50px;
  line-height: 60px;
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  color: #495960;
  cursor: pointer;
  transition: border-width 0.2s;
  border-bottom: 0 solid #495960;
}

:deep(.articlesHub__menu__item i.fa) {
  font-size: 18px;
}

:deep(.caretForSmallMenu),
:deep(.textForSmallMenu) {
  display: none;
}

:deep(.tags) {
  background: #555 !important;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 30px;
}

@media screen and (max-width: 600px) {
  :deep(.articlesHub__menu__container) {
    max-width: 1080px;
    padding: 0 20px;
    margin: auto;
    text-align: left;
    width: 100%;
    overflow-x: auto;
  }

  :deep(.articlesHub__menu.smallMenuEnabled) {
    height: auto;
  }

  :deep(.articlesHub__menu.smallMenuEnabled .articlesHub__menu__content) {
    position: relative;
    border-width: 0;
    display: block;
    white-space: nowrap;
  }

  :deep(.articlesHub__menu.smallMenuEnabled .articlesHub__menu__item.selected) {
    height: 50px;
    opacity: 1;
    filter: none;
    border-width: 5px;
  }

  :deep(.articlesHub__menu.smallMenuEnabled .articlesHub__menu__item) {
    transition: height 0.3s, opacity 0.3s;
    height: 0;
    opacity: 0;
    overflow: hidden;
    line-height: 50px;
    display: block;
    padding: 0;
    border-bottom: 0 solid #495960;
  }

  :deep(.articlesHub__menu.smallMenuEnabled .iconForBigMenu) {
    display: none;
  }

  :deep(.articlesHub__menu.smallMenuEnabled .textForSmallMenu) {
    display: inline-block;
  }

  :deep(.articlesHub__menu.smallMenuEnabled .articlesHub__menu__item.selected .caretForSmallMenu) {
    opacity: 1;
    filter: none;
  }

  :deep(.articlesHub__menu.smallMenuEnabled .articlesHub__menu__item .caretForSmallMenu) {
    display: inline-block;
    opacity: 0;
    transition: 0.3s;
  }
}
</style>
