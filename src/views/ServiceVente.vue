<template>
  <div class="service-vente">
    <!-- Top Header Banner -->
    <section class="relative mt-20 mx-4 md:mx-auto max-w-7xl">
      <div
        class="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-4 px-8 rounded-t-3xl relative overflow-hidden">
        <div
          class="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-blue-400 to-transparent opacity-50 rounded-b-3xl">
        </div>
        <div class="relative z-10 text-center">
          <p class="text-lg md:text-xl font-semibold">{{ t('serviceVente.header.title') }}</p>
        </div>
      </div>
    </section>

    <!-- Hero Section -->
    <section class="relative py-16 mx-4 md:mx-auto max-w-7xl overflow-hidden">
      <!-- Sky Background -->
      <div class="absolute inset-0 hero-sky-background rounded-b-3xl"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center">
          <!-- Premium Title Banner -->
          <div class="inline-block relative mb-6">
            <div
              class="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-8 py-4 rounded-lg shadow-2xl transform -rotate-1 border-2 border-yellow-400">
              <div class="flex items-center gap-3 transform rotate-1">
                <svg class="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <h1 class="text-3xl md:text-4xl font-bold">
                  <span class="font-serif italic">{{ t('serviceVente.hero.particulier') }}</span>
                  <span class="font-bold ml-2">{{ t('serviceVente.hero.premium') }}</span>
                </h1>
              </div>
            </div>
          </div>
          <!-- Tagline -->
          <p class="text-yellow-500 font-bold text-lg md:text-xl uppercase mb-8">
            {{ t('serviceVente.hero.tagline') }}
          </p>
          <!-- Property Illustration -->
          <div class="max-w-4xl mx-auto mb-8">
            <div class="bg-white rounded-xl shadow-xl p-8 relative">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                <!-- For Sale House -->
                <div class="text-center">
                  <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 mb-4 relative">
                    <div
                      class="absolute top-2 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                      {{ t('serviceVente.hero.forSale') }}
                    </div>
                    <svg class="w-24 h-24 mx-auto text-blue-600 mt-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  </div>
                </div>
                <!-- Center Buildings -->
                <div class="text-center">
                  <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6">
                    <svg class="w-32 h-32 mx-auto text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  </div>
                </div>
                <!-- For Rent House -->
                <div class="text-center">
                  <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 mb-4 relative">
                    <div
                      class="absolute top-2 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                      {{ t('serviceVente.hero.forRent') }}
                    </div>
                    <svg class="w-24 h-24 mx-auto text-orange-600 mt-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="container mx-auto px-4 py-16">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center justify-center gap-3 mb-8">
          <svg class="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900">{{ t('serviceVente.benefits.title') }}</h2>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-8">
          <ul class="space-y-4">
            <li class="flex items-start gap-4">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <span class="text-gray-700 text-lg">{{ t('serviceVente.benefits.feature1') }}</span>
            </li>
            <li class="flex items-start gap-4">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <span class="text-gray-700 text-lg">{{ t('serviceVente.benefits.feature2') }}</span>
            </li>
            <li class="flex items-start gap-4">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <span class="text-gray-700 text-lg">{{ t('serviceVente.benefits.feature3') }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="container mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{{ t('serviceVente.pricing.title') }}</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <!-- Premium Plan -->
        <div class="bg-white rounded-xl shadow-xl overflow-hidden border-2 border-gray-200">
          <div class="bg-green-600 text-white py-4 px-6 rounded-t-xl">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <h3 class="text-xl font-bold">{{ t('serviceVente.pricing.premium.name') }}</h3>
            </div>
          </div>
          <div class="p-8">
            <div class="text-center mb-6">
              <div class="text-5xl font-bold text-gray-900 mb-2">{{ t('serviceVente.pricing.premium.price') }}</div>
              <div class="text-gray-600">{{ t('serviceVente.pricing.premium.period') }}</div>
            </div>
            <ul class="space-y-4 mb-8">
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ t('serviceVente.pricing.premium.feature1') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ t('serviceVente.pricing.premium.feature2') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ t('serviceVente.pricing.premium.feature3') }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Premium PLUS Plan -->
        <div class="bg-white rounded-xl shadow-xl overflow-hidden border-2 border-yellow-400 relative">
          <!-- Most Requested Banner -->
          <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div class="bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-bold text-sm shadow-lg">
              {{ t('serviceVente.pricing.premiumPlus.badge') }}
            </div>
          </div>
          <div class="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-4 px-6 rounded-t-xl mt-4">
            <div class="flex items-center gap-3">
              <svg class="w-8 h-8 text-yellow-200" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <h3 class="text-xl font-bold">{{ t('serviceVente.pricing.premiumPlus.name') }}</h3>
            </div>
          </div>
          <div class="p-8">
            <div class="text-center mb-6">
              <div class="text-5xl font-bold text-gray-900 mb-2">{{ t('serviceVente.pricing.premiumPlus.price') }}</div>
              <div class="text-gray-600">{{ t('serviceVente.pricing.premiumPlus.period') }}</div>
            </div>
            <ul class="space-y-4 mb-8">
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ t('serviceVente.pricing.premiumPlus.feature1') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ t('serviceVente.pricing.premiumPlus.feature2') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ t('serviceVente.pricing.premiumPlus.feature3') }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom CTA Section -->
    <section class="relative mx-4 md:mx-auto max-w-7xl mb-8">
      <div
        class="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-12 px-8 rounded-3xl relative overflow-hidden">
        <div
          class="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-blue-400 to-transparent opacity-50 rounded-t-3xl">
        </div>
        <div class="relative z-10 text-center">
          <h2 class="text-2xl md:text-3xl font-bold mb-6">
            {{ t('serviceVente.cta.title') }}
            <span class="font-extrabold">{{ t('serviceVente.cta.highlight') }}</span>
            {{ t('serviceVente.cta.with') }}
            <span class="text-blue-300">2P</span><span class="text-white">.ma</span>
          </h2>
          <div class="flex flex-wrap justify-center gap-6 mb-8">
            <div class="flex items-center gap-2">
              <svg class="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd" />
              </svg>
              <span>{{ t('serviceVente.cta.guarantee1') }}</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd" />
              </svg>
              <span>{{ t('serviceVente.cta.guarantee2') }}</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd" />
              </svg>
              <span>{{ t('serviceVente.cta.guarantee3') }}</span>
            </div>
          </div>
          <button
            class="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-10 py-4 rounded-full font-bold text-lg uppercase shadow-2xl transition-all transform hover:scale-105">
            {{ t('serviceVente.cta.button') }}
          </button>
        </div>
      </div>
    </section>

    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-4 my-8">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { serviceService } from '../services/serviceService'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
const data = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    loading.value = true
    error.value = null
    const response = await serviceService.getServiceData('service-vente')
    data.value = response.data
  } catch (err) {
    console.error('Error loading service data:', err)
    error.value = err.response?.data?.message || err.message || 'Failed to load service data'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.service-vente {
  min-height: 100vh;
}

.hero-sky-background {
  background: linear-gradient(to bottom,
      #87CEEB 0%,
      #87CEEB 60%,
      #E0F2FE 60%,
      #E0F2FE 100%);
  position: relative;
}

.hero-sky-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60%;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.8) 3px, transparent 3px),
    radial-gradient(circle at 60% 20%, rgba(255, 255, 255, 0.6) 4px, transparent 4px),
    radial-gradient(circle at 80% 40%, rgba(255, 255, 255, 0.7) 3px, transparent 3px),
    radial-gradient(circle at 40% 50%, rgba(255, 255, 255, 0.5) 2px, transparent 2px);
  background-size: 120px 120px, 150px 150px, 100px 100px, 130px 130px;
  background-position: 0 0, 50px 30px, 100px 60px, 200px 20px;
}
</style>
