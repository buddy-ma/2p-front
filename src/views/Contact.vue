<template>
  <section class="py-20 min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <!-- Page Header -->
      <div class="mb-12 text-center">
        <div class="w-full">
          <h1 :class="`text-3xl md:text-4xl font-bold mb-4 ${colorClasses.text}`">
            {{ t('contact.page.title') }}
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            {{ t('contact.page.subtitle') }}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Company Information Column -->
        <div class="mb-8 lg:mb-0">
          <div 
            class="contact-info h-full rounded-3xl flex flex-col justify-between p-8 md:p-12 text-white relative overflow-hidden"
            :style="{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${bgImage})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'top center',
              backgroundSize: 'cover'
            }"
          >
            <h3 class="text-white text-2xl font-bold mb-6">
              {{ t('contact.page.contactInfo.title') }}
            </h3>

            <div class="flex flex-col justify-between flex-grow">
              <!-- Address -->
              <div class="info-box flex items-center mb-6">
                <div class="icon w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex justify-center items-center text-white flex-shrink-0" :class="isRTL ? 'ml-3' : 'mr-3'">
                  <MapPin :size="20" />
                </div>
                <div :class="`details flex-1 ${isRTL ? 'mr-2' : 'ml-2'}`">
                  <h5 class="mb-1 text-white font-bold">
                    {{ t('contact.page.contactInfo.address.title') }}
                  </h5>
                  <p class="mb-0 text-white/90" v-html="t('contact.page.contactInfo.address.value')"></p>
                </div>
              </div>

              <!-- Phone -->
              <div class="info-box flex items-center mb-6">
                <div class="icon w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex justify-center items-center text-white flex-shrink-0" :class="isRTL ? 'ml-3' : 'mr-3'">
                  <Phone :size="20" />
                </div>
                <div :class="`details flex-1 text-white ${isRTL ? 'mr-2' : 'ml-2'}`">
                  <h5 class="mb-1 text-white font-bold">
                    {{ t('contact.page.contactInfo.phone.title') }}
                  </h5>
                  <p class="mb-0 text-white/90" dir="ltr" v-html="t('contact.page.contactInfo.phone.value')"></p>
                </div>
              </div>

              <!-- Email -->
              <div class="info-box flex items-center mb-6">
                <div class="icon w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex justify-center items-center text-white flex-shrink-0" :class="isRTL ? 'ml-3' : 'mr-3'">
                  <Mail :size="20" />
                </div>
                <div :class="`details flex-1 text-white ${isRTL ? 'mr-2' : 'ml-2'}`">
                  <h5 class="mb-1 text-white font-bold">
                    {{ t('contact.page.contactInfo.email.title') }}
                  </h5>
                  <p class="mb-0 text-white/90">{{ t('contact.page.contactInfo.email.value') }}</p>
                </div>
              </div>
            </div>

            <!-- Social Media -->
            <div class="social-media mt-6">
              <h5 class="mb-3 text-white font-semibold">
                {{ t('contact.page.contactInfo.followUs') }}
              </h5>
              <div class="flex gap-3">
                <a 
                  :href="t('contact.page.socialMedia.facebook')" 
                  class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex justify-center items-center text-white transition-all duration-300 hover:bg-white hover:text-blue-600 hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <Facebook :size="18" />
                </a>
                <a 
                  :href="t('contact.page.socialMedia.instagram')" 
                  class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex justify-center items-center text-white transition-all duration-300 hover:bg-white hover:text-pink-600 hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram :size="18" />
                </a>
                <a 
                  :href="t('contact.page.socialMedia.youtube')" 
                  class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex justify-center items-center text-white transition-all duration-300 hover:bg-white hover:text-red-600 hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <Youtube :size="18" />
                </a>
                <a 
                  :href="t('contact.page.socialMedia.linkedin')" 
                  class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex justify-center items-center text-white transition-all duration-300 hover:bg-white hover:text-blue-700 hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin :size="18" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form Column -->
        <div>
          <div class="contact-form bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm">
            <h3 :class="`text-2xl font-bold mb-6 ${colorClasses.text}`">
              {{ t('contact.page.form.title') }}
            </h3>

            <!-- Success Message -->
            <div 
              v-if="successMessage" 
              class="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
            >
              <p class="text-green-800 dark:text-green-200">{{ successMessage }}</p>
            </div>

            <!-- Error Messages -->
            <div 
              v-if="errors.length > 0" 
              class="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
            >
              <p class="font-semibold text-red-800 dark:text-red-200 mb-2">
                {{ t('common.errors.title') || 'Erreurs' }}
              </p>
              <ul class="list-disc list-inside text-red-700 dark:text-red-300">
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
              </ul>
            </div>

            <!-- Contact Form -->
            <form @submit.prevent="submitForm" id="contactForm">
              <input type="hidden" name="subject" :value="t('contact.page.form.subject')">
              
              <!-- Full Name -->
              <div class="mb-4">
                <label 
                  for="name" 
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {{ t('contact.page.form.fullName') }}
                </label>
                <input 
                  type="text" 
                  class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  id="name" 
                  name="fullname" 
                  v-model="form.fullname"
                  required
                >
              </div>

              <!-- Email -->
              <div class="mb-4">
                <label 
                  for="email" 
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {{ t('contact.page.form.email') }}
                </label>
                <input 
                  type="email" 
                  class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  id="email" 
                  name="email" 
                  v-model="form.email"
                  required
                >
              </div>

              <!-- Phone -->
              <div class="mb-4">
                <label 
                  for="phone" 
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {{ t('contact.page.form.phone') }}
                </label>
                <input 
                  type="tel" 
                  class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  id="phone" 
                  name="phone" 
                  v-model="form.phone"
                  required
                >
              </div>

              <!-- Message -->
              <div class="mb-6">
                <label 
                  for="message" 
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {{ t('contact.page.form.message') }}
                </label>
                <textarea 
                  class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  id="message" 
                  name="message" 
                  rows="4" 
                  v-model="form.message"
                  required
                ></textarea>
              </div>

              <!-- Submit Button -->
              <div class="flex justify-end">
                <button 
                  type="submit" 
                  :class="`px-6 py-2.5 rounded-lg text-white font-medium transition-all duration-200 ${colorClasses.bg} ${colorClasses.hover} disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md hover:shadow-lg`"
                  :disabled="loading"
                >
                  <span v-if="loading" class="flex items-center gap-2">
                    <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ t('common.loading') || 'Envoi...' }}
                  </span>
                  <span v-else>{{ t('contact.page.form.sendMessage') }}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Linkedin } from 'lucide-vue-next'
import { useI18n } from '../composables/useI18n'
import { useLanguage } from '../composables/useLanguage'
import { useTheme } from '../composables/useTheme'
import { useSEO } from '../composables/useSEO'
import api from '../services/api'
import bgImage from '../assets/images/bgs/immobilier-Maroc-2P.webp'

const { t } = useI18n()
const { currentLocale } = useLanguage()
const { colorClasses } = useTheme()

// Form state
const form = ref({
  fullname: '',
  email: '',
  phone: '',
  message: '',
  subject: '',
})

const errors = ref<string[]>([])
const successMessage = ref('')
const loading = ref(false)

// RTL support
const isRTL = computed(() => currentLocale.value === 'ar')

// Initialize SEO
const { updateSEO } = useSEO({
  title: t('contact.meta.title'),
  description: t('contact.meta.description'),
  image: '/assets/images/immobilier/immobilier-de-particulier-a-particulier-maroc.webp',
})

onMounted(() => {
  // Set form subject
  form.value.subject = t('contact.page.form.subject')
  
  // Update SEO meta tags
  updateSEO({
    title: t('contact.meta.title'),
    description: t('contact.meta.description'),
    image: '/assets/images/immobilier/immobilier-de-particulier-a-particulier-maroc.webp',
  })
})

// Form submission
const submitForm = async () => {
  errors.value = []
  successMessage.value = ''
  loading.value = true

  try {
    const formData = {
      fullname: form.value.fullname,
      email: form.value.email,
      phone: form.value.phone,
      message: form.value.message,
      subject: form.value.subject,
    }

    const response = await api.post('/commercialiserContact', formData)

    if (response.data.success || response.status === 200) {
      successMessage.value = t('contact.page.form.successMessage') || 'Votre message a été envoyé avec succès!'
      
      // Reset form
      form.value = {
        fullname: '',
        email: '',
        phone: '',
        message: '',
        subject: t('contact.page.form.subject'),
      }

      // Clear success message after 5 seconds
      setTimeout(() => {
        successMessage.value = ''
      }, 5000)
    }
  } catch (error: any) {
    console.error('Contact form error:', error)
    
    if (error.response?.data?.errors) {
      // Laravel validation errors
      const validationErrors = error.response.data.errors
      errors.value = Object.values(validationErrors).flat() as string[]
    } else if (error.response?.data?.message) {
      errors.value = [error.response.data.message]
    } else {
      errors.value = [t('common.errorOccurred') || 'Une erreur est survenue. Veuillez réessayer.']
    }
  } finally {
    loading.value = false
  }
}
</script>

