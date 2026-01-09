<template>
  <div ref="dropdownRef" class="relative">
    <!-- Language Button -->
    <button
      @click="isOpen = !isOpen"
      class="flex items-center gap-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      :aria-label="`${t('common.currentLanguage')}: ${currentLocale}`"
      aria-haspopup="true"
      :aria-expanded="isOpen"
    >
      <img :src="currentFlag" :alt="currentLocale.toUpperCase()" class="w-5 h-5 rounded-full" />
    </button>

    <!-- Dropdown Menu -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        @click.stop
        class="absolute end-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50"
      >
        <div class="py-1" role="menu" aria-orientation="vertical">
          <button
            v-for="locale in availableLocales"
            :key="locale"
            @click="handleLanguageChange(locale)"
            class="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            :class="{ 'bg-gray-100 dark:bg-gray-700': locale === currentLocale }"
            role="menuitem"
          >
            <img :src="flags[locale]" :alt="locale.toUpperCase()" class="w-5 h-5 rounded-full" />
            <span class="flex-1 text-start">{{ t(`languages.${locale}`) }}</span>
            <svg
              v-if="locale === currentLocale"
              class="w-4 h-4 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import { useI18n } from '../composables/useI18n'
import flagAr from '../assets/images/flags/ar.svg'
import flagEn from '../assets/images/flags/en.svg'
import flagFr from '../assets/images/flags/fr.svg'

const { currentLocale, availableLocales, switchLanguage } = useLanguage()
const { t } = useI18n()
const isOpen = ref(false)
const dropdownRef = ref(null)

// Click outside handler
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeDropdown()
  }
}

const flags = {
  fr: flagFr,
  en: flagEn,
  ar: flagAr,
}

const currentFlag = computed(() => {
  return flags[currentLocale.value] || flags.fr
})

const handleLanguageChange = (locale) => {
  if (locale !== currentLocale.value) {
    switchLanguage(locale)
  }
  closeDropdown()
}

const closeDropdown = () => {
  isOpen.value = false
}

// Close dropdown on escape key and click outside
let escapeHandler = null

onMounted(() => {
  escapeHandler = (e) => {
    if (e.key === 'Escape' && isOpen.value) {
      closeDropdown()
    }
  }
  document.addEventListener('keydown', escapeHandler)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  if (escapeHandler) {
    document.removeEventListener('keydown', escapeHandler)
  }
  document.removeEventListener('click', handleClickOutside)
})
</script>
