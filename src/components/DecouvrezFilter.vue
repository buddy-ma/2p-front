<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from '../composables/useI18n'
import { useRouter } from 'vue-router'
import api from '../services/api'
import NoSearchResultsImage from '../assets/images/elements/no-search-results.svg'
import backgroundImage from '../assets/images/bgs/Decouvrez-le-maroc-2p.webp'
import { Grip } from 'lucide-vue-next'

const { t } = useI18n()
const router = useRouter()

const searchInput = ref('')
const decouvrez = ref([])
const categoryConseils = ref([])
const selected = ref(0)
const isLoading = ref(false)
const error = ref(null)

// Fetch categories on mount
const fetchCategories = async () => {
  try {
    const response = await api.get('/decouvrez/categories')
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
    const response = await api.get('/decouvrez', {
      params: {
        category_id: categoryId,
        search: searchInput.value
      }
    })
    decouvrez.value = response.data.decouvrez || []
  } catch (err) {
    error.value = 'Failed to load articles'
    console.error('Error fetching articles:', err)
    decouvrez.value = []
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

const stripHtmlTags = (html) => {
  const tmp = document.createElement('DIV')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

const truncateText = (text, length = 170) => {
  const cleanText = stripHtmlTags(text)
  return cleanText.length > length ? cleanText.substring(0, length) + '...' : cleanText
}

const getImageUrl = (blog) => {
  if (blog.image) {
    return `https://2p.ma/images/${blog.image}`
  }
  return 'https://2p.ma/assets/images/blog/b-10.jpg'
}

const goToArticle = (slug) => {
  router.push(`/decouvrez-maroc/${slug}`)
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
    <section 
      class="relative flex items-center min-h-[400px] bg-cover bg-center"
      :style="{
        backgroundImage: `linear-gradient(-36deg, rgba(32, 12, 56, 0.2) 0%, rgba(27, 4, 29, 0.2) 100%), url(${backgroundImage})`,
        backgroundAttachment: 'fixed'
      }"
    >
      <div class="relative py-16 w-full z-10">
        <div class="max-w-3xl mx-auto flex flex-col items-center justify-center px-4">
          <h1 class="text-center text-white text-2xl md:text-3xl font-bold mb-6">
            {{ t('decouvrezMaroc.filter.hero.title') }}
          </h1>
          <form 
            @submit.prevent="handleSearch"
            class="w-full flex flex-col md:flex-row gap-4 md:gap-2 items-stretch bg-white/90 rounded-xl shadow-lg px-4 py-4 max-h-[120px]"
          >
            <input 
              v-model="searchInput" 
              type="text"
              :placeholder="t('decouvrezMaroc.filter.hero.search_placeholder')"
              class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white"
              @keyup.enter="handleSearch"
              autocomplete="off"
            />
            <button 
              type="submit"
              class="hidden md:inline-block h-full w-auto whitespace-nowrap bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              {{ t('decouvrezMaroc.filter.hero.search_button') }}
            </button>
            <button 
              type="submit"
              class="md:hidden inline-flex justify-center items-center h-full w-10 h-10 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
            >
              <i class="fa fa-search"></i>
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Category Menu -->
    <div class="bg-white border-b border-gray-200 text-center text-gray-600">
      <div class="mx-auto text-center w-full h-full md:max-w-6xl max-w-full overflow-x-auto small-scrollbar px-4 flex items-center justify-center whitespace-nowrap relative">
        <a 
          @click.prevent="getCategory(0)" 
          :class="[
            'px-5 h-[50px] leading-[50px] inline-block text-sm font-medium uppercase text-[#495960] cursor-pointer transition-[border-width] duration-200 border-b-0 border-[#495960] hover:text-[#495960] focus:text-[#495960] visited:text-[#495960] no-underline',
            selected === 0 ? 'text-orange-500 font-bold' : ''
          ]"
        >
          <Grip class="w-4 h-4 inline-block mr-2" />
          <span class="hidden max-[600px]:inline-block"><i class="fa fa-caret-down"></i></span>
        </a>
        <div 
          v-for="category in categoryConseils" 
          :key="category.id" 
          @click="getCategory(category.id)" 
          :class="[
            'px-5 h-[50px] leading-[50px] inline-block text-sm font-medium uppercase text-[#495960] cursor-pointer transition-[border-width] duration-200 border-b-0 border-[#495960] hover:text-[#495960] focus:text-[#495960] visited:text-[#495960] no-underline',
            selected === category.id ? 'text-orange-500 font-bold' : ''
          ]"
        >
          {{ category.title }}
          <span class="hidden max-[600px]:inline-block"><i class="fa fa-caret-down"></i></span>
        </div>
      </div>
    </div>

    <!-- Articles Section -->
    <section class="w-full py-8 bg-gray-50">
      <div class="container mx-auto px-36">
        <div v-if="isLoading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          <p class="mt-4 text-gray-600">{{ t('common.loading') }}</p>
        </div>

        <div v-else-if="error" class="text-center py-12">
          <p class="text-red-600">{{ error }}</p>
        </div>

        <div v-else-if="decouvrez.length === 0" class="flex flex-wrap">
          <div class="w-1/3 hidden md:block"></div>
          <div class="w-full md:w-1/3 text-center">
            <img 
              class="max-w-full h-auto mx-auto" 
              :src="NoSearchResultsImage" 
              alt="no-search-results" 
            />
            <div class="text-center mt-3">
              <h3 class="text-xl font-semibold">{{ t('decouvrezMaroc.filter.no_results.title') }}</h3>
              <p class="text-gray-600">{{ t('decouvrezMaroc.filter.no_results.message') }}</p>
            </div>
          </div>
          <div class="w-1/3 hidden md:block"></div>
        </div>

        <div v-else class="flex flex-wrap -mx-3">
          <div 
            v-for="result in decouvrez" 
            :key="result.id" 
            @click.prevent="goToArticle(result.slug)"
            class="w-full md:w-1/2 xl:w-1/3 px-3 mb-6 cursor-pointer"
          >
            <div class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-2">
              <a 
                @click.prevent="goToArticle(result.slug)" 
                class="cursor-pointer block"
              >
                <div>
                  <img 
                    class="w-full h-48 object-cover rounded-t-lg" 
                    :src="getImageUrl(result)" 
                    :alt="result.slug" 
                  />
                </div>
              </a>
              <div class="p-2 min-h-[150px]">
                <a 
                  @click.prevent="goToArticle(result.slug)" 
                  class="cursor-pointer block"
                >
                  <h3 class="text-lg font-semibold mb-2 text-gray-800">
                    {{ result.title }}
                  </h3>
                </a>
                <div>
                  <p class="text-gray-600 text-sm">
                    {{ truncateText(result.text) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
