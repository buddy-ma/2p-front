<template>
  <div class="error-page">
    <!-- Hero Section with Background -->
    <section 
      class="w-full bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${bgImage})` }"
    >
      <div class="bg-black bg-opacity-50">
        <div class="container mx-auto px-4">
          <div class="text-center text-white py-20 md:py-32 md:px-36 px-5">
            <h2 class="text-2xl text-center text-white capitalize font-medium mb-5">
              {{ t('error410.title') }}
            </h2>
          </div>
        </div>
      </div>
    </section>

    <!-- Error Content -->
    <div class="container max-w-6xl mx-auto px-4 relative -mt-5">
      <div class="w-full">
        <div class="w-full text-center mb-16">
          <img 
            class="mx-auto max-w-full h-auto max-w-[40%] md:max-w-[40%] max-md:max-w-[80%]" 
            src="../assets/images/svgs/500.svg"
            :alt="t('error410.title')" 
          />

          <h3 class="text-center mt-3 text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {{ t('error410.message') }}
          </h3>
          <p class="text-center mt-3 text-gray-600 dark:text-gray-400 px-4 md:px-16">
            {{ t('error410.description') }}
          </p>
        </div>

        <!-- Navigation Cards -->
        <div class="flex flex-wrap justify-center items-center gap-4 mt-3">
          <div 
            class="shadow-none border-none cursor-pointer transition-transform duration-200 hover:-translate-y-1 h-full" 
            @click="navigateTo('/immobilier-a-vendre')"
          >
            <img 
              src="../assets/images/bgs/immobilier-Maroc-2P.webp" 
              class="max-h-[200px] object-cover rounded-[10px] transition-all duration-300 hover:scale-105 w-full" 
              :alt="t('navigation.sell')"
            >
            <h5 class="text-center mt-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
              {{ t('navigation.sell') }}
            </h5>
          </div>

          <div 
            class="shadow-none border-none cursor-pointer transition-transform duration-200 hover:-translate-y-1 h-full" 
            @click="navigateTo('/location-immobiliere')"
          >
            <img 
              src="../assets/images/bgs/Location-Immobilière-Maroc-2P.webp" 
              class="max-h-[200px] object-cover rounded-[10px] transition-all duration-300 hover:scale-105 w-full"
              :alt="t('navigation.rentProperty')"
            >
            <h5 class="text-center mt-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
              {{ t('navigation.rentProperty') }}
            </h5>
          </div>

          <div 
            class="shadow-none border-none cursor-pointer transition-transform duration-200 hover:-translate-y-1 h-full" 
            @click="navigateTo('/immobilier-neuf')"
          >
            <img 
              src="../assets/images/bgs/Immobilier-Neuf-Maroc-2p.webp" 
              class="max-h-[200px] object-cover rounded-[10px] transition-all duration-300 hover:scale-105 w-full"
              :alt="t('navigation.newProperty')"
            >
            <h5 class="text-center mt-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
              {{ t('navigation.newProperty') }}
            </h5>
          </div>

          <div 
            class="shadow-none border-none cursor-pointer transition-transform duration-200 hover:-translate-y-1 h-full" 
            @click="navigateTo('/location-vacances')"
          >
            <img 
              src="../assets/images/bgs/Location-vacances-Maroc-2p.webp" 
              class="max-h-[200px] object-cover rounded-[10px] transition-all duration-300 hover:scale-105 w-full"
              :alt="t('navigation.vacationRental')"
            >
            <h5 class="text-center mt-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
              {{ t('navigation.vacationRental') }}
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from '../composables/useI18n'
import bgImage from '../assets/images/bgs/immobilier-Maroc-2P.webp'

defineOptions({
  name: 'Gone410',
  seo: {
    titleKey: 'error410.meta.title',
    descriptionKey: 'error410.meta.description'
  }
})

const router = useRouter()
const { t } = useI18n()

const navigateTo = (path) => {
  router.push(path)
}
</script>
