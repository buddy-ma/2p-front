<template>
  <div class="vacances">
    <!-- Hero Section -->
    <HeroSearch 
      :title="pageTitle"
      :text="pageText"
      active="vacances"
      bg="vacances"
      :extras="data?.extras || {}"
      :extra="data?.extra || []"
    />
    
    <!-- Long Advertising Section -->
    <AdvertisingLong v-if="data?.long_advertising" :advertising="data.long_advertising" />
    <div v-else class="bg-gray-50 py-4">
      <div class="container max-w-6xl mx-auto px-4">
        <!-- Default advertising placeholder -->
      </div>
    </div>

    <!-- Products Catalogue Section -->
    <section v-if="!loading && data" class="featured portfolio bg-gray-50 py-8">
      <div class="container max-w-6xl mx-auto px-4">
        <div class="portfolio">
        
          <div v-if="hasProducts" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard v-for="product in data.products.data" :key="product.id" :product="product" />
          </div>
          <div v-else-if="data && !hasProducts" class="text-center py-12">
            <img 
              class="mx-auto mb-4" 
              style="max-width: 300px" 
              src="../assets/images/elements/no-search-results.svg"
              alt="Aucun résultat"
            />
            <h3 class="text-xl font-semibold mb-2">Aucun résultat trouvé</h3>
            <p class="text-gray-600 mb-4">Essayez de modifier vos critères de recherche</p>
            <div v-if="data.products" class="text-sm text-gray-500">
              <p>Total: {{ data.products.total || 0 }} résultats</p>
              <p>Page: {{ data.products.current_page || 1 }} / {{ data.products.last_page || 1 }}</p>
            </div>
          </div>
        </div>
        
        <!-- Pagination -->
        <div v-if="data.products.links && data.products.links.length > 0" class="mt-8 flex justify-center">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="link in data.products.links"
              :key="link.label"
              @click="loadPage(link.url)"
              :disabled="!link.url"
              :class="[
                'px-4 py-2 rounded-lg transition-colors',
                link.active 
                  ? `${colorClasses.bg} text-white` 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                !link.url ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              ]"
              v-html="link.label"
            ></button>
          </div>
        </div>

        <!-- Body Links -->
        <div v-if="data?.bodyLinks && data.bodyLinks.length > 0" class="mt-6 flex flex-wrap justify-center gap-4">
          <template v-for="link in data.bodyLinks" :key="link.id">
            <a 
              v-if="link && link.link"
              :href="link.link" 
              class="px-4 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-600 hover:text-white transition-colors"
            >
              {{ link.mainTitle }}
            </a>
          </template>
        </div>

        <!-- Similaires Section (shown on last page) -->
        <div v-if="data?.similaires && data.similaires.length > 0 && isLastPage" class="mt-8">
          <h3 class="text-2xl font-semibold mb-6 text-center">Annonces similaires</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard v-for="product in data.similaires" :key="product.id" :product="product" />
          </div>
        </div>
      </div>
    </section>

    <!-- City/Neighborhood Text Section -->
    <section v-if="data?.ville && data.ville !== ''" class="featured portfolio bg-white py-8">
      <div class="container max-w-6xl mx-auto px-4">
        <div class="sec-title">
          <CityNeighborhoodText 
            :ville="data.ville" 
            :quartier="data.quartier" 
            :producttype="data.producttype" 
          />
        </div>
      </div>
    </section>

    <!-- Banner Advertising Section -->
    <AdvertisingBanner v-if="data?.banner_advertising && data.banner_advertising.length >= 2" :advertisements="data.banner_advertising" />
    <div v-else class="bg-gray-50 py-4 mb-3">
      <div class="container max-w-6xl mx-auto px-4">
        <!-- Default banner advertising placeholder -->
      </div>
    </div>

    <!-- Page Content Section with Second Title/Text and Image -->
    <section v-if="data?.page" class="featured portfolio bg-white py-8">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 v-if="data.page.secondTitle" class="text-2xl font-semibold mb-4" style="text-transform: none">
              {{ data.page.secondTitle }}
            </h3>
            <p v-if="data.page.secondText" class="text-gray-600">
              {{ data.page.secondText }}
            </p>
            <!-- Default content if no page data -->
            <template v-if="!data.page.secondTitle">
              <h2 class="text-2xl font-semibold mb-2">Location de vacances au Maroc</h2>
              <h3 class="text-xl font-semibold mb-4">Votre partenaire de confiance</h3>
              <p class="text-gray-600">
                Découvrez notre sélection de locations de vacances au Maroc. 
                Que vous cherchiez un appartement, une villa, un riad ou un appartement, 
                nous vous accompagnons dans votre projet de location de vacances.
              </p>
            </template>
          </div>
          <div>
            <img 
              :src="pageImage" 
              :alt="data.page?.secondTitle || 'Location de vacances au Maroc'"
              class="w-full h-auto rounded-lg"
              style="max-height: fit-content;"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-20 bg-white">
      <div :class="`animate-spin rounded-full h-12 w-12 border-b-2 ${colorClasses.border}`"></div>
    </div>

    <!-- Error State -->
    <div v-if="error && !loading" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-4 my-8">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTheme } from '../composables/useTheme'
import { productService } from '../services/productService'
import HeroSearch from '../components/HeroSearch.vue'
import ProductCard from '../components/ProductCard.vue'
import CityNeighborhoodText from '../components/CityNeighborhoodText.vue'
import AdvertisingLong from '../components/AdvertisingLong.vue'
import AdvertisingBanner from '../components/AdvertisingBanner.vue'
import defaultPageImage from '../assets/images/main_pages/Annonces-de-locations-de-vacances-au-Maroc.webp'

const { colorClasses } = useTheme()
const route = useRoute()
const router = useRouter()
const data = ref(null)
const loading = ref(true)
const error = ref(null)
const isMobile = ref(false)

// Check if mobile on mount
onMounted(() => {
  isMobile.value = window.innerWidth <= 768
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth <= 768
  })
})

const pageTitle = computed(() => {
  return data.value?.page?.mainTitle || 'Location de Vacances au Maroc'
})

const pageText = computed(() => {
  return data.value?.page?.mainText || 'Trouvez votre location de vacances idéale parmi notre sélection de propriétés au Maroc'
})

const pageImage = computed(() => {
  // If API provides an image path, it should be a full URL or relative to public
  if (data.value?.page?.image) {
    // If it's already a full URL, use it
    if (data.value.page.image.startsWith('http://') || data.value.page.image.startsWith('https://')) {
      return data.value.page.image
    }
    // Otherwise, try to use it as a public asset path
    // Note: For dynamic images from API, they should be in public folder or be full URLs
    return data.value.page.image.startsWith('/') ? data.value.page.image : `/${data.value.page.image}`
  }
  
  // Check if type-specific image exists (these would need to be imported or in public)
  const typeId = data.value?.type_id
  if (typeId && typeId !== '' && typeId !== 'Toutes les propriétés') {
    // Type images would need to be imported or in public folder
    // For now, fall back to default
  }
  
  // Default image (imported statically - this will work)
  return defaultPageImage
})

const hasProducts = computed(() => {
  return data.value?.products?.data && Array.isArray(data.value.products.data) && data.value.products.data.length > 0
})

const isLastPage = computed(() => {
  if (!data.value?.products) return false
  const currentPage = data.value.products.current_page || 1
  const lastPage = data.value.products.last_page || 1
  return currentPage === lastPage || lastPage === 1
})


const loadProducts = async () => {
  try {
    loading.value = true
    error.value = null
    
    // Process route params - convert dashes to spaces and handle defaults
    let ville = route.params.ville ? route.params.ville.replace(/-/g, ' ') : 'maroc'
    let quartier = route.params.quartier ? route.params.quartier.replace(/-/g, ' ') : ''
    let type = route.params.type ? route.params.type.replace(/-/g, ' ') : ''
    let extra = route.params.extra ? route.params.extra.replace(/-/g, ' ') : ''
    
    // Handle 'toutelaville' quartier
    if (quartier === 'toutelaville') {
      quartier = ''
    }
    
    const params = {
      ville: ville,
      quartier: quartier,
      type: type,
      extra: extra,
      ...route.query,
    }
    
    
    const response = await productService.getVacancesProducts(params)
    // Axios wraps the response, so response.data is the actual JSON data
    const responseData = response.data || response
    
    // Ensure products data is properly structured
    if (responseData?.products && !responseData.products.data && Array.isArray(responseData.products)) {
      // If products is directly an array, wrap it
      responseData.products = { data: responseData.products }
    }


    data.value = responseData
  } catch (err) {
    console.error('Error loading products:', err)
    error.value = err.response?.data?.message || err.message || 'Failed to load products'
    // Initialize empty data structure so page still renders
    data.value = {
      products: { data: [], links: [] },
      villes: [],
      types: [],
      ville: '',
      quartier: '',
    }
  } finally {
    loading.value = false
  }
}

const loadPage = (url) => {
  if (!url) return
  
  try {
    // Parse the URL to extract query parameters
    const urlObj = new URL(url)
    const page = urlObj.searchParams.get('page')
    
    // Update route query parameters
    router.push({
      query: {
        ...route.query,
        page: page || undefined
      }
    })
  } catch (error) {
    console.error('Error parsing pagination URL:', error)
    // Fallback: try to extract page from URL string
    const pageMatch = url.match(/[?&]page=(\d+)/)
    if (pageMatch) {
      router.push({
        query: {
          ...route.query,
          page: pageMatch[1]
        }
      })
    }
  }
}

onMounted(loadProducts)
watch(() => route.params, loadProducts, { deep: true })
watch(() => route.query, loadProducts, { deep: true })
</script>

<style scoped>
.vacances {
  min-height: 100vh;
}

.hero-title {
  height: auto !important;
  padding: 60px 0 0 !important;
}
</style>
