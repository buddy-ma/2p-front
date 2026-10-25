<template>
  <div class="home">
    <!-- Hero Section with Search -->
    <HeroSearch 
      :title="t('home.heroTitle')"
      :text="t('home.heroText')"
      active="achat"
      bg="home"
    />

    <!-- Why Choose 2P Section -->
    <section class="bg-white dark:bg-gray-900 w-full py-16 transition-colors" id="catalogue2">
      <div class="container mx-auto px-4">
        <h2 :class="`${colorClasses.text} text-center text-2xl md:text-3xl font-semibold mb-12`">
          {{ t('home.whyChoose') }} 
          <span :class="colorClasses.text">
            <img 
              :src="logoBlueSmall" 
              alt="Immobilier au Maroc de particulier à particulier" 
              class="inline-block h-8 md:h-12 relative -top-1"
              width="120"
              height="48"
              loading="lazy"
            />
          </span> ?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
          <!-- Service Item 1 -->
          <div class="text-center">
            <div class="service-item">
              <div :class="`service-number w-16 h-16 ${colorClasses.bg} text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4`">
                1
              </div>
              <div class="service-text">
                <h3 class="mt-4 mb-1 text-xl font-semibold text-gray-900 dark:text-gray-100">{{ t('home.service1Title') }}</h3>
                <p class="text-gray-600 dark:text-gray-400">
                  {{ t('home.service1Text') }}
                </p>
              </div>
            </div>
          </div>
          <!-- Service Item 2 -->
          <div class="text-center">
            <div class="service-item">
              <div :class="`service-number w-16 h-16 ${colorClasses.bg} text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4`">
                2
              </div>
              <div class="service-text">
                <h3 class="mt-4 mb-1 text-xl font-semibold text-gray-900 dark:text-gray-100">{{ t('home.service2Title') }}</h3>
                <p class="text-gray-600 dark:text-gray-400">
                  {{ t('home.service2Text') }}
                </p>
              </div>
            </div>
          </div>
          <!-- Service Item 3 -->
          <div class="text-center">
            <div class="service-item">
              <div :class="`service-number w-16 h-16 ${colorClasses.bg} text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4`">
                3
              </div>
              <div class="service-text">
                <h3 class="mt-4 mb-1 text-xl font-semibold text-gray-900 dark:text-gray-100">{{ t('home.service3Title') }}</h3>
                <p class="text-gray-600 dark:text-gray-400">
                  {{ t('home.service3Text') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <ServiceSection id="offres" tone="muted" :title="t('navigation.pricing')" center strong>
      <ServiceTabs v-model="pricingTab" id-prefix="tarifs" :label="t('navigation.pricing')" :tabs="pricingTabs">
        <template #proprietaires>
          <div class="grid gap-6 lg:grid-cols-3 items-stretch">
            <OfferCard v-if="premium" :card="premium.card" compact>
              <template #actions>
                <ServiceButton class="!w-full" :to="SERVICE_PAGES.annoncePremium.path" arrow>{{ t('home.viewOffers') }}</ServiceButton>
              </template>
            </OfferCard>
            <OfferCard v-if="assistance" :card="assistance.card" compact>
              <template #actions>
                <ServiceButton class="!w-full" :to="SERVICE_PAGES.assistanceCommerciale.path" arrow>{{ t('home.viewOffers') }}</ServiceButton>
              </template>
            </OfferCard>
            <OfferCard v-if="mandat" :card="mandat.card" compact>
              <template #actions>
                <ServiceButton class="!w-full" :to="SERVICE_PAGES.mandatExclusif.path" arrow>{{ t('home.viewOffers') }}</ServiceButton>
              </template>
            </OfferCard>
          </div>
        </template>

        <template #locationVacances>
          <div v-if="vacationCard" class="max-w-xl mx-auto">
            <OfferCard :card="vacationCard" compact>
              <template #actions>
                <ServiceButton class="!w-full" :to="SERVICE_PAGES.locationVacances.path" arrow>{{ t('home.viewOffers') }}</ServiceButton>
              </template>
            </OfferCard>
          </div>
        </template>

        <template #acheteurs>
          <div class="grid gap-6 md:grid-cols-2 items-stretch">
            <OfferCard v-if="passCard" :card="passCard" compact>
              <template #actions>
                <ServiceButton class="!w-full" :to="SERVICE_PAGES.acheteursLocataires.path" arrow>{{ t('home.viewOffers') }}</ServiceButton>
              </template>
            </OfferCard>
            <OfferCard v-if="packCard" :card="packCard" compact>
              <template #actions>
                <ServiceButton class="!w-full" :to="SERVICE_PAGES.acheteursLocataires.path" arrow>{{ t('home.viewOffers') }}</ServiceButton>
              </template>
            </OfferCard>
          </div>
        </template>
      </ServiceTabs>
    </ServiceSection>

    <!-- Premium Products Section -->
    <section v-if="!loading && data?.premium && data.premium.length > 0" class="bg-gray-50 dark:bg-gray-800 w-full py-16 transition-colors" id="catalogue2">
      <div class="container mx-auto px-4">
        <div class="sec-title">
          <h2 :class="`${colorClasses.text} text-center text-xl md:text-2xl font-semibold mb-8 capitalize`">
            {{ t('home.premiumCollection') }}
          </h2>
        </div>
        <div class="portfolio">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard v-for="product in data.premium" :key="product.id" :product="product" />
          </div>
        </div>
      </div>
    </section>

    <!-- Sold Products Section -->
    <section v-if="!loading && data?.vendu && data.vendu.length > 0" :class="`${colorClasses.bgDark} w-full py-16`" id="catalogue3">
      <div class="container mx-auto px-4">
        <div class="sec-title text-center">
          <h2 class="text-white text-center text-xl md:text-2xl font-semibold mb-8 capitalize">
            {{ t('home.soldThanksTo') }} 
            <span :class="colorClasses.textLight">
            <img 
              :src="logoWhiteSmall" 
              alt="Immobilier au Maroc de particulier à particulier" 
              class="inline-block h-8 md:h-12 relative -top-1"
              width="120"
              height="48"
              loading="lazy"
            />
            </span> 
            {{ t('home.soldThanksToText') }}
          </h2>
        </div>
        <div class="portfolio">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard v-for="product in data.vendu" :key="product.id" :product="product" />
          </div>
        </div>
      </div>
    </section>

    <!-- Announcements Section -->
    <section class="featured portfolio bg-white py-8">
      <div class="container mx-auto px-4 text-center">
        <h2 :class="`${colorClasses.text} text-center text-2xl md:text-3xl font-semibold mb-2`">
          {{ t('home.announcementsTitle') }}
        </h2>
        <h3 class="text-xl md:text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          {{ t('home.announcementsSubtitle') }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
          {{ t('home.announcementsText') }}
        </p>
      </div>
    </section>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-20 bg-white dark:bg-gray-900 transition-colors">
      <div :class="`animate-spin rounded-full h-12 w-12 border-b-2 ${colorClasses.border}`"></div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTheme } from '../composables/useTheme'
import { useI18n } from '../composables/useI18n'
import { homeService } from '../services/homeService'
import { SERVICE_PAGES } from '../config/services'
import HeroSearch from '../components/HeroSearch.vue'
import ServiceSection from '../components/services/ServiceSection.vue'
import ServiceTabs from '../components/services/ServiceTabs.vue'
import OfferCard from '../components/services/OfferCard.vue'
import ServiceButton from '../components/services/ServiceButton.vue'

defineOptions({
  name: 'Home',
  seo: {
    titleKey: 'home.title',
    descriptionKey: 'home.description',
    image: '/assets/images/immobilier/immobilier-de-particulier-a-particulier-maroc.webp'
  }
})
import ProductCard from '../components/ProductCard.vue'
import logoBlueSmall from '../assets/images/logos/logo-blue-small.svg'
import logoWhiteSmall from '../assets/images/logos/logo-white-small.svg'
const { colorClasses } = useTheme()
const { t, tm } = useI18n()

const owners = computed(() => tm('servicePages.proprietaires') || {})
const vacation = computed(() => tm('servicePages.locationVacances') || {})
const buyers = computed(() => tm('servicePages.acheteursLocataires') || {})
const offerCopy = (key) => tm(`servicePages.${key}`)
const premium = computed(() => offerCopy('annoncePremium'))
const assistance = computed(() => offerCopy('assistanceCommerciale'))
const mandat = computed(() => offerCopy('mandatExclusif'))

const pricingTab = ref('proprietaires')
const pricingTabs = computed(() => [
  owners.value.breadcrumb && { id: 'proprietaires', label: owners.value.breadcrumb },
  vacation.value.breadcrumb && { id: 'locationVacances', label: vacation.value.breadcrumb },
  buyers.value.breadcrumb && { id: 'acheteurs', label: buyers.value.breadcrumb },
].filter(Boolean))

// Same card shape as ServiceLocationVacancesOwners. One published offer only.
const vacationCard = computed(() => {
  const offer = vacation.value.offer
  if (!offer) return null
  return {
    name: offer.subtitle,
    price: offer.price,
    includesTitle: offer.includesTitle,
    includes: offer.includes,
    badge: offer.badge,
    notes: [offer.validity, offer.renewal].filter(Boolean),
  }
})

// Same fields as ServiceAcheteursLocataires. Pack price stays the unpublished placeholder.
const passCard = computed(() => {
  const pass = buyers.value.offers?.passVisites
  if (!pass) return null
  return { n: pass.n, name: pass.name, question: pass.lead, price: pass.price, text: pass.text, includes: pass.includes }
})
const packCard = computed(() => {
  const pack = buyers.value.offers?.packPersonnalise
  if (!pack) return null
  return { n: pack.n, name: pack.name, question: pack.lead, text: pack.text, includes: pack.includes, note: pack.note, price: pack.price }
})

const data = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    loading.value = true
    error.value = null
    const response = await homeService.getHomeData()
    // Axios wraps the response, so response.data is the actual JSON data
    data.value = response.data || response
  } catch (err) {
    console.error('Error loading home data:', err)
    error.value = err.response?.data?.message || err.message || 'Failed to load home data'
    // Initialize empty data structure so page still renders
    data.value = {
      premium: [],
      vendu: [],
      villes: [],
      types: [],
      footer_blogs: []
    }
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.service-item {
  padding: 1rem;
}

.service-number {
  margin-bottom: 1rem;
}
</style>
