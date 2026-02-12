<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from '../composables/useI18n'
import { useLanguage } from '../composables/useLanguage'
import { useTheme } from '../composables/useTheme'
import api from '../services/api'
import NoSearchResultsImage from '../assets/images/elements/no-search-results.svg'
import backgroundImage from '../assets/images/bgs/Conseils-immobilier-maroc-2p.webp'
import { Grip } from 'lucide-vue-next'
import BlogArticlesSection from './BlogArticlesSection.vue'

const { t } = useI18n()
const { currentLocale } = useLanguage()
const { colorClasses } = useTheme()

const searchInput = ref('')
const conseils = ref([])
const categoryConseils = ref([])
const selected = ref(0)
const isLoading = ref(false)
const error = ref(null)

// Fetch categories on mount
const fetchCategories = async () => {
  try {
    const response = await api.get('/conseils/categories')
    categoryConseils.value = response.data
  } catch (err) {
    console.error('Error fetching categories:', err)
    error.value = 'Failed to load categories'
  }
}

// Fetch articles based on category and search
const fetchArticles = async (categoryId) => {
  isLoading.value = true
  error.value = null
  try {
    const response = await api.get('/conseils', {
      params: {
        category_id: categoryId,
        search: searchInput.value
      }
    })
    conseils.value = response.data.conseils || []
  } catch (err) {
    error.value = 'Failed to load articles'
    console.error('Error fetching articles:', err)
    conseils.value = []
  } finally {
    isLoading.value = false
  }
}

const getCategory = (id) => {
  selected.value = id
  fetchArticles(id)
}

const handleSearch = () => {
  fetchArticles(selected.value)
}

// Watch search input with debounce
let searchTimeout
watch(searchInput, () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    fetchArticles(selected.value)
  }, 500)
})

onMounted(async () => {
  await fetchCategories()
  await fetchArticles(0)
})

</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative flex items-center min-h-[400px] bg-cover bg-center" :style="{
      backgroundImage: `linear-gradient(-36deg, rgba(32, 12, 56, 0.2) 0%, rgba(27, 4, 29, 0.2) 100%), url(${backgroundImage})`,
      backgroundAttachment: 'fixed'
    }">
      <div class="relative py-16 w-full z-10">
        <div class="max-w-3xl mx-auto flex flex-col items-center justify-center px-4">
          <h1 class="text-center text-white text-2xl md:text-3xl font-bold mb-6">
            {{ t('decouvrezMaroc.conseils.filter.hero.title') }}
          </h1>
          <form @submit.prevent="handleSearch"
            class="w-full flex flex-col md:flex-row gap-4 md:gap-2 items-stretch bg-white/90 rounded-xl shadow-lg px-4 py-4 max-h-[120px]">
            <input v-model="searchInput" type="text"
              :placeholder="t('decouvrezMaroc.conseils.filter.hero.search_placeholder')"
              :class="[
                'w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 text-gray-900 bg-white',
                colorClasses.ring
              ]"
              @keyup.enter="handleSearch" autocomplete="off" />
            <button type="submit" :class="[
              'hidden md:inline-block h-full w-auto whitespace-nowrap text-white px-6 py-2 rounded-lg font-semibold transition-colors',
              colorClasses.bg,
              colorClasses.hover
            ]">
              {{ t('decouvrezMaroc.conseils.filter.hero.search_button') }}
            </button>
            <button type="submit" :class="[
              'md:hidden inline-flex justify-center items-center w-10 h-10 text-white rounded-lg',
              colorClasses.bg,
              colorClasses.hover
            ]">
              <i class="fa fa-search"></i>
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Category Menu -->
    <div class="bg-white border-b border-gray-200 text-center text-gray-600">
      <div class="mx-auto text-center w-full h-full md:max-w-6xl max-w-full overflow-x-auto small-scrollbar px-4 flex items-center justify-center whitespace-nowrap relative">
        <a @click.prevent="getCategory(0)" :class="[
          'px-5 h-[50px] leading-[50px] inline-block text-sm font-medium uppercase text-[#495960] cursor-pointer transition-[border-width] duration-200 border-b-0 border-[#495960] hover:text-[#495960] focus:text-[#495960] visited:text-[#495960] no-underline',
          selected === 0 ? `${colorClasses.text} font-bold` : ''
        ]">
          <Grip class="w-4 h-4 inline-block mr-2" />
          <span class="hidden max-[600px]:inline-block"><i class="fa fa-caret-down"></i></span>
        </a>
        <div v-for="category in categoryConseils" :key="category.id" @click="getCategory(category.id)" :class="[
          'px-5 h-[50px] leading-[50px] inline-block text-sm font-medium uppercase text-[#495960] cursor-pointer transition-[border-width] duration-200 border-b-0 border-[#495960] hover:text-[#495960] focus:text-[#495960] visited:text-[#495960] no-underline',
          selected === category.id ? `${colorClasses.text} font-bold` : ''
        ]">
          {{ category.title }}
          <span class="hidden max-[600px]:inline-block"><i class="fa fa-caret-down"></i></span>
        </div>
      </div>
    </div>

    <BlogArticlesSection :items="conseils" :loading="isLoading" :error="error" :show-empty-state="true"
      :empty-image="NoSearchResultsImage" :empty-title="t('decouvrezMaroc.conseils.filter.no_results.title')"
      :empty-message="t('decouvrezMaroc.conseils.filter.no_results.message')" variant="filter"
      :loading-spinner-class="colorClasses.border" section-class="w-full py-8 bg-gray-50"
      container-class="container mx-auto px-36" />
  </div>
</template>
