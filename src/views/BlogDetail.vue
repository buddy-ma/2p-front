<template>
  <div class="blog-detail min-h-screen bg-white dark:bg-gray-900">
    <!-- Loading State -->
    <div v-if="loading" class="container mx-auto px-4 py-20">
      <div class="flex justify-center items-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="container mx-auto px-4 py-20">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-red-600 mb-4">{{ t('error404.title') }}</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-4">{{ error }}</p>
        <router-link to="/conseils" class="px-6 py-3 rounded-lg font-semibold bg-blue-600 text-white">
          {{ t('error404.backHome') }}
        </router-link>
      </div>
    </div>

    <!-- Blog Content -->
    <div v-else-if="blog" class="container mx-auto px-4 py-8">
      <!-- Long Advertising -->
      <div v-if="!blog.is_internal">
        <AdvertisingLong v-if="longAdvertising" :advertising="longAdvertising" />
        <AdvertisingLongDefault v-else category-id="conseils" />
      </div>
      <!-- Blog Title -->
      <h1 class="text-3xl md:text-4xl font-bold text-blue-600 mb-6 mt-8 capitalize">
        {{ blog.title }}
      </h1>

      <!-- Blog Content -->
      <div class="prose prose-lg max-w-none dark:prose-invert mb-8">
        <div v-html="blog.text" class="text-gray-700 dark:text-gray-300"></div>

        <!-- PDF Download -->
        <a v-if="blog.pdf_link" :href="getPdfUrl(blog.pdf_link)" target="_blank"
          class="inline-flex items-center mt-8 px-6 py-3 rounded-lg font-bold bg-blue-600 text-white hover:bg-blue-700 transition">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Télécharger la brochure PDF
        </a>
      </div>

      <!-- Banner Advertising -->
      <div v-if="!blog.is_internal">
        <AdvertisingBanner v-if="bannerAdvertising && bannerAdvertising.length >= 2"
          :advertisements="bannerAdvertising" />
        <AdvertisingBannerDefault v-else category-id="conseils" />
      </div>

      <!-- Similar Articles -->
      <BlogArticlesSection v-if="similaires && similaires.length > 0" :items="similaires"
        :heading="t('similar.articles')" variant="similar" section-class="mt-12"
        heading-class="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { homeService } from '../services/homeService'
import { useI18n } from '../composables/useI18n'
import AdvertisingLong from '../components/AdvertisingLong.vue'

defineOptions({
  name: 'BlogDetail',
  seo: {
    titleKey: 'navigation.realEstateAdvice',
    descriptionKey: 'home.description'
  }
})
import AdvertisingLongDefault from '../components/AdvertisingLongDefault.vue'
import AdvertisingBanner from '../components/AdvertisingBanner.vue'
import AdvertisingBannerDefault from '../components/AdvertisingBannerDefault.vue'
import BlogArticlesSection from '../components/BlogArticlesSection.vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const blog = ref(null)
const similaires = ref([])
const longAdvertising = ref(null)
const bannerAdvertising = ref(null)
const loading = ref(true)
const error = ref(null)

const getPdfUrl = (pdfPath) => {
  if (!pdfPath) return ''
  return `https://cdn.2p.ma/blog/files/${pdfPath}`
}

const loadBlog = async () => {
  try {
    loading.value = true
    error.value = null
    const slug = route.params.slug
    const response = await homeService.getBlogBySlug(slug)
    const data = response.data || response

    blog.value = data.blog
    similaires.value = data.similaires || []

    // TODO: Load advertising data if needed
  } catch (err) {
    console.error('Error loading blog:', err)
    error.value = err.response?.data?.message || err.message || 'Failed to load blog'
    if (err.response?.status === 404) {
      router.push('/404')
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadBlog()
})

watch(() => route.params.slug, () => {
  loadBlog()
})
</script>

<style scoped>
/* Remove inline styles from blog content */
:deep(span) {
  all: unset;
}

:deep(p) {
  color: #333 !important;
  font-size: 16px !important;
  line-height: 26px !important;
  font-family: "Poppins", sans-serif;
  font-weight: 400 !important;
  margin-bottom: 1rem;
}

:deep(h2) {
  line-height: 30px;
  font-weight: normal;
  margin-bottom: 20px;
  margin-top: 20px;
  font-size: 24px;
  color: #000;
}

:deep(h3) {
  line-height: 30px !important;
  font-weight: normal !important;
  margin-bottom: 10px !important;
  margin-top: 10px !important;
  font-size: 20px;
  color: #000;
}
</style>
