<template>
  <div class="service-promoteur bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-5">
    <!-- Hero Section (aligned with ServiceVacances style) -->
    <section
      class="relative pb-16 overflow-hidden min-h-[80vh] bg-no-repeat bg-cover pt-20 rounded-2xl flex items-center"
      :style="{
        backgroundImage: 'url(' + heroImageUrl + ')',
        backgroundPosition: 'center top'
      }">
      <!-- Background image overlay -->
      <div class="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900/10 bg-cover bg-center z-0">
      </div>

      <div class="flex justify-center items-start md:flex-col pl-24 h-full gap-10">

        <div class="max-w-5xl relative z-10 text-left">
          <span
            class="inline-block py-1 px-3 rounded-full bg-green-800 text-white font-semibold tracking-wider text-xs md:text-sm mb-4 border border-green-400/40">
            {{ t('servicePromoteur.meta.title') }}
          </span>

          <h1 class="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white mb-4">
            {{ t('servicePromoteur.tarifs.title') }}
          </h1>

          <p class="text-base md:text-lg lg:text-xl text-white max-w-3xl pb-5">
            {{ t('servicePromoteur.tarifs.description') }}
          </p>
          <div class="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-sm md:text-base font-medium">
            <div class="flex items-center gap-2 text-gray-200 dark:text-gray-100">
              <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-700">
                <Star class="w-4 h-4" />
              </span>
              <span>Jusqu’à 50 annonces promues</span>
            </div>
            <div class="flex items-center gap-2 text-gray-200 dark:text-gray-100">
              <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-700">
                <Percent class="w-4 h-4" />
              </span>
              <span>Visibilité renforcée & statistiques</span>
            </div>
          </div>
          <button
            class="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold text-sm md:text-base transition-colors shadow-md mt-10 group">
            {{ t('servicePromoteur.tarifs.subscribe') }}
            <ArrowRight class="w-4 h-4 inline-block ml-2 group-hover:translate-x-2 transition-all duration-300" />
          </button>

        </div>
      </div>
    </section>

    <!-- Benefits / Why Choose Section (styled like ServiceVacances) -->
    <section class="py-24 bg-white dark:bg-gray-900 relative text-center">
      <div
        class="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:20px_20px] opacity-40 -z-10">
      </div>

      <div class="container mx-auto px-4 max-w-6xl">
        <div class="mb-16">
          <span class="text-green-600 font-semibold tracking-wider uppercase text-sm mb-2 block">
            {{ t('servicePromoteur.meta.title') }}
          </span>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            {{ t('servicePromoteur.tarifs.title') }}
          </h2>
          <p class="mt-4 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {{ t('servicePromoteur.tarifs.description') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div v-for="(featureIndex, idx) in benefitsFeatures" :key="featureIndex"
            class="bg-white dark:bg-gray-800 p-8 rounded-[1.5rem] border border-gray-100 dark:border-gray-700 hover:border-green-500 transition-all text-center">
            <div
              class="w-12 h-12 bg-green-50 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-6 text-green-600 dark:text-green-400 mx-auto">
              <component :is="benefitIcons[idx]" class="w-6 h-6" />
            </div>
            <p class="text-xs font-semibold tracking-wide uppercase text-green-600 dark:text-green-300 mb-2">
              {{ t('servicePromoteur.meta.title') }}
            </p>
            <h3 class="text-gray-900 dark:text-white font-semibold text-base md:text-lg leading-relaxed">
              {{ t(`servicePromoteur.tarifs.premium.feature${featureIndex}`) }}
            </h3>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="py-24 bg-gray-50/50 dark:bg-gray-800/20 relative overflow-hidden">
      <!-- Background Accents -->
      <div
        class="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent dark:from-gray-900/50 -z-10">
      </div>

      <div class="container mx-auto px-4 max-w-5xl">
        <div class="text-center mb-16">
          <div
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 text-sm font-semibold text-gray-600 dark:text-gray-300 mb-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
              </path>
            </svg>
            Plans Professionnels
          </div>
          <h2 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Choisissez votre formule
          </h2>
        </div>

        <div class="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-6 lg:gap-8 max-w-4xl mx-auto">

          <!-- Basic Plan -->
          <div
            class="w-full md:w-[45%] bg-white dark:bg-gray-800 rounded-[2rem] p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">{{ t('servicePromoteur.tarifs.basic.name')
            }}</h3>
            <div class="flex items-baseline gap-1 mt-4 mb-8">
              <span class="text-xl lg:text-3xl font-extrabold text-gray-900 dark:text-white">{{
                t('servicePromoteur.tarifs.basic.originalPrice') }}</span>
              <span class="text-gray-500 font-medium text-sm">{{ t('servicePromoteur.tarifs.basic.period') }}</span>
            </div>

            <button
              class="w-full py-3.5 mb-8 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 rounded-xl font-semibold transition-colors">
              {{ t('servicePromoteur.tarifs.subscribe') }}
            </button>

            <div class="space-y-6">
              <p class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Ce qui est inclus
              </p>
              <ul class="space-y-4">
                <li v-for="i in 5" :key="i" class="flex items-start gap-3 text-gray-600 dark:text-gray-400 text-sm">
                  <div
                    class="w-5 h-5 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg class="w-3 h-3 text-green-500 dark:text-green-400" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span>{{ t(`servicePromoteur.tarifs.basic.feature${i}`) }}</span>
                </li>
              </ul>

              <div class="pt-6 border-t border-gray-100 dark:border-gray-700">
                <ul class="space-y-4">
                  <li v-for="i in 2" :key="i" class="flex items-start gap-3 opacity-60 text-sm">
                    <div
                      class="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg class="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12">
                        </path>
                      </svg>
                    </div>
                    <span class="text-gray-600 dark:text-gray-400">{{ t(`servicePromoteur.tarifs.basic.excluded${i}`)
                    }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Premium Plan -->
          <div
            class="w-full md:w-[50%] bg-green-600 rounded-[2.5rem] p-8 lg:p-10 text-white shadow-2xl relative transform md:scale-105 border-4 border-white dark:border-gray-900">
            <div class="absolute top-6 right-8">
              <span
                class="bg-green-500 text-white text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wide border border-green-400">
                Recommandé
              </span>
            </div>

            <h3 class="text-xl font-bold text-green-50 mb-2">{{ t('servicePromoteur.tarifs.premium.name') }}</h3>
            <div class="flex items-baseline gap-1 mt-4 mb-8">
              <span class="text-xl lg:text-3xl font-extrabold text-white">{{
                t('servicePromoteur.tarifs.premium.originalPrice') }}</span>
              <span class="text-green-200 font-medium text-sm">{{ t('servicePromoteur.tarifs.premium.period') }}</span>
            </div>

            <button
              class="w-full py-3.5 mb-8 bg-white hover:bg-green-50 text-green-700 rounded-xl font-bold transition-colors shadow-sm">
              {{ t('servicePromoteur.tarifs.subscribe') }}
            </button>

            <div class="space-y-6">
              <p class="text-sm font-semibold text-white uppercase tracking-wider">Tout ce qui est inclus, plus :</p>
              <ul class="space-y-4">
                <li v-for="i in 8" :key="i" class="flex items-start gap-3 text-green-50 text-sm">
                  <div class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span>{{ t(`servicePromoteur.tarifs.premium.feature${i}`) }}</span>
                </li>
              </ul>

              <div class="mt-8 pt-6 border-t border-green-500/50 text-center">
                <p class="text-sm text-green-200 mb-2">{{ t('servicePromoteur.tarifs.premium.beyondNote') }}</p>
                <router-link to="/contact"
                  class="text-white hover:text-green-100 font-semibold underline decoration-green-400 underline-offset-4 transition-colors text-sm">
                  {{ t('servicePromoteur.tarifs.premium.requestQuote') }}
                </router-link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { useI18n } from '../composables/useI18n'
import { LineChart, MapPin, Building2, Star, Percent, ArrowRight } from 'lucide-vue-next'

defineOptions({
  name: 'ServicePromoteur',
  seo: {
    titleKey: 'servicePromoteur.meta.title',
    descriptionKey: 'servicePromoteur.meta.description',
    image: '/assets/images/immobilier/immobilier-de-particulier-a-particulier-maroc.webp'
  }
})

const { t } = useI18n()

// Use 3 key premium features as benefit cards
const benefitsFeatures = [2, 3, 4]
const benefitIcons = [LineChart, MapPin, Building2]

import heroImageUrl from '../assets/images/immobilier/lx-31.jpeg'

</script>
