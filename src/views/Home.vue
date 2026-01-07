<template>
  <div class="home">
    <!-- Hero Section with Search -->
    <HeroSearch 
      title="Immobilier Au Maroc De Particulier À Particulier"
      text="Nos services d'immobilier au Maroc de particulier à particulier simplifient la vente, la location ou l'achat de biens sans commission ni intermédiaire. Profitez d'une plateforme fiable et accessible, regroupant des annonces dans les principales villes comme Agadir, Casablanca et Marrakech. Trouvez des opportunités adaptées à vos besoins grâce à un large choix de biens disponibles."
      active="achat"
      bg="home"
    />

    <!-- Why Choose 2P Section -->
    <section class="bg-white w-full py-16" id="catalogue2">
      <div class="container mx-auto px-4">
        <h2 :class="`${colorClasses.text} text-center text-2xl md:text-3xl font-semibold mb-12`">
          Pourquoi choisir 
          <span :class="colorClasses.text">
            <img 
              :src="logoBlueSmall" 
              alt="Immobilier au Maroc de particulier à particulier" 
              class="inline-block h-8 md:h-12 relative -top-1"
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
                <h3 class="mt-4 mb-1 text-xl font-semibold">Des services complets et personnalisés</h3>
                <p class="text-gray-600">
                  Que ce soit pour vendre, louer, Booster vos biens immobilier, nous proposons des solutions adaptées à chaque besoin immobilier ou professionnel.
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
                <h3 class="mt-4 mb-1 text-xl font-semibold">Une expertise fiable et un service gagnant</h3>
                <p class="text-gray-600">
                  Notre équipe expérimentée vous guide à chaque étape, vous assurant un service professionnel et efficace.
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
                <h3 class="mt-4 mb-1 text-xl font-semibold">Des forfaits clairs, abordables et efficaces</h3>
                <p class="text-gray-600">
                  Nous proposons des tarifs transparents et compétitifs, adaptés à tous les budgets et besoins.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Steps Section refactor based on the provided image -->
    <section :class="`${colorClasses.bgDark} w-full py-16 ${colorClasses.text}`" id="catalogue2">
      <div class="container mx-auto px-4">
        <h2 class="text-white text-center mb-12 text-white md:text-lg font-semibold">
          Étapes <span class="font-normal">Pour Obtenir Votre Service Premium</span>
          <span>
            <img 
              :src="logoWhiteSmall"
              alt="2P Service Premium"
              class="inline-block h-7 ml-2 align-middle"
            />
          </span>
        </h2>
        <div class="relative flex flex-col md:flex-row items-center justify-between md:space-x-0">
          <!-- Progress Bar Line -->
          <div class="hidden md:block absolute left-0 right-0 top-6 z-0 w-full">
            <div class="h-2 bg-white/50 rounded-full mx-auto w-full"></div>
          </div>
          <!-- Steps -->
          <div class="w-full grid grid-cols-1 md:grid-cols-5 gap-y-8 md:gap-0 z-10">
            <!-- Step 1 -->
            <div class="flex flex-col items-center text-center px-2">
              <div class="w-14 h-14 bg-white text-[#534fa5] rounded-full flex items-center justify-center text-2xl font-bold mb-4 border-4 border-[#534fa5]">
                1
              </div>
              <h3 class="mt-2 mb-1 font-semibold text-white">Choisissez le service adapté à vos besoins</h3>
              <p class="text-xs text-white/90 leading-snug">Consultez nos services disponibles et sélectionnez le service qui vous convient.</p>
            </div>
            <!-- Step 2 -->
            <div class="flex flex-col items-center text-center px-2">
              <div class="w-14 h-14 bg-[#534fa5] text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 border-4 border-white">
                2
              </div>
              <h3 class="mt-2 mb-1 font-semibold text-white">Sélectionnez votre forfait</h3>
              <p class="text-xs text-white/90 leading-snug">Sélectionnez un forfait parmi nos tarifs. Tout pour composer la meilleure offre selon vos besoins.</p>
            </div>
            <!-- Step 3 -->
            <div class="flex flex-col items-center text-center px-2">
              <div class="w-14 h-14 bg-white text-[#534fa5] rounded-full flex items-center justify-center text-2xl font-bold mb-4 border-4 border-[#534fa5]">
                3
              </div>
              <h3 class="mt-2 mb-1 font-semibold text-white">Complétez le formulaire de demande</h3>
              <p class="text-xs text-white/90 leading-snug">Accédez à la page de demande et remplissez le formulaire avec soin, en y mentionnant les détails nécessaires.</p>
            </div>
            <!-- Step 4 -->
            <div class="flex flex-col items-center text-center px-2">
              <div class="w-14 h-14 bg-[#534fa5] text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 border-4 border-white">
                4
              </div>
              <h3 class="mt-2 mb-1 font-semibold text-white">Validez votre demande</h3>
              <p class="text-xs text-white/90 leading-snug">Soumettez votre demande en ligne. Notre équipe vous contactera rapidement.</p>
            </div>
            <!-- Step 5 -->
            <div class="flex flex-col items-center text-center px-2">
              <div class="w-14 h-14 bg-white text-[#534fa5] rounded-full flex items-center justify-center text-2xl font-bold mb-4 border-4 border-[#534fa5]">
                5
              </div>
              <h3 class="mt-2 mb-1 font-semibold text-white">Profitez de votre service 2P</h3>
              <p class="text-xs text-white/90 leading-snug">Nous réalisons vos services en adéquation avec votre demande, selon les modalités choisies.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Premium Products Section -->
    <section v-if="!loading && data?.premium && data.premium.length > 0" class="bg-gray-50 w-full py-16" id="catalogue2">
      <div class="container mx-auto px-4">
        <div class="sec-title">
          <h2 :class="`${colorClasses.text} text-center text-xl md:text-2xl font-semibold mb-8 capitalize`">
            Notre collection premium
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
            C'est Grâce à 
            <span :class="colorClasses.textLight">
              <img 
                :src="logoWhiteSmall" 
                alt="Immobilier au Maroc de particulier à particulier" 
                class="inline-block h-8 md:h-12 relative -top-1"
              />
            </span> 
            qu'ils ont pu vendre ou louer
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
          Annonces immobilières au Maroc de particulier à particulier
        </h2>
        <h3 class="text-xl md:text-2xl font-semibold mb-2">
          Annonces immobilières au Maroc sans intermédiaire
        </h3>
        <p class="text-gray-600 max-w-4xl mx-auto">
          Trouvez le logement de vos rêves sur 2P, le premier site marocain dédié à l'immobilier au Maroc de particulier à particulier, sans commission. Découvrez une large sélection d'annonces immobilières au Maroc, allant des appartements, villas, terrains, riads, maisons, plateaux de bureaux, locaux commerciaux, showrooms, fonds de commerce, duplex aux immeubles, et bien plus encore. Que vous cherchiez à acheter ou à louer des propriétés au Maroc, le site propose des options variées, allant de la vente à la location, ainsi que des locations de vacances et des propriétés neuves. Grâce à des annonces d'immobilier au Maroc constamment mises à jour, 2P vous offre une plateforme fiable, accessible partout au Maroc, dans des villes comme Agadir, Marrakech, Casablanca, Rabat, Tanger, Fès et d'autres encore. Les propriétaires, acheteurs et locataires bénéficient d'une solution avantageuse, sans frais d'agence, offrant ainsi une transparence totale et une expérience directe, sans intermédiaires.
        </p>
      </div>
    </section>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-20 bg-white">
      <div :class="`animate-spin rounded-full h-12 w-12 border-b-2 ${colorClasses.border}`"></div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTheme } from '../composables/useTheme'
import { homeService } from '../services/homeService'
import HeroSearch from '../components/HeroSearch.vue'
import ProductCard from '../components/ProductCard.vue'
import logoBlueSmall from '../assets/images/logos/logo-blue-small.svg'
import logoWhiteSmall from '../assets/images/logos/logo-white-small.svg'
const { colorClasses } = useTheme()

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

.step-item {
  position: relative;
  z-index: 1;
}

.progress-bar-container {
  z-index: 0;
}

.progress-line-main {
  width: 100%;
  height: 2px;
}

@media (max-width: 768px) {
  .progress-bar-container {
    display: none;
  }
}
</style>
