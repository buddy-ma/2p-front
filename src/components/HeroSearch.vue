<template>
  
  <section
    class="relative py-20"
    :style="{
      backgroundImage: `linear-gradient(-36deg,rgba(77,165,255,0.2) 0%,rgba(49,84,232,0.2) 100%), url(${bgPath})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: 'cover'
    }"
  >
    <div class="absolute inset-0 bg-black opacity-30"></div>
    <div class="container mx-auto max-w-6xl px-4 relative z-10">
      <div class="text-center mb-8">
        <h1 class="text-2xl md:text-3xl font-semibold text-white mb-4" style="font-size: 1.5rem; font-weight: 600">
          {{ title || 'Immobilier Au Maroc De Particulier À Particulier' }}
        </h1>
        <p class="text-white text-base md:text-md mx-auto">
          {{ text || 'Nos services d\'immobilier au Maroc de particulier à particulier simplifient la vente, la location ou l\'achat de biens sans commission ni intermédiaire. Profitez d\'une plateforme fiable et accessible, regroupant des annonces dans les principales villes comme Agadir, Casablanca et Marrakech. Trouvez des opportunités adaptées à vos besoins grâce à un large choix de biens disponibles.' }}
        </p>
      </div>

       <div class="flex justify-center w-full mb-3 gap-2">
        <button
          @click="activeTab = 'achat'"
          :class="['px-6 py-2 font-semibold rounded-lg', activeTab === 'achat' ? `text-white ${colorClasses.bg} ${colorClasses.hover} border-2 ${colorClasses.border}` : 'text-black bg-white']"
        >
          Vente
        </button>
        <button
          @click="activeTab = 'location'"
          :class="['px-6 py-2 font-semibold rounded-lg', activeTab === 'location' ? `text-white ${colorClasses.bg} ${colorClasses.hover} border-2 ${colorClasses.border}` : 'text-black bg-white']"
        >
          Location
        </button>
        <button
          @click="activeTab = 'vacances'"
            :class="['px-6 py-2 font-semibold rounded-lg', activeTab === 'vacances' ? `text-white ${colorClasses.bg} ${colorClasses.hover} border-2 ${colorClasses.border}` : 'text-black bg-white']"
        >
          Vacances
        </button>
      </div>
      <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl p-6">
        

        <!-- Search Form -->
        <form @submit.prevent="handleSearch" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <MultiSelect
                v-model="searchForm.ville"
                :options="villes"
                placeholder="Toutes les villes"
                label-key="title"
                value-key="title"
              />
            </div>
            <div>
              <MultiSelect
                v-model="searchForm.type"
                :options="types"
                placeholder="Toutes les propriétés"
                label-key="title"
                value-key="title"
              />
            </div>
            <div>
              <input
                v-model.number="searchForm.prix_max"
                type="number"
                placeholder="Prix maximum"
                :class="`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ${colorClasses.ring} ${colorClasses.focusBorder}`"
              />
            </div>
          </div>

          <!-- Vacation Filters -->
          <div v-if="activeTab === 'vacances'" class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <input
                v-model="searchForm.date_arrivee"
                type="date"
                :min="new Date().toISOString().split('T')[0]"
                :class="`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ${colorClasses.ring} ${colorClasses.focusBorder}`"
              />
            </div>
            <div>
              <input
                v-model="searchForm.date_depart"
                type="date"
                :min="searchForm.date_arrivee || new Date().toISOString().split('T')[0]"
                :class="`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ${colorClasses.ring} ${colorClasses.focusBorder}`"
              />
            </div>
            <div>
              <input
                v-model.number="searchForm.nbr_adultes"
                type="number"
                placeholder="Adultes"
                :class="`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ${colorClasses.ring} ${colorClasses.focusBorder}`"
              />
            </div>
            <div>
              <input
                v-model.number="searchForm.nbr_enfants"
                type="number"
                placeholder="Enfants"
                :class="`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ${colorClasses.ring} ${colorClasses.focusBorder}`"
              />
            </div>
          </div>

          <!-- Reference Search -->
          <div v-if="showReference" class="mb-4">
            <input
              v-model="searchForm.reference"
              type="text"
              placeholder="Rechercher par référence"
              :class="`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ${colorClasses.ring} ${colorClasses.focusBorder}`"
            />
          </div>

          <!-- Search Button -->
          <div class="flex items-center gap-2">
            <button type="submit" :class="['flex-1 px-6 py-3 rounded-lg font-semibold text-white', colorClasses.bg, colorClasses.hover]">
              Recherchez
            </button>
            <button
              type="button"
              @click="showReference = !showReference"
              :class="['px-4 py-3 rounded-lg transition-colors text-white', colorClasses.bg, colorClasses.hover]"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from '../composables/useTheme'
import { homeService } from '../services/homeService'
import { productService } from '../services/productService'
import bgImmobilierMaroc from '../assets/images/bgs/immobilier-Maroc-2P.webp'
import MultiSelect from './MultiSelect.vue'

const { colorClasses } = useTheme()

const props = defineProps({
  title: {
    type: String,
    default: 'Immobilier Au Maroc De Particulier À Particulier'
  },
  text: {
    type: String,
    default: 'Nos services d\'immobilier au Maroc de particulier à particulier simplifient la vente, la location ou l\'achat de biens sans commission ni intermédiaire. Profitez d\'une plateforme fiable et accessible, regroupant des annonces dans les principales villes comme Agadir, Casablanca et Marrakech. Trouvez des opportunités adaptées à vos besoins grâce à un large choix de biens disponibles.'
  },
  active: {
    type: String,
    default: 'achat'
  },
  bg: {
    type: String,
    default: 'home'
  }
})

const router = useRouter()
const activeTab = ref(props.active || 'achat')
const showReference = ref(false)
const villes = ref([])
const types = ref([])

const searchForm = ref({
  ville: [],
  quartier: '',
  type: [],
  prix_max: '',
  date_arrivee: '',
  date_depart: '',
  nbr_adultes: '',
  nbr_enfants: '',
  reference: '',
})

const bgs = {
  home: bgImmobilierMaroc,
  achat: bgImmobilierMaroc,
  location: bgImmobilierMaroc,
  vacances: bgImmobilierMaroc,
  immoneuf: bgImmobilierMaroc,
}

const bgPath = computed(() => {
  return bgs[props.bg] || bgs.home
})

const routeMap = {
  achat: '/immobilier-a-vendre',
  location: '/location-immobiliere',
  vacances: '/location-vacances',
  immoneuf: '/immobilier-neuf',
}

onMounted(async () => {
  try {
    const homeResponse = await homeService.getHomeData()
    // Handle axios response structure
    const responseData = homeResponse.data || homeResponse
    villes.value = responseData.villes || []
    types.value = responseData.types || []
  } catch (error) {
    console.error('Error loading search data:', error)
    // Initialize empty arrays so component still renders
    villes.value = []
    types.value = []
  }
})

watch(activeTab, async (newTab) => {
  try {
    const categoryMap = {
      achat: 1,
      location: 2,
      vacances: 4,
      immoneuf: 3,
    }
    const response = await productService.getTypes({
      product_category_id: categoryMap[newTab] || 1,
    })
    const responseData = response.data || response
    types.value = responseData.types || []
  } catch (error) {
    console.error('Error loading types:', error)
    // Keep existing types if API fails
  }
})

const handleSearch = () => {
  const route = routeMap[activeTab.value] || '/immobilier-a-vendre'
  const params = { ...searchForm.value }
  
  // Handle villes array - convert to comma-separated string or use 'maroc' as default
  let ville = 'maroc'
  if (params.ville && Array.isArray(params.ville) && params.ville.length > 0) {
    ville = params.ville.join(',')
  }
  
  // Convert arrays to comma-separated strings for query params
  params.ville = Array.isArray(params.ville) && params.ville.length > 0 
    ? params.ville.join(',') 
    : ''
  
  params.type = Array.isArray(params.type) && params.type.length > 0 
    ? params.type.join(',') 
    : ''
  
  // Build query string
  const query = Object.entries(params)
    .filter(([key, value]) => value !== '' && value !== null && value !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&')
  
  router.push(`${route}/${ville}${query ? '?' + query : ''}`)
}
</script>

