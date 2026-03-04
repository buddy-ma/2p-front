<template>
  <div class="service-vacances bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <!-- Hero Section -->
    <section class="relative pb-16 overflow-hidden min-h-screen bg-no-repeat bg-cover pt-20" :style="{
      backgroundImage: 'url(' + heroImageUrl + ')',
      backgroundPosition: 'center bottom'
    }">

      <div class="container mx-auto px-4 max-w-4xl text-center relative z-10 mb-6">
        <h1
          class="text-xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white mb-6">
          {{ t('serviceVacances.hero.titlePart1') }}
          <span class="text-orange-600 dark:text-orange-400 block mt-2">
            {{ t('serviceVacances.hero.titleHighlight') }}
          </span>
        </h1>
        <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {{ t('serviceVacances.hero.subtitle') }}
        </p>
      </div>

      <!-- Overlapping Image and Search/CTA Container -->
      <div class="container mx-auto px-4 max-w-6xl relative z-10 mt-0">
        <!-- Floating CTA / Search-like Bar overlapping the image -->
        <div class="flex justify-center items-center z-20">
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col md:flex-row items-center justify-between gap-4 border border-gray-100 dark:border-gray-700">
            <div class="flex items-center gap-4 px-4 w-full justify-center md:justify-start">
              <div class="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                {{ t('serviceVacances.hero.feature1') }}
              </div>
              <div class="w-px h-6 bg-gray-200 dark:bg-gray-700 hidden md:block"></div>
              <div class="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                {{ t('serviceVacances.hero.feature2') }}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

    <!-- Problem/Solution Section (Inspired by "What we do") -->
    <section class="py-24 bg-white dark:bg-gray-900 relative text-center">
      <!-- Subtle dot pattern background -->
      <div
        class="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:20px_20px] opacity-50 -z-10">
      </div>

      <div class="container mx-auto px-4 max-w-6xl">
        <div class="mb-16">
          <span class="text-orange-600 font-semibold tracking-wider uppercase text-sm mb-2 block">Défis
            & Solutions</span>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            {{ t('serviceVacances.problems.title') }}
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div v-for="i in 6" :key="i"
            class="bg-white dark:bg-gray-800 p-8 rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-gray-700 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all text-center">
            <div
              class="w-12 h-12 bg-orange-50 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mb-6 text-orange-600 dark:text-orange-400 mx-auto">
              <component :is="problemIcons[i - 1]" class="w-6 h-6" />
            </div>

            <h3 class="text-gray-900 dark:text-white font-semibold text-base md:text-lg leading-relaxed">
              {{ t(`serviceVacances.problems.problem${i}`) }}
            </h3>
          </div>
        </div>

        <div class="mt-12 flex justify-center">
          <h3 class="text-md text-gray-500 dark:text-white">
            {{ t('serviceVacances.problems.solution') }}
          </h3>
        </div>
      </div>
    </section>

    <!-- Virtual Tour Section (Inspired by visual sections) -->
    <section class="py-24 bg-gray-50/50 dark:bg-gray-800/20 overflow-hidden relative">
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="flex flex-col lg:flex-row items-center gap-16">
          <div class="w-full lg:w-1/2 order-2 lg:order-1 relative">
            <!-- Modern stacked image look -->
            <div
              class="aspect-[4/3] bg-white dark:bg-gray-800 rounded-[2rem] p-3 shadow-xl border border-gray-100 dark:border-gray-700 relative z-10">
              <div class="w-full h-full rounded-[1.5rem] overflow-hidden relative group bg-gray-900">
                <div class="absolute inset-0 flex items-center justify-center z-10">
                  <div
                    class="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 cursor-pointer hover:bg-white/30 transition-all group-hover:scale-110">
                    <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"></path>
                    </svg>
                  </div>
                </div>
                <div class="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  :style="{ backgroundImage: 'url(' + virtualTourImg + ')' }">
                </div>
              </div>
            </div>

            <!-- Floating Decorative Card -->
            <div
              class="absolute -bottom-6 -right-6 lg:-right-12 bg-white dark:bg-gray-800 px-8 py-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 dark:border-gray-700 z-20">
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p class="text-gray-900 dark:text-white font-bold text-lg">{{ t('serviceVacances.virtualTour.valueProp')
                }}</p>
              </div>
            </div>
          </div>

          <div class="w-full lg:w-1/2 order-1 lg:order-2 space-y-8">
            <div class="mb-6">
              <span class="text-orange-600 font-semibold tracking-wider uppercase text-sm mb-2 block">Technologie
                3D</span>
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                {{ t('serviceVacances.virtualTour.title') }}
              </h2>
            </div>
            <p class="text-lg text-gray-600 dark:text-gray-400">
              {{ t('serviceVacances.virtualTour.subtitle') }}
            </p>
            <div class="space-y-6 mt-8">
              <div v-for="i in 3" :key="i" class="flex items-start gap-4">
                <div
                  class="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5">
                  <span class="font-bold text-sm">{{ i }}</span>
                </div>
                <p class="text-gray-700 dark:text-gray-300 pt-2 font-medium">{{
                  t(`serviceVacances.virtualTour.benefit${i}`) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section (Inspired by Choose The Perfect Plan) -->
    <section class="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      <!-- Background Accents -->
      <div
        class="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-gray-50/50 to-transparent dark:from-gray-800/20 -z-10">
      </div>

      <div class="container mx-auto px-4 max-w-5xl">
        <div class="text-center mb-16">
          <div
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 dark:bg-gray-800 text-sm font-semibold text-gray-600 dark:text-gray-300 mb-4 border border-gray-100 dark:border-gray-700">
            <svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
              </path>
            </svg>
            Pricing Plans
          </div>
          <h2 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {{ t('serviceVacances.plans.title') }}
          </h2>
        </div>

        <div class="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-6 lg:gap-8">

          <!-- Premium Plan (Left Card) -->
          <div
            class="w-full md:w-[45%] bg-white dark:bg-gray-800 rounded-[2rem] p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ t('serviceVacances.plans.premium.name')
            }}</h3>
            <div class="flex items-baseline gap-1 mb-8">
              <span class="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white">{{
                t('serviceVacances.plans.premium.price') }}</span>
              <span class="text-gray-500 font-medium text-sm">{{ t('serviceVacances.plans.premium.period') }}</span>
            </div>

            <button
              class="w-full py-3.5 mb-8 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 rounded-xl font-semibold transition-colors">
              {{ t('serviceVacances.plans.premium.cta') }}
            </button>

            <div class="space-y-4">
              <p class="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">What's
                included</p>
              <ul class="space-y-4">
                <li v-for="i in 6" :key="i" class="flex items-start gap-3 text-gray-600 dark:text-gray-400 text-sm">
                  <svg class="w-5 h-5 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{{ t(`serviceVacances.plans.premium.feature${i}`) }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Premium Super Plan (Right Card - Elevated/Dark) -->
          <div
            class="w-full md:w-[50%] bg-orange-600 rounded-[2.5rem] p-8 lg:p-10 text-white shadow-2xl relative transform md:scale-105 border-4 border-white dark:border-gray-900">
            <div class="absolute top-6 right-8">
              <span class="bg-orange-500 text-white text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wide">
                Recommended
              </span>
            </div>
            <h3 class="text-xl font-bold text-orange-100 mb-2">{{ t('serviceVacances.plans.premiumSuper.name') }}</h3>
            <div class="flex items-baseline gap-1 mb-8">
              <span class="text-4xl lg:text-5xl font-extrabold text-white">{{
                t('serviceVacances.plans.premiumSuper.price') }}</span>
              <span class="text-orange-200 font-medium text-sm">{{ t('serviceVacances.plans.premiumSuper.period')
              }}</span>
            </div>

            <button
              class="w-full py-3.5 mb-8 bg-white hover:bg-orange-50 text-orange-700 rounded-xl font-bold transition-colors shadow-sm">
              {{ t('serviceVacances.plans.premiumSuper.cta') }}
            </button>

            <div class="space-y-4">
              <p class="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Everything in premium, plus:</p>
              <ul class="space-y-4">
                <li v-for="i in 5" :key="i" class="flex items-start gap-3 text-orange-50 text-sm">
                  <svg class="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{{ t(`serviceVacances.plans.premiumSuper.feature${i}`) }}</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from '../composables/useI18n'
import {
  AlertCircle,
  MessageCircle,
  Image as ImageIcon,
  AlertTriangle,
  Users,
  Clock4
} from 'lucide-vue-next'
import heroImageUrl from '../assets/images/immobilier/hero_img_1.jpg'
import virtualTourImg from '../assets/images/immobilier/205-584x438.jpg'

defineOptions({
  name: 'ServiceVacances',
  seo: {
    titleKey: 'serviceVacances.meta.title',
    descriptionKey: 'serviceVacances.meta.description',
    image: '/assets/images/immobilier/immobilier-de-particulier-a-particulier-maroc.webp'
  }
})

const { t } = useI18n()

const problemIcons = [AlertCircle, MessageCircle, ImageIcon, AlertTriangle, Users, Clock4]
</script>
