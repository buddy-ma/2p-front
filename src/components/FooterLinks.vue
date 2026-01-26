<template>
  <footer class="first-footer" role="main" aria-label="Site Footer">
    <!-- Top Footer Section with Dynamic Links -->
    <div class="top-footer">
      <div class="container max-w-6xl mx-auto px-4 py-8">
        <h1 class="text-white mb-4 text-2xl font-bold">{{ title || t('footer.title') }}</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(chunk, chunkIndex) in chunkedLinks" :key="chunkIndex" class="col-lg-3 col-6">
            <div class="navigation">
              <div class="nav-footer">
                <ul class="space-y-2">
                  <li v-for="city in chunk" :key="city.id">
                    <h3>
                      <a :href="generateLink(city)" class="text-gray-300 hover:text-white transition-colors">
                        {{ generateTitle(city) }} à {{ generateLocation(city) }}
                        <span v-if="extra && extra.length === 1">{{ ' ' + extra[0] }}</span>
                      </a>
                    </h3>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Second Footer Section (same as regular footer) -->
    <div class="second-footer position-relative pt-5" :class="colorClasses.bgDark">
      <div class="container max-w-6xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Logo -->
          <div class="col-md-3 col-6">
            <img :src="logoPath" style="max-width: 200px" alt="Immobilier de particulier à particulier" />
          </div>

          <!-- Nos Services -->
          <div class="col-md-3 col-6">
            <div class="navigation">
              <h4 class="text-white mb-4">{{ t('footer.ourServices') }}</h4>
              <div class="nav-footer">
                <ul class="space-y-2">
                  <li><a href="/service-vente" target="_blank" rel="noopener"
                      class="text-gray-300 hover:text-white transition-colors">{{ t('navigation.serviceSale') }}</a>
                  </li>
                  <li><a href="/service-promoteur" target="_blank" rel="noopener"
                      class="text-gray-300 hover:text-white transition-colors">{{ t('navigation.servicePromoter') }}</a>
                  </li>
                  <li><a href="/service-vacances" target="_blank" rel="noopener"
                      class="text-gray-300 hover:text-white transition-colors">{{ t('navigation.serviceVacation') }}</a>
                  </li>
                  <li><a href="/service-location" target="_blank" rel="noopener"
                      class="text-gray-300 hover:text-white transition-colors">{{ t('navigation.serviceLocation') }}</a>
                  </li>
                  <li><a href="/coworking" target="_blank" rel="noopener"
                      class="text-gray-300 hover:text-white transition-colors">{{ t('navigation.coworking') }}</a>
                  </li>
                  <li><a href="/nos-tarifs" target="_blank" rel="noopener"
                      class="text-gray-300 hover:text-white transition-colors">{{ t('navigation.pricing') }}</a></li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Liens Utiles -->
          <div class="col-md-3 col-6">
            <div class="navigation">
              <h4 class="text-white mb-4">{{ t('footer.usefulLinks') }}</h4>
              <div class="nav-footer">
                <ul class="space-y-2">
                  <li><a href="/decouvrezMaroc" class="text-gray-300 hover:text-white transition-colors">{{
                    t('footer.discoverMorocco') }}</a></li>
                  <li><a href="/conseils" class="text-gray-300 hover:text-white transition-colors">{{
                    t('footer.advice') }}</a></li>
                  <li><a href="/contact" class="text-gray-300 hover:text-white transition-colors">{{
                    t('footer.contact') }}</a></li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Pages Légales -->
          <div class="col-md-3 col-6">
            <div class="navigation">
              <h4 class="text-white mb-4">{{ t('footer.legalPages') }}</h4>
              <div class="nav-footer">
                <ul class="space-y-2">
                  <li v-for="blog in footerBlogs" :key="blog.id">
                    <a v-if="blog && blog.slug" :href="`/conseils/${blog.slug}`"
                      class="text-gray-300 hover:text-white transition-colors">
                      {{ blog.short_title || blog.title }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useTheme } from '../composables/useTheme'
import { useI18n } from '../composables/useI18n'
import { homeService } from '../services/homeService'
import logoWhite from '../assets/images/logos/logo-blue-white.svg'

const props = defineProps({
  footerLinks: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  categoryId: {
    type: Number,
    default: 1
  },
  ville: {
    type: String,
    default: ''
  },
  typeId: {
    type: [String, Array],
    default: null
  },
  extra: {
    type: Array,
    default: () => []
  },
  footerLinksType: {
    type: String,
    default: 'ville' // 'ville' or 'quartier'
  }
})

const { colorClasses } = useTheme()
const { t } = useI18n()
const footerBlogs = ref([])

const logoPath = logoWhite

// Chunk footer links into 4 columns
const chunkedLinks = computed(() => {
  if (!props.footerLinks || props.footerLinks.length === 0) return []
  const count = Math.ceil(props.footerLinks.length / 4)
  const chunks = []
  for (let i = 0; i < props.footerLinks.length; i += count) {
    chunks.push(props.footerLinks.slice(i, i + count))
  }
  return chunks
})

// Generate base URL based on category_id
const getBaseUrl = () => {
  const baseUrlMap = {
    1: '/immobilier-a-vendre',
    2: '/location-immobiliere',
    3: '/immobilier-neuf',
    4: '/location-vacances',
  }
  return baseUrlMap[props.categoryId] || '/immobilier-a-vendre'
}

// Generate title based on category_id and type_id
const generateTitle = (city) => {
  const typeIdArray = Array.isArray(props.typeId) ? props.typeId : (props.typeId ? props.typeId.split(',') : [])
  const hasSingleType = typeIdArray.length === 1 && typeIdArray[0] !== 'Toutes les propriétés'

  const titleMap = {
    1: hasSingleType ? `${typeIdArray[0]} a vendre` : 'Immobilier a vendre',
    2: hasSingleType ? `${typeIdArray[0]} a louer` : 'Location Immobilière',
    3: hasSingleType ? `${typeIdArray[0]} neuf` : 'Immobilier Neuf',
    4: hasSingleType ? `${typeIdArray[0]} de vacances` : 'Location de vacances',
  }
  return titleMap[props.categoryId] || 'Immobilier a vendre'
}

// Generate location text
const generateLocation = (city) => {
  if (props.footerLinksType === 'quartier') {
    return `${city.title}, ${props.ville}`
  }
  return city.title
}

// Generate link URL
const generateLink = (city) => {
  const baseUrl = getBaseUrl()

  // Generate city path
  const cityPath = props.footerLinksType === 'quartier'
    ? `${props.ville}/${city.title}`
    : `${city.title}/toutelaville`

  // Add type segment if single type
  const typeIdArray = Array.isArray(props.typeId) ? props.typeId : (props.typeId ? props.typeId.split(',') : [])
  const typeSegment = typeIdArray.length === 1 ? `/${typeIdArray[0]}` : ''

  // Add extra segment if single extra
  const extraSegment = props.extra && props.extra.length === 1 ? `/${props.extra[0]}` : ''

  // Build and clean the link
  let link = `${baseUrl}/${cityPath}${typeSegment}${extraSegment}`
  link = link.replace(/\s+/g, '-').replace(/\/+/g, '/').replace(/\/$/, '')

  return link
}

onMounted(async () => {
  try {
    const response = await homeService.getHomeData()
    const responseData = response.data || response
    footerBlogs.value = responseData.footer_blogs || []
  } catch (error) {
    footerBlogs.value = []
  }
})
</script>

<style scoped>
.first-footer {
  margin-top: 3rem;
}

.top-footer {
  padding: 2rem 0;
  background-color: #152348;
}

.second-footer {
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
}

.navigation h4 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.nav-footer ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-footer li {
  margin-bottom: 0.5rem;
}

.nav-footer a {
  display: inline-block;
  text-decoration: none;
}
</style>
