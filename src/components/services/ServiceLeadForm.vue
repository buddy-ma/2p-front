<template>
  <component
    :is="as"
    id="service-contact"
    :aria-labelledby="title && as === 'section' ? titleId : undefined"
    :class="as === 'section' ? 'scroll-mt-20 bg-gray-50 dark:bg-gray-800/40' : 'scroll-mt-24'"
  >
    <div :class="as === 'section' ? 'container mx-auto px-4 max-w-6xl py-16 md:py-20' : ''">
      <div :class="['grid gap-8 items-start', image ? 'lg:grid-cols-2' : '']">
        <div :class="['bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm text-start', image ? '' : 'max-w-3xl w-full mx-auto']">
          <h2 v-if="title" :id="titleId" :class="['text-2xl md:text-3xl font-bold', colorClasses.text]">{{ title }}</h2>
          <p v-if="text" class="mt-3 text-gray-600 dark:text-gray-400">{{ text }}</p>

          <div aria-live="polite">
            <div v-if="successMessage" class="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p class="text-green-800 dark:text-green-200">{{ successMessage }}</p>
            </div>
            <div v-if="serverErrors.length" class="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <ul class="list-disc list-inside text-red-700 dark:text-red-300">
                <li v-for="(error, i) in serverErrors" :key="i">{{ error }}</li>
              </ul>
            </div>
          </div>

          <form ref="formRef" class="mt-6" novalidate @submit.prevent="submit">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="lead-name" :class="labelClass">{{ f.name }} <span aria-hidden="true">*</span></label>
                <input
                  id="lead-name"
                  v-model="form.fullname"
                  type="text"
                  autocomplete="name"
                  required
                  :aria-invalid="!!fieldErrors.fullname"
                  :aria-describedby="fieldErrors.fullname ? 'lead-name-error' : undefined"
                  :class="inputClass"
                />
                <p v-if="fieldErrors.fullname" id="lead-name-error" :class="errorClass">{{ fieldErrors.fullname }}</p>
              </div>

              <div>
                <label for="lead-phone" :class="labelClass">{{ f.phone }} <span aria-hidden="true">*</span></label>
                <input
                  id="lead-phone"
                  v-model="form.phone"
                  type="tel"
                  inputmode="tel"
                  dir="ltr"
                  autocomplete="tel"
                  required
                  placeholder="06 00 00 00 00"
                  :aria-invalid="!!fieldErrors.phone"
                  :aria-describedby="fieldErrors.phone ? 'lead-phone-error' : undefined"
                  :class="[inputClass, 'rtl:text-end']"
                />
                <p v-if="fieldErrors.phone" id="lead-phone-error" :class="errorClass">{{ fieldErrors.phone }}</p>
              </div>

              <div v-if="LEAD_FORM.requireEmail" class="md:col-span-2">
                <label for="lead-email" :class="labelClass">{{ f.email }} <span aria-hidden="true">*</span></label>
                <input
                  id="lead-email"
                  v-model="form.email"
                  type="email"
                  dir="ltr"
                  autocomplete="email"
                  required
                  :aria-invalid="!!fieldErrors.email"
                  :aria-describedby="fieldErrors.email ? 'lead-email-error' : undefined"
                  :class="[inputClass, 'rtl:text-end']"
                />
                <p v-if="fieldErrors.email" id="lead-email-error" :class="errorClass">{{ fieldErrors.email }}</p>
              </div>

              <div>
                <label for="lead-type" :class="labelClass">{{ f.propertyType }}</label>
                <select id="lead-type" v-model="form.propertyType" :class="inputClass">
                  <option value="">—</option>
                  <option v-for="opt in propertyTypeOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </div>

              <div>
                <label for="lead-city" :class="labelClass">{{ f.city }}</label>
                <select id="lead-city" v-model="form.city" :class="inputClass">
                  <option value="">—</option>
                  <option v-for="opt in cityOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </div>

              <div v-if="offers.length > 1" class="md:col-span-2">
                <label for="lead-offer" :class="labelClass">{{ f.offer }}</label>
                <select id="lead-offer" v-model="currentOffer" :class="inputClass">
                  <option v-for="o in offers" :key="o.value" :value="o.value">{{ o.label }}</option>
                </select>
              </div>

              <div v-if="showListingUrl" class="md:col-span-2">
                <label for="lead-url" :class="labelClass">{{ f.listingUrl }}</label>
                <input id="lead-url" v-model="form.listingUrl" type="url" dir="ltr" inputmode="url" :class="[inputClass, 'rtl:text-end']" />
              </div>

              <div class="md:col-span-2">
                <label for="lead-message" :class="labelClass">{{ f.message }}</label>
                <textarea id="lead-message" v-model="form.message" rows="4" :class="[inputClass, 'resize-none']"></textarea>
              </div>
            </div>

            <div class="sr-only" aria-hidden="true">
              <label for="lead-website">Website</label>
              <input id="lead-website" v-model="form.website" type="text" tabindex="-1" autocomplete="off" />
            </div>

            <div class="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                type="submit"
                :disabled="loading"
                :class="`w-full sm:w-auto justify-center px-6 py-3 rounded-lg text-white font-semibold transition-all duration-200 ${colorClasses.bg} ${colorClasses.hover} disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${colorClasses.ring}`"
              >
                <span v-if="loading" class="flex items-center gap-2">
                  <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ f.sending }}
                </span>
                <span v-else>{{ submitLabel || f.submit }}</span>
              </button>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ f.privacy }}</p>
            </div>
          </form>
          <slot />
        </div>

        <div v-if="image" class="hidden lg:block lg:sticky lg:top-24">
          <ServiceImage v-bind="image" />
        </div>
      </div>
    </div>
  </component>
</template>

<script setup>
// Usage: <ServiceLeadForm :title="common.contactCta" :offers="[{ value: 'annoncePremium', label: c.card.name }]" />
//        <ServiceLeadForm v-model:offer="selectedOffer" :offers="…" variant="buyer" listing-url-for="packPersonnalise" />
// Posts to LEAD_FORM.endpoint with the Contact.vue payload { fullname, email, phone, subject, message };
// property type, city, offer and page go into subject/message, so no backend change is needed.
import { ref, reactive, computed, nextTick, useId } from 'vue'
import api from '../../services/api'
import { useI18n } from '../../composables/useI18n'
import { useServiceTheme } from '../../composables/useServiceTheme'
import { useToast } from '../../composables/useToast'
import { LEAD_FORM, SERVICE_AREA } from '../../config/services'
import ServiceImage from './ServiceImage.vue'

const props = defineProps({
  title: { type: String, default: '' },
  text: { type: String, default: '' },
  offers: { type: Array, default: () => [] },
  offer: { type: String, default: '' },
  variant: { type: String, default: 'owner' },
  listingUrlFor: { type: String, default: '' },
  submitLabel: { type: String, default: '' },
  image: { type: Object, default: null },
  as: { type: String, default: 'section' },
})
const emit = defineEmits(['update:offer'])

const PROPERTY_TYPES = ['Appartements', 'Villas', 'Maisons', 'Riads', 'Studios', 'duplex', 'Terrains', 'Locaux commerciaux', 'Bureaux']
const PHONE_RE = /^(\+212|00212|0)[5-7]\d{8}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const { tm, currentLocale } = useI18n()
const { colorClasses } = useServiceTheme()
const toast = useToast()
const titleId = useId()

const f = computed(() => tm('servicePages.common.form') || {})

const inputClass = 'w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
const errorClass = 'mt-1 text-sm text-red-600 dark:text-red-400'

const emptyForm = () => ({ fullname: '', phone: '', email: '', propertyType: '', city: SERVICE_AREA.city, listingUrl: '', message: '', website: '' })
const form = reactive(emptyForm())
const fieldErrors = ref({})
const serverErrors = ref([])
const successMessage = ref('')
const loading = ref(false)
const formRef = ref(null)

const propertyTypeOptions = computed(() => {
  const labels = tm('common.propertyTypes') || {}
  return PROPERTY_TYPES.map((value) => ({ value, label: labels[value] || value }))
})

const cityOptions = computed(() => {
  const labels = tm('common.cities') || {}
  const keys = Object.keys(labels).filter((k) => k !== 'Maroc' && k !== SERVICE_AREA.city)
  return [SERVICE_AREA.city, ...keys].map((value) => ({ value, label: labels[value] || value }))
})

const currentOffer = computed({
  get: () => (props.offers.some((o) => o.value === props.offer) ? props.offer : props.offers[0]?.value || ''),
  set: (v) => emit('update:offer', v),
})
const offerLabel = computed(() => props.offers.find((o) => o.value === currentOffer.value)?.label || '')

const showListingUrl = computed(() => props.variant === 'buyer' && (!props.listingUrlFor || currentOffer.value === props.listingUrlFor))

const validate = () => {
  const e = {}
  const required = f.value.required
  if (!form.fullname.trim()) e.fullname = required
  const phone = form.phone.replace(/[\s.\-]/g, '')
  if (!phone) e.phone = required
  else if (!PHONE_RE.test(phone)) e.phone = f.value.phoneInvalid
  if (LEAD_FORM.requireEmail) {
    if (!form.email.trim()) e.email = required
    else if (!EMAIL_RE.test(form.email.trim())) e.email = f.value.emailInvalid
  }
  fieldErrors.value = e
  return Object.keys(e).length === 0
}

const focusFirstInvalid = async () => {
  await nextTick()
  formRef.value?.querySelector('[aria-invalid="true"]')?.focus()
}

const buildMessage = () => {
  const lines = [
    `Service: ${offerLabel.value}`,
    form.propertyType && `Type de bien: ${form.propertyType}`,
    form.city && `Ville: ${form.city}`,
    showListingUrl.value && form.listingUrl.trim() && `Lien annonce: ${form.listingUrl.trim()}`,
    `Page: ${window.location.href}`,
    `Langue: ${currentLocale.value}`,
  ].filter(Boolean)
  const userMessage = form.message.trim()
  return lines.join('\n') + (userMessage ? `\n\n${userMessage}` : '')
}

const submit = async () => {
  serverErrors.value = []
  successMessage.value = ''
  if (!validate()) return focusFirstInvalid()

  const done = () => {
    successMessage.value = f.value.success
    toast.success(f.value.success)
    Object.assign(form, emptyForm())
    setTimeout(() => { successMessage.value = '' }, 8000)
  }

  if (form.website) return done()

  loading.value = true
  try {
    const response = await api.post(LEAD_FORM.endpoint, {
      fullname: form.fullname.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      subject: `2P Services – ${offerLabel.value}`,
      message: buildMessage(),
    })
    if (response.data?.success || response.status === 200) {
      if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { service: currentOffer.value })
      if (typeof window.fbq === 'function') window.fbq('track', 'Lead')
      done()
    }
  } catch (error) {
    console.error('Service lead form error:', error)
    if (error.response?.data?.errors) {
      serverErrors.value = Object.values(error.response.data.errors).flat()
    } else if (error.response?.data?.message) {
      serverErrors.value = [error.response.data.message]
    } else {
      serverErrors.value = [f.value.error]
    }
  } finally {
    loading.value = false
  }
}
</script>
