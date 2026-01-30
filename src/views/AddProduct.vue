<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 relative">
    <div class="absolute h-64 inset-0 top-0 py-20 z-0" :style="{
      backgroundImage: `linear-gradient(-36deg,rgba(77,165,255,0.2) 0%,rgba(49,84,232,0.2) 100%), url(${bgImmobilierMaroc})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'top center',
      backgroundSize: 'cover'
    }">
    </div>
    <div class="container mx-auto px-4 max-w-4xl relative z-10">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <!-- Header -->
        <div class="border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ t('add-product.title') }}
          </h1>
          <button v-if="step1" type="button"
            :class="`px-4 py-2 rounded-lg ${colorClasses.bg} text-white ${colorClasses.hover} disabled:opacity-50`"
            :disabled="loading" @click="nextStep1">
            {{ t('add-product.buttons.next') }}
          </button>
        </div>

        <!-- Error Messages -->
        <div v-if="errors.length > 0"
          class="mx-6 mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p class="font-semibold text-red-800 dark:text-red-200">{{ t('add-product.errors.title') }}</p>
          <ul class="mt-2 list-disc list-inside text-red-700 dark:text-red-300">
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
          </ul>
        </div>

        <!-- Step Indicator -->
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 mx-auto">
          <div class="flex items-center justify-between">
            <div v-for="(step, index) in steps" :key="index" class="flex items-center flex-1">
              <div :class="[
                'flex items-center justify-center w-10 h-10 rounded-full border-2',
                step.active
                  ? `${colorClasses.bg} border-transparent text-white`
                  : 'border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'
              ]">
                {{ index + 1 }}
              </div>
              <div :class="isRTL ? 'mr-3' : 'ml-3'" class="hidden sm:block">
                <p :class="[
                  'text-sm font-medium',
                  step.active
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400'
                ]">
                  {{ step.title }}
                </p>
              </div>
              <div v-if="index < steps.length - 1" :class="[
                'flex-1 h-0.5 mx-4',
                step.active ? colorClasses.bg : 'bg-gray-300 dark:bg-gray-600'
              ]"></div>
            </div>
          </div>
        </div>

        <!-- Form Content -->
        <div class="p-6">
          <!-- Step 1: Product Details -->
          <div v-if="step1" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('add-product.form.category') }}
                </label>
                <select v-model.number="form.category"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required>
                  <option :value="null" disabled>{{ t('add-product.options.select_option') }}</option>
                  <option v-for="cat in translatedCategories" :key="`cat-${cat.id}`" :value="Number(cat.id)">
                    {{ cat.translatedTitle }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('add-product.form.type') }}
                </label>
                <select :key="`type-select-${form.category}`" v-model.number="form.type"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  @change="getExtras" required>
                  <option :value="null" disabled>{{ t('add-product.options.select_option') }}</option>
                  <option v-for="pt in validProductTypes" :key="`type-${pt.id}`" :value="Number(pt.id)">
                    {{ pt.translatedTitle || pt.title }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('add-product.form.title') }}
                </label>
                <input v-model="form.title" type="text"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('add-product.form.description') }}
              </label>
              <textarea v-model="form.description" rows="4"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('add-product.form.price_per') }}
                </label>
                <select v-model="form.prix_by"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="fix">{{ t('add-product.options.total') }}</option>
                  <option value="par metre">{{ t('add-product.options.per_m2') }}</option>
                  <option value="par jour">{{ t('add-product.options.per_day') }}</option>
                  <option value="par mois">{{ t('add-product.options.per_month') }}</option>
                  <option value="a partir de">{{ t('add-product.options.starting_from') }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('add-product.form.price') }}
                </label>
                <input v-model.number="form.prix" type="number"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('add-product.form.area_unit') }}
                </label>
                <select v-model="form.unite_surface"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="m²">{{ t('add-product.options.m2') }}</option>
                  <option value="hec">{{ t('add-product.options.hectare') }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('add-product.form.area') }}
                </label>
                <input v-model="form.surface" type="text"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('add-product.form.city') }}
                </label>
                <select v-model="form.ville"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  @change="getQuartiers" required>
                  <option value="">{{ t('add-product.options.select_city') }}</option>
                  <option v-for="ville in translatedVilles" :key="ville.id" :value="ville.title">
                    {{ ville.translatedTitle }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('add-product.form.neighborhood') }}
                </label>
                <select v-model="form.quartier"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="">{{ t('add-product.options.select_neighborhood') }}</option>
                  <option v-for="quartier in translatedQuartiers" :key="quartier.id" :value="quartier.title">
                    {{ quartier.translatedTitle }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('add-product.form.address') }}
                </label>
                <input v-model="form.address" type="text"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('add-product.form.bedrooms') }}
                </label>
                <input v-model.number="form.nbr_chambres" type="number"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('add-product.form.bathrooms') }}
                </label>
                <input v-model.number="form.nbr_salles_bain" type="number"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('add-product.form.living_rooms') }}
                </label>
                <input v-model.number="form.nbr_salons" type="number"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
              </div>
              <template v-if="form.category == 4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {{ t('add-product.form.adults') }}
                  </label>
                  <input v-model.number="form.nbr_adultes" type="number"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {{ t('add-product.form.children') }}
                  </label>
                  <input v-model.number="form.nbr_enfants" type="number"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
              </template>
            </div>

            <div v-if="productExtras && productExtras.length > 0">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('add-product.form.extras') }}
              </label>
              <div class="flex flex-wrap gap-2">
                <label v-for="extra in productExtras" :key="extra.id"
                  class="inline-flex items-center px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  :class="form.hasextras.includes(extra.title) ? colorClasses.bg + ' text-white border-transparent' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'">
                  <input v-model="form.hasextras" type="checkbox" :value="extra.title" class="sr-only" />
                  <span>{{ extra.title }}</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Step 2: Images -->
          <div v-if="step2" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('add-product.image_upload.drag_drop') }}
              </label>
              <file-pond ref="filePondInstance" name="images" :files="filePondFiles" @addfile="handleFilePondAddFile"
                @removefile="handleFilePondRemoveFile" @reorderfiles="handleFilePondReorder" allow-multiple
                max-files="10" accepted-file-types="image/*" image-preview-height="200" image-resize-target-width="1920"
                image-resize-target-height="1080" image-resize-mode="contain" image-resize-upscale="false"
                :label-idle="t('add-product.image_upload.drag_drop')"
                :label-file-loading="t('add-product.image_upload.loading')"
                :label-file-processing="t('add-product.image_upload.processing')"
                :label-file-processing-complete="t('add-product.image_upload.complete')"
                :label-file-processing-error="t('add-product.image_upload.error')"
                :label-tap-to-cancel="t('add-product.image_upload.cancel')"
                :label-tap-to-retry="t('add-product.image_upload.retry')"
                :label-tap-to-undo="t('add-product.image_upload.undo')"
                :label-file-remove-error="t('add-product.image_upload.remove_error')"
                :label-file-type-not-allowed="t('add-product.image_upload.invalid_type')"
                :label-file-size-too-small="t('add-product.image_upload.too_small')"
                :label-file-size-too-large="t('add-product.image_upload.too_large')"
                :label-max-file-size-exceeded="t('add-product.image_upload.max_size')"
                :label-max-files-exceeded="t('add-product.image_upload.max_files')" class="filepond-wrapper" />
            </div>

            <div v-if="imagePreviews.length > 0" class="mt-6">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('add-product.image_upload.select_default') }}
              </label>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="(img, index) in imagePreviews" :key="index" class="relative group">
                  <div class="cursor-pointer" @click="selectImage(index)">
                    <img :src="img.url" class="w-full h-48 object-cover rounded-lg border-2 transition-all"
                      :class="selectedImg === index ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'"
                      alt="Preview" />
                    <div v-if="selectedImg === index"
                      class="absolute inset-0 bg-blue-500 bg-opacity-50 rounded-lg flex items-center justify-center pointer-events-none">
                      <span class="text-white font-semibold">{{ t('add-product.image_upload.default') }}</span>
                    </div>
                  </div>
                  <button type="button" @click.stop="removeImage(index)" :class="[
                    'absolute top-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-all',
                    isRTL ? 'left-2' : 'right-2',
                    'opacity-90 hover:opacity-100 z-10'
                  ]" :aria-label="t('add-product.image_upload.delete')">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: User Information -->
          <div v-if="step3" class="space-y-6">
            <div class="flex gap-2 mb-6">
              <button :class="[
                'flex-1 px-4 py-2 rounded-lg border-2',
                loginType === 'login'
                  ? colorClasses.bg + ' text-white border-transparent'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'
              ]" @click="loginType = 'login'" type="button">
                {{ t('add-product.buttons.login') }}
              </button>
              <button :class="[
                'flex-1 px-4 py-2 rounded-lg border-2',
                loginType === 'register'
                  ? colorClasses.bg + ' text-white border-transparent'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'
              ]" @click="loginType = 'register'" type="button">
                {{ t('add-product.buttons.register') }}
              </button>
            </div>

            <!-- Registration Form -->
            <template v-if="loginType === 'register'">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {{ t('add-product.form.first_name') }}
                  </label>
                  <input v-model="userForm.firstname" type="text"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {{ t('add-product.form.last_name') }}
                  </label>
                  <input v-model="userForm.lastname" type="text"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {{ t('add-product.form.phone') }}
                  </label>
                  <input v-model="userForm.phone" type="text"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {{ t('add-product.form.email') }}
                  </label>
                  <input v-model="userForm.email" type="email"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {{ t('add-product.form.password') }}
                  </label>
                  <input v-model="userForm.password" type="password"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {{ t('add-product.form.confirm_password') }}
                  </label>
                  <input v-model="userForm.password_confirmation" type="password"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
              </div>
              <div class="mt-4">
                <label class="flex items-center">
                  <input v-model="form.hide_infos" type="checkbox"
                    class="rounded border-gray-300 dark:border-gray-600" />
                  <span :class="isRTL ? 'mr-2' : 'ml-2'" class="text-sm text-gray-700 dark:text-gray-300">
                    {{ t('add-product.form.hide_phone') }}
                  </span>
                </label>
              </div>
            </template>

            <!-- Login Form -->
            <template v-else>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {{ t('add-product.form.email') }}
                  </label>
                  <input v-model="userForm.email" type="email"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {{ t('add-product.form.password') }}
                  </label>
                  <input v-model="userForm.password" type="password"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
              </div>
              <div class="mt-4">
                <label class="flex items-center">
                  <input v-model="form.hide_infos" type="checkbox"
                    class="rounded border-gray-300 dark:border-gray-600" />
                  <span :class="isRTL ? 'mr-2' : 'ml-2'" class="text-sm text-gray-700 dark:text-gray-300">
                    {{ t('add-product.form.hide_phone') }}
                  </span>
                </label>
              </div>
            </template>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between">
          <button v-if="!step1" type="button"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            :disabled="loading" @click="goBack">
            {{ t('add-product.buttons.back') }}
          </button>
          <div v-else></div>

          <button v-if="!step3" type="button"
            :class="`px-4 py-2 rounded-lg ${colorClasses.bg} text-white ${colorClasses.hover} disabled:opacity-50`"
            :disabled="loading" @click="nextStep">
            {{ t('add-product.buttons.next') }}
          </button>
          <button v-else type="button"
            :class="`px-4 py-2 rounded-lg ${colorClasses.bg} text-white ${colorClasses.hover} disabled:opacity-50`"
            :disabled="loading" @click="saveProduct">
            {{ t('add-product.buttons.publish') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '../composables/useToast'
import { useTheme } from '../composables/useTheme'
import { useI18n } from '../composables/useI18n'
import { productService } from '../services/productService'
import { authService } from '../services/authService'
import bgImmobilierMaroc from '../assets/images/bgs/immobilier-Maroc-2P.webp'
import propertiesData from '../locales/data/properties.js'

// FilePond imports
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import FilePondPluginImageResize from 'filepond-plugin-image-resize'

// Register FilePond plugins and create component
// Export as component for template use
const FilePond = vueFilePond(FilePondPluginImagePreview, FilePondPluginImageResize)

const router = useRouter()
const toast = useToast()
const { colorClasses } = useTheme()
const { t, currentLocale } = useI18n()

const isRTL = computed(() => currentLocale.value === 'ar')

const step1 = ref(true)
const step2 = ref(false)
const step3 = ref(false)
const loading = ref(false)
const errors = ref([])
const loginType = ref('register')
const selectedImg = ref(0)
const filePondInstance = ref(null)

const categories = ref([])
const villes = ref([])
const quartiers = ref([])
const productTypes = ref([])
const productExtras = ref([])
const imagePreviews = ref([])
const images = ref([])
const filePondFiles = ref([])

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

// Helper function to translate category names
const translateCategory = (categoryTitle) => {
  if (!categoryTitle) return ''

  const normalized = categoryTitle.trim()
  const currentLang = currentLocale.value || 'fr'

  // Category translations mapping
  const categoryTranslations = {
    fr: {
      'Vente': 'Vente',
      'Location': 'Location',
      'Vacances': 'Vacances',
      'Immo neuf': 'Immo neuf',
      'Immobilier neuf': 'Immobilier neuf',
    },
    en: {
      'Vente': 'For sale',
      'Location': 'For rent',
      'Vacances': 'Vacation rentals',
      'Immo neuf': 'New real estate',
      'Immobilier neuf': 'New real estate',
    },
    ar: {
      'Vente': 'للبيع',
      'Location': 'للكراء',
      'Vacances': 'للعطل',
      'Immo neuf': 'عقار جديد',
      'Immobilier neuf': 'عقار جديد',
    },
  }

  // Try to find translation
  if (categoryTranslations[currentLang] && categoryTranslations[currentLang][normalized]) {
    return categoryTranslations[currentLang][normalized]
  }

  // Fallback: try common translations
  const commonTranslations = {
    'Vente': { fr: 'Vente', en: 'For sale', ar: 'للبيع' },
    'Location': { fr: 'Location', en: 'For rent', ar: 'للكراء' },
    'Vacances': { fr: 'Vacances', en: 'Vacation rentals', ar: 'للعطل' },
    'Immo neuf': { fr: 'Immo neuf', en: 'New real estate', ar: 'عقار جديد' },
    'Immobilier neuf': { fr: 'Immobilier neuf', en: 'New real estate', ar: 'عقار جديد' },
  }

  if (commonTranslations[normalized] && commonTranslations[normalized][currentLang]) {
    return commonTranslations[normalized][currentLang]
  }

  // Return original if no translation found
  return normalized
}

// Computed property for translated categories
const translatedCategories = computed(() => {
  return categories.value.map(cat => ({
    ...cat,
    translatedTitle: translateCategory(cat.title || '')
  }))
})

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

// Helper function to translate product type names (similar to HeroSearch.vue)
const translateProductType = (typeTitle) => {
  if (!typeTitle) return ''

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

  // Return original title if no translation found
  return normalized
}

// Computed property to ensure productTypes have valid IDs and translate them
const validProductTypes = computed(() => {
  return productTypes.value
    .filter(pt => pt && pt.id !== undefined && pt.id !== null)
    .map(pt => ({
      ...pt,
      translatedTitle: translateProductType(pt.title || '')
    }))
})

const form = ref({
  category: null,
  type: null,
  title: '',
  description: '',
  position: '',
  ville: '',
  quartier: '',
  address: '',
  prix: '',
  prix_by: 'fix',
  disponibilite: '',
  video: '',
  vr: '',
  unite_surface: 'm²',
  surface: '',
  surface_habitable: '',
  surface_terrain: '',
  nbr_salons: 0,
  nbr_chambres: 0,
  nbr_salles_bain: 0,
  nbr_adultes: 0,
  nbr_enfants: 0,
  hasextras: [],
  hide_infos: false,
  productbiens: []
})

const userForm = ref({
  firstname: '',
  lastname: '',
  phone: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const steps = computed(() => [
  { title: t('add-product.steps.listing_details'), active: step1.value },
  { title: t('add-product.steps.listing_images'), active: step2.value },
  { title: t('add-product.steps.identification'), active: step3.value }
])

watch(() => form.value.category, (newVal, oldVal) => {
  // Always reset type when category changes (even if switching between categories)
  if (newVal !== oldVal) {
    form.value.type = null
    productExtras.value = []
  }

  if (newVal !== null && newVal !== '' && newVal !== undefined) {
    loadProductTypes()
  } else {
    // Reset type when category is cleared
    productTypes.value = []
  }
})

watch(() => form.value.type, (newVal) => {
  if (newVal !== null && newVal !== '' && newVal !== undefined) {
    getExtras()
  }
})

watch(() => form.value.ville, (newVal) => {
  if (newVal) {
    getQuartiers()
  }
})

onMounted(async () => {
  await loadInitialData()
})

async function loadInitialData() {
  try {
    loading.value = true
    const [categoriesRes, villesRes] = await Promise.all([
      productService.getCategories(),
      productService.getVilles()
    ])
    categories.value = categoriesRes.data.categories
    villes.value = villesRes.data.villes
  } catch (error) {
    console.error('Error loading initial data:', error)
    errors.value = [t('add-product.errors.failedToLoad')]
  } finally {
    loading.value = false
  }
}

async function loadProductTypes() {
  try {
    // Reset type when loading new types for a different category
    form.value.type = null
    productExtras.value = []

    // Get current locale and language ID
    const locale = localStorage.getItem('app_locale') || 'fr'
    const languageId = locale === 'fr' ? 1 : locale === 'ar' ? 2 : 3

    const response = await productService.getTypes({
      product_category_id: form.value.category,
      language_id: languageId
    })

    console.log(response)
    // Ensure all types have valid IDs
    productTypes.value = (response.data.types || []).filter(pt => pt && pt.id !== undefined && pt.id !== null)
  } catch (error) {
    console.error('Error loading product types:', error)
    productTypes.value = []
  }
}

async function getExtras() {
  if (!form.value.type) return
  try {
    const response = await productService.getExtras({
      product_type_id: form.value.type
    })
    productExtras.value = response.data.types || []
  } catch (error) {
    console.error('Error loading extras:', error)
  }
}

async function getQuartiers() {
  if (!form.value.ville) return
  try {
    const response = await productService.getQuartiers({
      title: form.value.ville
    })
    quartiers.value = response.data.quartiers || []
  } catch (error) {
    console.error('Error loading quartiers:', error)
    quartiers.value = []
  }
}

function validateStep1() {
  errors.value = []
  // Check if type is selected and exists in the available types
  const typeValue = form.value.type
  if (typeValue === null || typeValue === '' || typeValue === undefined) {
    errors.value.push(t('add-product.errors.typeRequired'))
  } else {
    // Verify the selected type exists in the current validProductTypes list
    if (validProductTypes.value.length > 0) {
      const typeExists = validProductTypes.value.some(pt => Number(pt.id) === Number(typeValue))
      if (!typeExists) {
        errors.value.push(t('add-product.errors.selectValidType'))
        form.value.type = null // Reset invalid selection
      }
    } else if (productTypes.value.length === 0) {
      errors.value.push(t('add-product.errors.selectCategoryFirst'))
    }
  }

  const categoryValue = form.value.category
  if (categoryValue === null || categoryValue === '' || categoryValue === undefined) {
    errors.value.push(t('add-product.errors.categoryRequired'))
  }
  if (!form.value.title || form.value.title.trim() === '') {
    errors.value.push(t('add-product.errors.titleRequired'))
  }
  // if (!form.value.description || form.value.description.trim() === '') {
  //   errors.value.push(t('add-product.errors.descriptionRequired'))
  // }
  if (!form.value.ville || form.value.ville === '' || form.value.ville === null) {
    errors.value.push(t('add-product.errors.cityRequired'))
  }
  if (!form.value.address || form.value.address.trim() === '') {
    errors.value.push(t('add-product.errors.addressRequired'))
  }
  if (!form.value.prix || form.value.prix === '' || form.value.prix === null) {
    errors.value.push(t('add-product.errors.priceRequired'))
  }
  if (!form.value.unite_surface || form.value.unite_surface === '' || form.value.unite_surface === null) {
    errors.value.push(t('add-product.errors.areaUnitRequired'))
  }
  if (!form.value.surface || form.value.surface === '' || form.value.surface === null) {
    errors.value.push(t('add-product.errors.areaRequired'))
  }
  return errors.value.length === 0
}

function validateStep2() {
  errors.value = []
  if (images.value.length === 0) {
    errors.value.push(t('add-product.errors.imageRequired'))
  }
  return errors.value.length === 0
}

function validateStep3() {
  errors.value = []
  if (loginType.value === 'register') {
    if (!userForm.value.firstname) errors.value.push(t('add-product.errors.firstNameRequired'))
    if (!userForm.value.lastname) errors.value.push(t('add-product.errors.lastNameRequired'))
    if (!userForm.value.phone) errors.value.push(t('add-product.errors.phoneRequired'))
    if (!userForm.value.email) errors.value.push(t('add-product.errors.emailRequired'))
    if (!userForm.value.password) errors.value.push(t('add-product.errors.passwordRequired'))
    if (userForm.value.password !== userForm.value.password_confirmation) {
      errors.value.push(t('add-product.errors.passwordsNotMatch'))
    }
  } else {
    if (!userForm.value.email) errors.value.push(t('add-product.errors.emailRequired'))
    if (!userForm.value.password) errors.value.push(t('add-product.errors.passwordRequired'))
  }
  return errors.value.length === 0
}

function nextStep1() {
  if (validateStep1()) {
    step1.value = false
    step2.value = true
    step3.value = false
  }
}

function nextStep2() {
  if (validateStep2()) {
    step1.value = false
    step2.value = false
    step3.value = true
  }
}

function nextStep() {
  if (step1.value) {
    nextStep1()
  } else if (step2.value) {
    nextStep2()
  }
}

function goBack() {
  if (step2.value) {
    step1.value = true
    step2.value = false
    step3.value = false
  } else if (step3.value) {
    step1.value = false
    step2.value = true
    step3.value = false
  }
}

// FilePond event handlers
function handleFilePondAddFile(error, file) {
  if (error) {
    console.error('FilePond error:', error)
    return
  }

  // Create preview URL
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreviews.value.push({
      file: file.file,
      url: e.target.result,
      filePondId: file.id
    })
    images.value.push(file.file)

    // Auto-select first image as default
    if (imagePreviews.value.length === 1) {
      selectedImg.value = 0
    }
  }
  reader.readAsDataURL(file.file)
}

function handleFilePondRemoveFile(error, file) {
  if (error) {
    console.error('FilePond remove error:', error)
    return
  }

  // Find and remove from previews
  const index = imagePreviews.value.findIndex(img => img.filePondId === file.id)
  if (index !== -1) {
    imagePreviews.value.splice(index, 1)
    images.value.splice(index, 1)

    // Adjust selected image index
    if (selectedImg.value >= imagePreviews.value.length) {
      selectedImg.value = Math.max(0, imagePreviews.value.length - 1)
    }
  }
}

function handleFilePondReorder(files) {
  // Update the order of images based on FilePond's new order
  const newPreviews = []
  const newImages = []

  files.forEach(filePondFile => {
    const existingIndex = imagePreviews.value.findIndex(img => img.filePondId === filePondFile.id)
    if (existingIndex !== -1) {
      newPreviews.push(imagePreviews.value[existingIndex])
      newImages.push(images.value[existingIndex])
    }
  })

  imagePreviews.value = newPreviews
  images.value = newImages
}

function selectImage(index) {
  selectedImg.value = index
}

function removeImage(index) {
  if (index < 0 || index >= imagePreviews.value.length) return

  // Remove from previews and images arrays
  const removedPreview = imagePreviews.value[index]
  imagePreviews.value.splice(index, 1)
  images.value.splice(index, 1)

  // Remove from FilePond if filePondInstance exists
  if (filePondInstance.value && removedPreview.filePondId) {
    try {
      const pond = filePondInstance.value
      const files = pond.getFiles()
      const filePondFile = files.find(f => f.id === removedPreview.filePondId)
      if (filePondFile) {
        pond.removeFile(filePondFile.id)
      }
    } catch (error) {
      console.error('Error removing file from FilePond:', error)
    }
  }

  // Adjust selected image index
  if (selectedImg.value >= imagePreviews.value.length) {
    selectedImg.value = Math.max(0, imagePreviews.value.length - 1)
  } else if (selectedImg.value > index) {
    // If we removed an image before the selected one, adjust the index
    selectedImg.value = selectedImg.value - 1
  }
}

async function saveProduct() {
  if (!validateStep3()) {
    return
  }

  try {
    loading.value = true
    errors.value = []

    // Prepare form data with both product and auth data
    const formData = new FormData()

    // Add product form data
    Object.keys(form.value).forEach(key => {
      if (key === 'hasextras') {
        formData.append(key, JSON.stringify(form.value[key]))
      } else if (key !== 'productbiens') {
        // Convert null/undefined to empty string, but keep numbers as numbers
        const value = form.value[key]
        if (value === null || value === undefined) {
          formData.append(key, '')
        } else {
          formData.append(key, value)
        }
      }
    })

    // Add user/auth form data
    Object.keys(userForm.value).forEach(key => {
      formData.append(key, userForm.value[key])
    })

    // Add login type
    formData.append('login_type', loginType.value)

    // Add images
    images.value.forEach((img) => {
      formData.append('images[]', img)
    })
    formData.append('selectedImg', selectedImg.value)

    // Create product with auth (combined endpoint - validates product first, then auth)
    // This prevents creating a user account if product validation fails
    const response = await productService.createProductWithAuth(formData)

    // Store token from response
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token)
    }

    // Show success toast
    toast.success(response.data.message || t('add-product.success.message'), {
      duration: 4000
    })

    // Redirect to home page after a short delay
    setTimeout(() => {
      router.push('/')
    }, 1500)
  } catch (error) {
    console.error('Error saving product:', error)
    let errorMessage = t('add-product.errors.failedToSave')

    if (error.response && error.response.data) {
      if (error.response.data.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat()
        errors.value = errorMessages
        // Show first error as toast
        if (errorMessages.length > 0) {
          errorMessage = errorMessages[0]
        }
      } else if (error.response.data.message) {
        errors.value = [error.response.data.message]
        errorMessage = error.response.data.message
      }
    } else {
      errors.value = [errorMessage]
    }

    // Show error toast
    toast.error(errorMessage, {
      duration: 5000
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.filepond-wrapper {
  @apply w-full;
}

/* FilePond dark mode support */
:deep(.filepond--root) {
  @apply dark:bg-gray-700;
}

:deep(.filepond--panel-root) {
  @apply dark:bg-gray-700 dark:border-gray-600;
}

:deep(.filepond--drop-label) {
  @apply dark:text-gray-300;
}

:deep(.filepond--label-action) {
  @apply dark:text-blue-400;
}

:deep(.filepond--file-status-main) {
  @apply dark:text-gray-300;
}

:deep(.filepond--file-status-sub) {
  @apply dark:text-gray-400;
}
</style>
