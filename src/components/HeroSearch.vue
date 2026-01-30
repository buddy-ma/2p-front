<template>
  <section class="relative py-20" :style="{
    backgroundImage: `linear-gradient(-36deg,rgba(77,165,255,0.2) 0%,rgba(49,84,232,0.2) 100%), url(${bgPath})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover'
  }">
    <div class="absolute inset-0 bg-black opacity-30 z-0"></div>
    <div class="container mx-auto max-w-6xl px-4 relative z-10">
      <!-- Desktop Title -->
      <div class="hidden md:block text-center mb-8">
        <h1 class="text-2xl md:text-3xl font-semibold text-white mb-4" style="font-size: 1.5rem; font-weight: 600">
          {{ title || '' }}
        </h1>
      </div>

      <!-- Mobile Title -->
      <div class="md:hidden mb-5 py-4 px-3 bg-gray-100 rounded-2xl">
        <h1 class="mb-3 text-primary text-center" style="font-size: 22px">
          {{ title || 'Immobilier Au Maroc De Particulier À Particulier' }}
        </h1>
      </div>
      <div v-if="showTabs" class="flex justify-center w-full mb-3 gap-2 flex-wrap">
        <button @click="switchType('achat')"
          :class="['px-6 py-2 font-semibold rounded-lg transition-colors', activeTab === 'achat' ? `text-white ${colorClasses.bg} border-2 ${colorClasses.border}` : 'text-black bg-white hover:bg-gray-100']">
          {{ t('hero.sale') }}
        </button>
        <button @click="switchType('location')"
          :class="['px-6 py-2 font-semibold rounded-lg transition-colors', activeTab === 'location' ? `text-white ${colorClasses.bg} border-2 ${colorClasses.border}` : 'text-black bg-white hover:bg-gray-100']">
          {{ t('hero.rent') }}
        </button>
        <button @click="switchType('vacances')"
          :class="['px-6 py-2 font-semibold rounded-lg transition-colors', activeTab === 'vacances' ? `text-white ${colorClasses.bg} border-2 ${colorClasses.border}` : 'text-black bg-white hover:bg-gray-100']">
          {{ t('hero.vacation') }}
        </button>
      </div>
      <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl p-6">
        <!-- Search Form -->
        <form @submit.prevent="handleSearch" class="space-y-4">
          <div :class="['grid gap-4', isHomePage ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2']">
            <!-- Ville Selection -->
            <div>
              <MultiSelect v-model="searchForm.ville" :options="translatedVilles" :placeholder="t('hero.sectorsCities')"
                label-key="translatedTitle" value-key="title" @update:modelValue="handleVilleChange" />
            </div>
            <!-- Quartier Selection (hidden on home page) -->
            <div v-if="!isHomePage">
              <MultiSelect v-model="searchForm.quartier" :options="translatedQuartiers"
                :placeholder="t('hero.entireCity')" label-key="translatedTitle" value-key="title_original"
                :disabled="!canSelectQuartier" />
            </div>
            <!-- Type Selection -->
            <div>
              <MultiSelect v-model="searchForm.type" :options="translatedTypes" :placeholder="t('hero.allProperties')"
                label-key="translatedTitle" value-key="uniqueValue" />
            </div>
            <!-- Max Price -->
            <div>
              <input v-model.number="searchForm.prix_max" type="number" :placeholder="t('hero.maxPrice')"
                :class="`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ${colorClasses.ring} ${colorClasses.focusBorder}`" />
            </div>
          </div>

          <!-- Vacation Filters -->
          <div v-if="activeTab === 'vacances'" class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <input v-model="searchForm.date_arrivee" type="date" :min="new Date().toISOString().split('T')[0]"
                :placeholder="t('hero.arrivalDate')"
                :class="`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ${colorClasses.ring} ${colorClasses.focusBorder}`" />
            </div>
            <div>
              <input v-model="searchForm.date_depart" type="date" :min="minDepartureDate"
                :placeholder="t('hero.departureDate')"
                :class="`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ${colorClasses.ring} ${colorClasses.focusBorder}`" />
            </div>
            <div>
              <input v-model.number="searchForm.nbr_adultes" type="number" min="1" :placeholder="t('hero.adultsCount')"
                :class="`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ${colorClasses.ring} ${colorClasses.focusBorder}`" />
            </div>
            <div>
              <input v-model.number="searchForm.nbr_enfants" type="number" min="0"
                :placeholder="t('hero.childrenCount')"
                :class="`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ${colorClasses.ring} ${colorClasses.focusBorder}`" />
            </div>
          </div>

          <!-- Reference/Search Button Group (styled like the image) -->
          <div class="flex gap-2 w-full mt-2 mb-2">
            <button type="submit" :class="[
              'flex-1 px-6 py-2 rounded-lg font-semibold text-white transition',
              colorClasses.bg,
              colorClasses.hover,
              'focus:outline-none'
            ]">
              {{ t('hero.searchButton') }}
            </button>
            <button type="button" @click="showReference = !showReference" :class="[
              'flex items-center justify-center px-0 w-12 md:w-10 py-2 rounded-lg font-bold transition',
              colorClasses.bg,
              colorClasses.hover,
              'text-white text-xl focus:outline-none'
            ]" :aria-label="t('hero.referenceSearch')">
              <ScanBarcode />
            </button>
          </div>

          <!-- Reference Input -->
          <div v-if="showReference" class="mb-4">
            <input v-model="searchForm.reference" type="text" :placeholder="t('hero.reference')"
              :class="`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ${colorClasses.ring} ${colorClasses.focusBorder}`" />
          </div>
        </form>
      </div>

      <!-- Extras Filter -->
      <ExtrasFilter v-if="props.extras && Object.keys(props.extras).length > 0 && hasTypeSelected"
        :extras="props.extras" :extra="props.extra || []" :ville="currentVille" :quartier="currentQuartier"
        :types-immobilier="currentTypesImmobilier" :is-mobile="false" />
    </div>


  </section>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTheme } from '../composables/useTheme'
import { useI18n } from '../composables/useI18n'
import { homeService } from '../services/homeService'
import { productService } from '../services/productService'
import { getLocalizedPath } from '../utils/routeHelpers'
import ExtrasFilter from './ExtrasFilter.vue'
import bgImmobilierMaroc from '../assets/images/bgs/immobilier-Maroc-2P.webp'
import MultiSelect from './MultiSelect.vue'
import { ScanBarcode } from 'lucide-vue-next'
import propertiesData from '../locales/data/properties.js'

const { colorClasses } = useTheme()
const { t, currentLocale } = useI18n()
const router = useRouter()
const route = useRoute()

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
  },
  extras: {
    type: Object,
    default: () => ({})
  },
  extra: {
    type: Array,
    default: () => []
  }
})

const activeTab = ref(props.active || 'achat')
const showReference = ref(false)
const villes = ref([])
const quartiers = ref([])
const types = ref([])
const categoryId = ref(1)

const searchForm = ref({
  ville: [],
  quartier: [],
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

const showTabs = computed(() => {
  return route.path === '/' || route.path === '/fr' || route.path === '/en' || route.path === '/ar'
})

const isHomePage = computed(() => {
  const path = route.path
  return path === '/' || path === '/fr' || path === '/en' || path === '/ar'
})

const activeTabText = computed(() => {
  const texts = {
    achat: t('hero.forSale'),
    location: t('hero.forRent'),
    vacances: t('hero.forVacation'),
    immoneuf: t('hero.new'),
  }
  return texts[activeTab.value] || ''
})

const canSelectQuartier = computed(() => {
  return searchForm.value.ville && searchForm.value.ville.length === 1
})

// Helper function to translate city names (matching Blade: __('cities.' . ucwords(str_replace('-', ' ', $city))))
const translateCity = (cityTitle) => {
  if (!cityTitle) return ''
  // Convert dashes to spaces and capitalize words (matching ucwords)
  const normalized = cityTitle.replace(/-/g, ' ').split(' ').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ')
  // Try to get translation from common.cities using the capitalized key (matching Laravel cities.php)
  // First try with capitalized key, then lowercase fallback
  let translation = t(`common.cities.${normalized}`)
  if (translation === `common.cities.${normalized}`) {
    // Fallback to lowercase key
    translation = t(`common.cities.${normalized.toLowerCase()}`)
  }
  // If translation exists and is different from the key path, return it, otherwise return normalized
  if (translation && translation !== `common.cities.${normalized}` && translation !== `common.cities.${normalized.toLowerCase()}`) {
    return translation
  }
  return normalized
}

// Helper function to translate quartier names (matching Blade: __('quartiers.' . str_replace('-', ' ', $selected)))
const translateQuartier = (quartierTitle) => {
  if (!quartierTitle) return quartierTitle
  // Convert dashes to spaces (matching Blade template)
  // Keep original capitalization as quartiers.php keys match exact case
  const normalized = quartierTitle.replace(/-/g, ' ')
  // Try to get translation from common.quartiers using the exact quartier name as key
  // The key should match exactly as stored in Laravel quartiers.php files (case-sensitive)
  const translation = t(`common.quartiers.${normalized}`)
  // If translation exists and is different from the key path, return it, otherwise return normalized
  if (translation && translation !== `common.quartiers.${normalized}`) {
    return translation
  }
  return normalized
}

// Computed property for translated villes
const translatedVilles = computed(() => {
  return villes.value.map(ville => ({
    ...ville,
    translatedTitle: translateCity(ville.title || '')
  }))
})

// Computed property for translated quartiers
const translatedQuartiers = computed(() => {
  return quartiers.value.map(quartier => ({
    ...quartier,
    translatedTitle: translateQuartier(quartier.title || quartier.title_original || '')
  }))
})

// Helper function to translate property type names
// Types come from API already translated based on language_id, but we add fallback translation support
const translateType = (typeTitle) => {
  if (!typeTitle) return ''
  // Types are usually already translated from API based on language_id
  // But we can add fallback translation from common.propertyTypes if needed
  const normalized = typeTitle.trim()
  const currentLang = currentLocale.value || 'fr'
  const properties = propertiesData

  // Try to find the French key by searching in all language translations
  let foundKey = null

  // Search in French translations (keys are in French)
  for (const [key, value] of Object.entries(properties.fr || {})) {
    if (value.toLowerCase() === normalized.toLowerCase() || key.toLowerCase() === normalized.toLowerCase()) {
      foundKey = key
      break
    }
  }

  // If not found in French, search in English translations
  if (!foundKey) {
    for (const [key, value] of Object.entries(properties.en || {})) {
      if (value.toLowerCase() === normalized.toLowerCase()) {
        foundKey = key
        break
      }
    }
  }

  // If not found in English, search in Arabic translations
  if (!foundKey) {
    for (const [key, value] of Object.entries(properties.ar || {})) {
      if (value.toLowerCase() === normalized.toLowerCase()) {
        foundKey = key
        break
      }
    }
  }

  // If key found, get translation for current language
  if (foundKey && properties[currentLang] && properties[currentLang][foundKey]) {
    return properties[currentLang][foundKey]
  }

  // Fallback: Try direct translation lookup with normalized key
  const typeKey = normalized.toLowerCase().replace(/\s+/g, '')
  const translation = t(`common.propertyTypes.${typeKey}`)
  if (translation && translation !== `common.propertyTypes.${typeKey}`) {
    return translation
  }

  // Return original title if no translation found
  return normalized
}

// Computed property for translated types
const translatedTypes = computed(() => {
  const allPropertiesText = t('hero.allProperties')
  const translated = typesWithUniqueValues.value.map(type => {
    if (!type) return null
    return {
      ...type,
      translatedTitle: translateType(type.title || '')
    }
  }).filter(Boolean)

  // Remove duplicates of "All Properties" - keep only the first one
  const seenAllProperties = new Set()
  return translated.filter(type => {
    if (!type) return false
    const isAllProperties = type.translatedTitle === allPropertiesText ||
      type.title === allPropertiesText ||
      (type.type_title_original && (
        type.type_title_original.toLowerCase() === 'toutes-les-propriétés' ||
        type.type_title_original.toLowerCase() === 'toutes les propriétés' ||
        type.type_title_original.toLowerCase() === 'all-properties'
      ))

    if (isAllProperties) {
      if (seenAllProperties.has('all-properties')) {
        return false // Skip duplicate
      }
      seenAllProperties.add('all-properties')
    }
    return true
  })
})


// Create types with unique values to prevent selection issues
const typesWithUniqueValues = computed(() => {
  return types.value.map((type, index) => {
    if (!type) return null

    // Ensure each type has a unique value
    // Priority: type_title_original > title (normalized) > id > index-based value
    let uniqueValue = null

    if (type.type_title_original && type.type_title_original.trim()) {
      uniqueValue = type.type_title_original.trim()
    } else if (type.title && type.title.trim()) {
      uniqueValue = type.title.trim().replace(/\s+/g, '-')
    } else if (type.id) {
      uniqueValue = `type-id-${type.id}`
    } else {
      uniqueValue = `type-${index}`
    }

    return {
      ...type,
      uniqueValue: uniqueValue
    }
  }).filter(Boolean) // Remove any null entries
})

const minDepartureDate = computed(() => {
  if (searchForm.value.date_arrivee) {
    const date = new Date(searchForm.value.date_arrivee)
    date.setDate(date.getDate() + 1)
    return date.toISOString().split('T')[0]
  }
  return new Date().toISOString().split('T')[0]
})

// Computed properties for ExtrasFilter
const hasTypeSelected = computed(() => {
  const typeParam = route.params.type
  const queryTypes = route.query.types_immobilier
  return (typeParam && typeParam !== '') || (queryTypes && queryTypes !== '')
})

const currentTypesImmobilier = computed(() => {
  const typeParam = route.params.type
  const queryTypes = route.query.types_immobilier

  if (queryTypes) {
    return queryTypes.split(',').map(t => t.replace(/-/g, ' '))
  } else if (typeParam) {
    return [typeParam.replace(/-/g, ' ')]
  }
  return []
})

const currentVille = computed(() => {
  const villeParam = route.params.ville
  if (villeParam && villeParam !== 'maroc') {
    return villeParam.replace(/-/g, ' ')
  }
  return ''
})

const currentQuartier = computed(() => {
  const quartierParam = route.params.quartier
  if (quartierParam && quartierParam !== 'toutelaville') {
    return quartierParam.replace(/-/g, ' ')
  }
  return ''
})

const routeMap = {
  achat: 'immobilier-a-vendre',
  location: 'location-immobiliere',
  vacances: 'location-vacances',
  immoneuf: 'immobilier-neuf',
}

const categoryMap = {
  achat: 1,
  location: 2,
  vacances: 4,
  immoneuf: 3,
}

// Detect active tab from route path
const detectActiveTabFromRoute = () => {
  const path = route.path
  if (path.includes('immobilier-a-vendre')) {
    return 'achat'
  } else if (path.includes('location-immobiliere')) {
    return 'location'
  } else if (path.includes('location-vacances')) {
    return 'vacances'
  } else if (path.includes('immobilier-neuf')) {
    return 'immoneuf'
  }
  return props.active || 'achat'
}

// Parse route parameters and populate form
const populateFormFromRoute = async () => {
  // Detect active tab from route
  const detectedTab = detectActiveTabFromRoute()
  if (detectedTab !== activeTab.value) {
    activeTab.value = detectedTab
    categoryId.value = categoryMap[detectedTab] || 1
    await loadTypes(categoryId.value)
  }

  // Ensure types are loaded before processing
  if (types.value.length === 0) {
    await loadTypes(categoryId.value)
  }

  // Parse route params
  const villeParam = route.params.ville ? route.params.ville.replace(/-/g, ' ') : null
  const quartierParam = route.params.quartier ? route.params.quartier.replace(/-/g, ' ') : null
  const typeParam = route.params.type ? route.params.type.replace(/-/g, ' ') : null

  // Parse query params
  const query = route.query || {}

  // Handle villes - ensure villes are loaded
  if (villes.value.length > 0) {
    if (query.cities) {
      // Multiple cities from query
      const cities = query.cities.split(',').map(c => c.replace(/-/g, ' '))
      searchForm.value.ville = cities.map(city => {
        // Find matching ville object or use string
        const villeObj = villes.value.find(v => {
          const normalizedVille = v.title ? v.title.replace(/\s+/g, '-') : ''
          const normalizedCity = city.replace(/\s+/g, '-')
          return v.title === city || normalizedVille === normalizedCity
        })
        return villeObj ? villeObj.title : city
      })
    } else if (villeParam && villeParam !== 'maroc') {
      // Single ville from params
      const villeObj = villes.value.find(v => {
        const normalizedVille = v.title ? v.title.replace(/\s+/g, '-') : ''
        const normalizedParam = villeParam.replace(/\s+/g, '-')
        return v.title === villeParam || normalizedVille === normalizedParam
      })
      searchForm.value.ville = villeObj ? [villeObj.title] : [villeParam]
    }
  } else if (villeParam && villeParam !== 'maroc') {
    // If villes not loaded yet, store as string temporarily
    searchForm.value.ville = [villeParam]
  }

  // Handle quartiers
  if (query.quartiers) {
    // Multiple quartiers from query
    const quartiersList = query.quartiers.split(',').map(q => q.replace(/-/g, ' '))
    searchForm.value.quartier = quartiersList.map(q => {
      if (q === 'toutelaville') return 'toutelaville'
      return q.replace(/\s+/g, '-')
    })
  } else if (quartierParam) {
    // Single quartier from params
    if (quartierParam === 'toutelaville') {
      searchForm.value.quartier = ['toutelaville']
    } else {
      searchForm.value.quartier = [quartierParam.replace(/\s+/g, '-')]
    }
    // Load quartiers list for the selected ville if needed
    if (!isHomePage.value && searchForm.value.ville.length === 1 && quartiers.value.length === 0) {
      await loadQuartiersForVille(searchForm.value.ville[0])
    }
  } else if (!isHomePage.value && searchForm.value.ville.length === 1) {
    // Load quartiers if single ville selected but no quartier in route
    await handleVilleChange(searchForm.value.ville)
  }

  // Handle types - wait for types to be loaded and use uniqueValue
  if (typesWithUniqueValues.value.length > 0) {
    if (query.types_immobilier) {
      // Multiple types from query
      const typesList = query.types_immobilier.split(',').map(t => t.replace(/-/g, ' '))
      searchForm.value.type = typesList.map(typeTitle => {
        if (!typeTitle || !typeTitle.trim()) return null

        // Find matching type object using uniqueValue
        const typeObj = typesWithUniqueValues.value.find(t => {
          if (!t) return false
          const original = (t.type_title_original || '').trim()
          const title = (t.title || '').trim()
          const uniqueVal = (t.uniqueValue || '').trim()

          const normalizedOriginal = original ? original.replace(/\s+/g, '-').toLowerCase() : ''
          const normalizedTitle = typeTitle.replace(/\s+/g, '-').toLowerCase()
          const normalizedTitleValue = title ? title.replace(/\s+/g, '-').toLowerCase() : ''
          const normalizedUnique = uniqueVal ? uniqueVal.replace(/\s+/g, '-').toLowerCase() : ''

          return (original && original === typeTitle) ||
            (title && title === typeTitle) ||
            (uniqueVal && uniqueVal === typeTitle) ||
            (normalizedOriginal && normalizedOriginal === normalizedTitle) ||
            (normalizedTitleValue && normalizedTitleValue === normalizedTitle) ||
            (normalizedUnique && normalizedUnique === normalizedTitle) ||
            (original && original.toLowerCase() === typeTitle.toLowerCase()) ||
            (title && title.toLowerCase() === typeTitle.toLowerCase())
        })

        if (typeObj && typeObj.uniqueValue) {
          return typeObj.uniqueValue
        }
        // Fallback: use the typeTitle as-is (normalized)
        return typeTitle.replace(/\s+/g, '-')
      }).filter(Boolean) // Remove any null/undefined values
    } else if (typeParam) {
      // Single type from params
      const typeObj = typesWithUniqueValues.value.find(t => {
        if (!t) return false
        const original = (t.type_title_original || '').trim()
        const title = (t.title || '').trim()
        const uniqueVal = (t.uniqueValue || '').trim()

        const normalizedOriginal = original ? original.replace(/\s+/g, '-').toLowerCase() : ''
        const normalizedParam = typeParam.replace(/\s+/g, '-').toLowerCase()
        const normalizedTitleValue = title ? title.replace(/\s+/g, '-').toLowerCase() : ''
        const normalizedUnique = uniqueVal ? uniqueVal.replace(/\s+/g, '-').toLowerCase() : ''

        return (original && original === typeParam) ||
          (title && title === typeParam) ||
          (uniqueVal && uniqueVal === typeParam) ||
          (normalizedOriginal && normalizedOriginal === normalizedParam) ||
          (normalizedTitleValue && normalizedTitleValue === normalizedParam) ||
          (normalizedUnique && normalizedUnique === normalizedParam) ||
          (original && original.toLowerCase() === typeParam.toLowerCase()) ||
          (title && title.toLowerCase() === typeParam.toLowerCase())
      })

      if (typeObj && typeObj.uniqueValue) {
        searchForm.value.type = [typeObj.uniqueValue]
      } else {
        // Fallback: use the param as-is (normalized)
        searchForm.value.type = [typeParam.replace(/\s+/g, '-')]
      }
    }
  } else if (typeParam || query.types_immobilier) {
    // If types not loaded yet but we have type params, store them temporarily
    if (query.types_immobilier) {
      const typesList = query.types_immobilier.split(',').map(t => t.replace(/-/g, ' ').replace(/\s+/g, '-'))
      searchForm.value.type = typesList
    } else if (typeParam) {
      searchForm.value.type = [typeParam.replace(/\s+/g, '-')]
    }
  }

  // Handle other query params
  if (query.prix_max) {
    searchForm.value.prix_max = Number(query.prix_max) || ''
  }
  if (query.date_arrivee) {
    searchForm.value.date_arrivee = query.date_arrivee
  }
  if (query.date_depart) {
    searchForm.value.date_depart = query.date_depart
  }
  if (query.nbr_adultes) {
    searchForm.value.nbr_adultes = Number(query.nbr_adultes) || ''
  }
  if (query.nbr_enfants) {
    searchForm.value.nbr_enfants = Number(query.nbr_enfants) || ''
  }
  if (query.reference) {
    searchForm.value.reference = query.reference
    showReference.value = true
  }
}

// Load initial data
onMounted(async () => {
  try {
    // Load villes first
    const homeResponse = await homeService.getHomeData()
    const responseData = homeResponse.data || homeResponse
    villes.value = responseData.villes || []

    // Detect active tab from route
    const detectedTab = detectActiveTabFromRoute()
    activeTab.value = detectedTab
    categoryId.value = categoryMap[detectedTab] || 1

    // Load types for detected category
    await loadTypes(categoryId.value)

    // On home page, always set quartier to 'toutelaville'
    if (isHomePage.value) {
      searchForm.value.quartier = ['toutelaville']
    } else {
      // Populate form from route parameters (villes and types are now loaded)
      await populateFormFromRoute()
    }
  } catch (error) {
    console.error('Error loading search data:', error)
    villes.value = []
    types.value = []
  }
})

// Watch for route changes to update form
watch(() => route.params, async () => {
  if (!isHomePage.value) {
    await populateFormFromRoute()
  }
}, { deep: true })

watch(() => route.query, async () => {
  if (!isHomePage.value) {
    await populateFormFromRoute()
  }
}, { deep: true })

// Watch quartier selection - uncheck "toutelaville" when any other quartier is selected
watch(() => searchForm.value.quartier, (newQuartiers) => {
  // Skip on home page
  if (isHomePage.value) {
    return
  }

  // If any quartier other than "toutelaville" is selected, remove "toutelaville"
  if (newQuartiers && newQuartiers.length > 0) {
    const hasOtherQuartier = newQuartiers.some(q => {
      const quartierValue = typeof q === 'string' ? q : (q?.title_original || q?.title || q)
      return quartierValue !== 'toutelaville'
    })

    if (hasOtherQuartier) {
      // Remove "toutelaville" if present
      const index = newQuartiers.findIndex(q => {
        const quartierValue = typeof q === 'string' ? q : (q?.title_original || q?.title || q)
        return quartierValue === 'toutelaville'
      })
      if (index > -1) {
        searchForm.value.quartier = newQuartiers.filter((_, i) => i !== index)
      }
    }
  }
}, { deep: true })

// Load types when category changes
const loadTypes = async (categoryId) => {
  try {
    const locale = localStorage.getItem('app_locale') || 'fr'
    const languageId = locale === 'fr' ? 1 : locale === 'ar' ? 2 : 3

    const response = await productService.getTypes({
      product_category_id: categoryId,
      language_id: languageId,
    })
    const responseData = response.data || response
    // Filter out any null/undefined types and ensure they have at least a title or id
    types.value = (responseData.types || []).filter(t => t && (t.title || t.type_title_original || t.id))

    // Add "Toutes les propriétés" option if not present
    const allPropertiesText = t('hero.allProperties')
    // Check if "All Properties" already exists by comparing both title and type_title_original
    const hasAllProperties = types.value.some(t => {
      if (!t) return false
      // Check if title matches (case-insensitive, trimmed)
      const titleMatch = t.title && t.title.trim().toLowerCase() === allPropertiesText.trim().toLowerCase()
      // Check if type_title_original matches the expected value
      const originalMatch = t.type_title_original && (
        t.type_title_original.toLowerCase() === 'toutes-les-propriétés' ||
        t.type_title_original.toLowerCase() === 'toutes les propriétés' ||
        t.type_title_original.toLowerCase() === 'all-properties'
      )
      // Also check if the translated title matches any language version
      const translatedMatch = t.title && (
        t.title.trim() === 'جميع العقارات' ||
        t.title.trim() === 'Toutes les propriétés' ||
        t.title.trim() === 'All Properties' ||
        t.title.trim() === 'All properties'
      )
      return titleMatch || originalMatch || translatedMatch
    })
    if (!hasAllProperties) {
      types.value.unshift({
        id: 'all-properties',
        title: allPropertiesText,
        type_title_original: 'Toutes-les-propriétés',
      })
    }
  } catch (error) {
    console.error('Error loading types:', error)
  }
}

// Switch between property types (achat, location, vacances)
const switchType = async (type) => {
  activeTab.value = type
  categoryId.value = categoryMap[type] || 1

  // Load types for new category
  await loadTypes(categoryId.value)

  // Reset quartier when switching to vacation
  if (type === 'vacances') {
    searchForm.value.quartier = ['toutelaville']
  }
}

// Helper function to load quartiers for a ville
const loadQuartiersForVille = async (villeTitle) => {
  try {
    const normalizedTitle = typeof villeTitle === 'string'
      ? villeTitle.replace(/-/g, ' ')
      : (villeTitle?.title || '').replace(/-/g, ' ')

    if (!normalizedTitle) {
      quartiers.value = []
      return
    }

    const response = await productService.getQuartiers({
      title: normalizedTitle,
    })
    const responseData = response.data || response

    // Add "Toute la ville" option first
    quartiers.value = [
      {
        title: t('hero.entireCity'),
        title_original: 'toutelaville',
      },
      ...(responseData.quartiers || []).map(q => ({
        title: q.title,
        title_original: q.title.replace(/\s+/g, '-'),
      })),
    ]
  } catch (error) {
    console.error('Error loading quartiers:', error)
    quartiers.value = []
  }
}

// Handle ville change - load quartiers
const handleVilleChange = async (selectedVilles) => {
  // On home page, always set quartier to 'toutelaville' and don't load quartiers
  if (isHomePage.value) {
    searchForm.value.quartier = ['toutelaville']
    quartiers.value = []
    return
  }

  // Don't clear quartier if it's already set from route params
  const hadQuartier = searchForm.value.quartier.length > 0
  if (!hadQuartier) {
    searchForm.value.quartier = []
  }

  if (!selectedVilles || selectedVilles.length === 0) {
    if (!hadQuartier) {
      quartiers.value = []
    }
    return
  }

  // If single ville selected, load quartiers
  if (selectedVilles.length === 1) {
    await loadQuartiersForVille(selectedVilles[0])

    // Auto-select "toutelaville" for vacation if no quartier was set
    if (!hadQuartier && activeTab.value === 'vacances') {
      searchForm.value.quartier = ['toutelaville']
    }
  } else {
    // Multiple villes selected - clear quartiers only if not set from route
    if (!hadQuartier) {
      quartiers.value = []
    }
  }
}

// Build URL matching Blade template logic
const buildSearchUrl = () => {
  const reference = searchForm.value.reference?.trim()

  // If reference search, redirect to /annonce/{reference}
  if (reference) {
    return `/annonce/${reference}`
  }

  const ville = searchForm.value.ville
  const quartier = searchForm.value.quartier
  const type = searchForm.value.type
  const prix_max = searchForm.value.prix_max
  const category_id = categoryId.value

  // Validate ville selection
  if (!ville || ville.length === 0) {
    // Show error message
    alert(t('hero.pleaseSelectCity'))
    return null
  }

  // Build base route
  const baseRoute = routeMap[activeTab.value] || 'immobilier-a-vendre'
  let url = `/${baseRoute}`

  // Determine ville link - extract title from ville objects/strings
  let villeLink = 'maroc'
  if (ville.length === 1) {
    const villeValue = typeof ville[0] === 'string' ? ville[0] : (ville[0]?.title || ville[0])
    villeLink = villeValue.replace(/\s+/g, '-')
  }

  url += `/${villeLink}`

  // Determine quartier link
  let quartierLink = ''
  if (quartier && quartier.length > 0) {
    const firstQuartier = typeof quartier[0] === 'string' ? quartier[0] : quartier[0]
    if (quartier.length === 1 && firstQuartier !== 'toutelaville') {
      quartierLink = firstQuartier.replace(/\s+/g, '-')
    } else if (quartier.length > 1) {
      quartierLink = ''
    }
  }

  if (quartierLink) {
    url += `/${quartierLink}`
  } else {
    url += '/toutelaville'
  }

  // Add type if single selection - convert uniqueValue back to URL format
  if (type && type.length === 1) {
    let typeValue = ''
    if (typeof type[0] === 'string') {
      // Find the type object to get the proper URL value
      const typeObj = typesWithUniqueValues.value.find(t => t && t.uniqueValue === type[0])
      if (typeObj) {
        // Use type_title_original if available, otherwise use title normalized
        typeValue = (typeObj.type_title_original && typeObj.type_title_original.trim())
          ? typeObj.type_title_original
          : (typeObj.title && typeObj.title.trim())
            ? typeObj.title.replace(/\s+/g, '-')
            : type[0]
      } else {
        typeValue = type[0]
      }
    } else {
      // Try to get type_title_original, fallback to title (matching Blade template logic)
      typeValue = type[0]?.type_title_original || type[0]?.title || type[0]
    }
    // Replace spaces with dashes (matching Blade template logic)
    typeValue = String(typeValue).replace(/\s+/g, '-')
    url += `/${typeValue}`
  }

  // Build query parameters
  const queryParams = []

  // Add cities parameter if multiple villes
  if (villeLink === 'maroc' && ville.length > 0) {
    const citiesValue = ville.map(v => {
      const villeVal = typeof v === 'string' ? v : (v?.title || v)
      return villeVal.replace(/\s+/g, '-')
    }).join(',')
    queryParams.push(`cities=${encodeURIComponent(citiesValue)}`)
  }

  // Add quartiers parameter if multiple quartiers
  if (!quartierLink && quartier && quartier.length > 1) {
    const quartiersValue = quartier.map(q => {
      const quartierVal = typeof q === 'string' ? q : q
      return quartierVal.replace(/\s+/g, '-')
    }).join(',')
    queryParams.push(`quartiers=${encodeURIComponent(quartiersValue)}`)
  }

  // Add types parameter if multiple types - convert uniqueValue back to URL format
  if (type && type.length > 1) {
    const typesValue = type.map(t => {
      let typeVal = ''
      if (typeof t === 'string') {
        // Find the type object to get the proper URL value
        const typeObj = typesWithUniqueValues.value.find(typeItem => typeItem && typeItem.uniqueValue === t)
        if (typeObj) {
          // Use type_title_original if available, otherwise use title normalized
          typeVal = (typeObj.type_title_original && typeObj.type_title_original.trim())
            ? typeObj.type_title_original
            : (typeObj.title && typeObj.title.trim())
              ? typeObj.title.replace(/\s+/g, '-')
              : t
        } else {
          typeVal = t
        }
      } else {
        // Use type_title_original if available, fallback to title (matching Blade template logic)
        typeVal = t?.type_title_original || t?.title || t
      }
      return String(typeVal).replace(/\s+/g, '-')
    }).join(',')
    queryParams.push(`types_immobilier=${encodeURIComponent(typesValue)}`)
  }

  // Add prix_max
  if (prix_max) {
    queryParams.push(`prix_max=${encodeURIComponent(prix_max)}`)
  }

  // Add vacation-specific parameters
  if (category_id === 4) {
    if (searchForm.value.date_arrivee) {
      queryParams.push(`date_arrivee=${encodeURIComponent(searchForm.value.date_arrivee)}`)
    }
    if (searchForm.value.date_depart) {
      queryParams.push(`date_depart=${encodeURIComponent(searchForm.value.date_depart)}`)
    }
    if (searchForm.value.nbr_adultes) {
      queryParams.push(`nbr_adultes=${encodeURIComponent(searchForm.value.nbr_adultes)}`)
    }
    if (searchForm.value.nbr_enfants) {
      queryParams.push(`nbr_enfants=${encodeURIComponent(searchForm.value.nbr_enfants)}`)
    }
  }

  // Add query string if any params
  if (queryParams.length > 0) {
    url += '?' + queryParams.join('&')
  }

  return url
}

// Handle search form submission
const handleSearch = () => {
  // On home page, always set quartier to 'toutelaville'
  if (isHomePage.value) {
    searchForm.value.quartier = ['toutelaville']
  }

  const url = buildSearchUrl()
  if (!url) return

  // Get current locale
  const locale = localStorage.getItem('app_locale') || 'fr'

  // Build localized path
  const localizedUrl = getLocalizedPath(url, locale)

  router.push(localizedUrl)
}

// Watch activeTab to reload types
watch(activeTab, async (newTab) => {
  await switchType(newTab)
})
</script>
