<template>
  <div class="service-vente bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen pt-0">
    <!-- Top Header Banner -->
    <section class="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-3">
      <div class="container mx-auto px-4 text-center">
        <p class="text-sm md:text-base font-semibold tracking-wide uppercase">{{ t('serviceVente.header.title') }}</p>
      </div>
    </section>

    <!-- Hero Section -->
    <section class="relative py-12 lg:py-16 px-4 overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl z-0"></div>
      <div class="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl z-0"></div>

      <div class="container mx-auto max-w-6xl relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-8">
          <div
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold mb-6 text-sm shadow-sm border border-blue-500 dark:border-blue-400">
            <span class="relative flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            {{ t('serviceVente.hero.tagline') }}
          </div>

          <h1 class="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            {{ t('serviceVente.hero.particulier') }}
            <span class="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {{ t('serviceVente.hero.premium') }}
            </span>
          </h1>
        </div>

        <div class="relative max-w-7xl mx-auto">
          <div
            class="aspect-[21/10] bg-gray-200 dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700 relative">
            <img
              src="..\assets\images\immobilier\AdobeStock_866670044-scaled-1-rdz82sevntammi6n8w0rhahhqv9z8psixo5svil09c.jpg"
              alt="Particulier Premium" class="w-full h-full object-cover" />
            <div
              class="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex items-end p-8 justify-between">
              <h3 class="text-white text-xl md:text-2xl font-bold max-w-xl">
                {{ t('serviceVente.benefits.title') }}
              </h3>
              <p class="text-white text-sm md:text-base float-right">
                <span class="mr-4">{{ t('serviceVente.hero.forSale') }}</span>
                |
                <span class="ml-4">{{ t('serviceVente.hero.forRent') }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Grid -->
    <section class="py-24 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="text-center mb-16">
          <span class="text-blue-600 font-semibold tracking-wider uppercase text-sm mb-2 block">Nos Avantages</span>
          <h2 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
            {{ t('serviceVente.benefits.title') }}
          </h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="i in 3" :key="i"
            class="bg-blue-50/50 dark:bg-gray-800/50 p-8 rounded-3xl border border-blue-100/50 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors duration-300">
            <div
              class="w-12 h-12 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 shadow-sm">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"
                  v-if="i === 1"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  v-else-if="i === 2"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  v-else></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {{ t(`serviceVente.benefits.feature${i}`).split('&')[0] }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              {{ t(`serviceVente.benefits.feature${i}`).split('&')[1] }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="py-24 bg-gray-50/50 dark:bg-gray-800/20">
      <div class="container mx-auto px-4 max-w-5xl">
        <div class="text-center mb-16">
          <span class="text-blue-600 font-semibold tracking-wider uppercase text-sm mb-2 block">Tarifs</span>
          <h2 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {{ t('serviceVente.pricing.title') }}
          </h2>
        </div>

        <div class="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
          <!-- Premium Plan -->
          <div
            class="bg-white dark:bg-gray-800 rounded-[2rem] p-10 border border-gray-100 dark:border-gray-700 shadow-sm relative z-10 hover:shadow-md transition-shadow">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ t('serviceVente.pricing.premium.name')
            }}</h3>
            <div class="flex items-baseline gap-1 mb-8">
              <span class="text-4xl font-extrabold text-gray-900 dark:text-white">{{
                t('serviceVente.pricing.premium.price') }}</span>
              <span class="text-gray-500 font-medium text-sm">{{ t('serviceVente.pricing.premium.period') }}</span>
            </div>

            <button
              class="w-full py-3 mb-8 bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 text-blue-600 dark:text-blue-400 rounded-xl font-semibold transition-colors">
              Commencer
            </button>

            <div class="space-y-4">
              <p class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Inclus dans ce pack :</p>
              <div v-for="i in 3" :key="i" class="flex items-start gap-3">
                <div
                  class="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{
                    t(`serviceVente.pricing.premium.feature${i}`).split('&')[0] }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Premium PLUS Plan -->
          <div
            class="bg-blue-600 rounded-[2rem] p-10 text-white shadow-xl relative z-20 md:-ml-4 transform md:scale-105 border-4 border-white dark:border-gray-900">
            <h3 class="text-xl font-bold mb-2 flex items-center justify-between">
              {{ t('serviceVente.pricing.premiumPlus.name') }}
              <span
                class="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold border border-blue-400">Recommandé</span>
            </h3>
            <div class="flex items-baseline gap-1 mb-8">
              <span class="text-4xl font-extrabold">{{ t('serviceVente.pricing.premiumPlus.price') }}</span>
              <span class="text-blue-200 font-medium text-sm">{{ t('serviceVente.pricing.premiumPlus.period') }}</span>
            </div>

            <button
              class="w-full py-3 mb-8 bg-white hover:bg-blue-50 text-blue-600 rounded-xl font-semibold transition-colors shadow-sm">
              Choisir Premium Plus
            </button>

            <div class="space-y-4">
              <p class="text-sm font-semibold text-white mb-4">Tout ce qui est inclus, plus :</p>
              <div v-for="i in 3" :key="i" class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-white">{{
                    t(`serviceVente.pricing.premiumPlus.feature${i}`).split('&')[0] }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom CTA -->
    <section class="py-24 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div
          class="mx-auto bg-blue-600 rounded-[2rem] p-12 md:p-16 text-center text-white shadow-xl relative overflow-hidden">
          <div class="relative z-10">
            <h2 class="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              {{ t('serviceVente.cta.title') }}
              <span class="block text-blue-200">{{ t('serviceVente.cta.highlight') }}</span>
            </h2>
            <p class="text-lg text-blue-100 mb-10">
              {{ t('serviceVente.cta.with') }} 2P.ma
            </p>

            <button
              class="bg-white text-blue-600 hover:bg-blue-50 px-10 py-4 rounded-xl font-bold text-lg shadow-md transition-transform hover:-translate-y-1">
              {{ t('serviceVente.cta.button') }}
            </button>

            <div class="flex flex-wrap justify-center gap-6 mt-10">
              <div v-for="i in 3" :key="i" class="flex items-center gap-2 text-blue-100 text-sm font-medium">
                <svg class="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>{{ t(`serviceVente.cta.guarantee${i}`) }}</span>
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

defineOptions({
  name: 'ServiceVente',
  seo: {
    titleKey: 'serviceVente.meta.title',
    descriptionKey: 'serviceVente.meta.description',
    image: '/assets/images/immobilier/immobilier-de-particulier-a-particulier-maroc.webp'
  }
})

const { t } = useI18n()
</script>
