<template>
  <div class="tarifs">
    <!-- Pricing Section -->
    <section class="container mx-auto px-4 py-16 mt-20">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <!-- Pack Premium -->
        <div class="bg-white rounded-xl shadow-xl overflow-hidden border-2 border-orange-400 relative">
          <!-- Discount Badge -->
          <div class="absolute top-4 left-4 z-10">
            <div class="bg-red-500 text-white rounded-full px-4 py-2 text-xs font-bold shadow-lg">
              -30% {{ t('tarifs.premium.discountBadge') }}
            </div>
          </div>
          <!-- Header -->
          <div class="bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-4 px-6 relative">
            <div class="flex items-center gap-3">
              <svg class="w-8 h-8 text-yellow-200" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <h3 class="text-2xl font-bold">{{ t('tarifs.premium.name') }}</h3>
            </div>
            <!-- Launch Offer Banner -->
            <div class="mt-2 bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-semibold inline-block">
              -30% {{ t('tarifs.launchOffer') }}
            </div>
          </div>
          <div class="p-8">
            <!-- Pricing -->
            <div class="text-center mb-6">
              <div class="text-gray-400 line-through mb-2">{{ t('tarifs.premium.originalPrice') }}</div>
              <div class="text-5xl font-bold text-orange-600 mb-2">{{ t('tarifs.premium.discountedPrice') }}</div>
              <div class="text-gray-600 text-sm">{{ t('tarifs.premium.period') }}</div>
            </div>
            <!-- Features -->
            <ul class="space-y-4 mb-6">
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ t('tarifs.premium.feature1') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ t('tarifs.premium.feature2') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ t('tarifs.premium.feature3') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ t('tarifs.premium.feature4') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700 font-semibold">{{ t('tarifs.premium.feature5') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ t('tarifs.premium.feature6') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ t('tarifs.premium.feature7') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span class="text-white text-xs font-bold">360°</span>
                </div>
                <span class="text-gray-700">{{ t('tarifs.premium.feature8') }}</span>
              </li>
            </ul>
            <!-- Special Note -->
            <div class="mb-6 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <p class="text-sm text-gray-700">
                {{ t('tarifs.premium.beyondNote') }} <span class="font-bold">{{ t('tarifs.premium.requestQuote')
                  }}</span>
              </p>
            </div>
            <!-- CTA Button -->
            <button
              class="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-bold text-lg transition-colors shadow-lg flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              {{ t('tarifs.subscribe') }}
            </button>
          </div>
        </div>

        <!-- Pack Basic -->
        <div class="bg-white rounded-xl shadow-xl overflow-hidden border-2 border-green-400 relative">
          <!-- Header -->
          <div class="bg-green-600 text-white py-4 px-6 relative">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold">{{ t('tarifs.basic.name') }}</h3>
            </div>
            <!-- Launch Offer Banner -->
            <div class="mt-2 bg-green-700 text-white px-4 py-1 rounded-full text-sm font-semibold inline-block">
              -30% {{ t('tarifs.launchOffer') }}
            </div>
          </div>
          <div class="p-8">
            <!-- Pricing -->
            <div class="text-center mb-6">
              <div class="text-gray-400 line-through mb-2">{{ t('tarifs.basic.originalPrice') }}</div>
              <div class="text-5xl font-bold text-green-600 mb-2">{{ t('tarifs.basic.discountedPrice') }}</div>
              <div class="text-gray-600 text-sm">{{ t('tarifs.basic.period') }}</div>
            </div>
            <!-- Features -->
            <ul class="space-y-4 mb-6">
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ t('tarifs.basic.feature1') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ t('tarifs.basic.feature2') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ t('tarifs.basic.feature3') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ t('tarifs.basic.feature4') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ t('tarifs.basic.feature5') }}</span>
              </li>
            </ul>
            <!-- Excluded Features -->
            <div class="mb-6 border-t pt-4">
              <p class="text-gray-500 text-sm font-semibold mb-3">{{ t('tarifs.basic.excludedTitle') }}</p>
              <ul class="space-y-3">
                <li class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd" />
                  </svg>
                  <span class="text-gray-600">{{ t('tarifs.basic.excluded1') }}</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd" />
                  </svg>
                  <span class="text-gray-600">{{ t('tarifs.basic.excluded2') }}</span>
                </li>
              </ul>
            </div>
            <!-- CTA Button -->
            <button
              class="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-bold text-lg transition-colors shadow-lg">
              {{ t('tarifs.subscribe') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Footer Note -->
      <div class="max-w-6xl mx-auto mt-8">
        <div class="bg-blue-50 rounded-xl p-6 text-center">
          <p class="text-gray-600 text-sm mb-4">
            <span class="font-semibold">*</span>{{ t('tarifs.footer.offerNote') }}
          </p>
          <div class="flex items-center justify-center gap-3">
            <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <p class="text-gray-700">
              {{ t('tarifs.footer.moreThan50') }}
              <a href="/contact" class="text-blue-600 font-bold underline">{{ t('tarifs.footer.contactUs') }}</a>
              {{ t('tarifs.footer.customQuote') }}
            </p>
          </div>
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
    const response = await serviceService.getServiceData('tarifs')
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
.tarifs {
  min-height: 100vh;
}
</style>
