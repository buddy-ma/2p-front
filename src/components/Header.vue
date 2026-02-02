<template>
  <header class="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between py-4">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center">
            <img :src="logoPath" alt="2P" class="h-10" />
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center gap-6">
          <router-link to="/" :class="`text-gray-700 dark:text-gray-300 ${colorClasses.hoverText}`">{{ t('common.home')
            }}</router-link>
          <div class="relative group">
            <button :class="`text-gray-700 dark:text-gray-300 ${colorClasses.hoverText} flex items-center`">
              {{ t('navigation.buy') }}
              <svg class="w-4 h-4 ms-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              class="absolute top-full start-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <router-link to="/immobilier-a-vendre"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">{{
                  t('navigation.sale') }}</router-link>
              <router-link to="/immobilier-neuf"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">{{
                  t('navigation.immoneuf') }}</router-link>
            </div>
          </div>
          <div class="relative group">
            <button :class="`text-gray-700 dark:text-gray-300 ${colorClasses.hoverText} flex items-center`">
              {{ t('navigation.rent') }}
              <svg class="w-4 h-4 ms-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              class="absolute top-full start-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <router-link to="/location-immobiliere"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">{{
                  t('navigation.location') }}</router-link>
              <router-link to="/location-vacances"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">{{
                  t('navigation.vacation') }}</router-link>
            </div>
          </div>
          <div class="relative group">
            <button :class="`text-gray-700 dark:text-gray-300 ${colorClasses.hoverText} flex items-center`">
              {{ t('navigation.services') }}
              <svg class="w-4 h-4 ms-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              class="absolute top-full start-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <router-link to="/service-vente"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">{{
                  t('navigation.serviceSale') }}</router-link>
              <router-link to="/service-promoteur"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">{{
                  t('navigation.servicePromoter') }}</router-link>
              <router-link to="/service-vacances"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">{{
                  t('navigation.serviceVacation') }}</router-link>
              <router-link to="/service-location"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">{{
                  t('navigation.serviceLocation') }}</router-link>
              <router-link to="/coworking"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">{{
                  t('navigation.coworking') }}</router-link>
              <router-link to="/nos-tarifs"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">{{
                  t('navigation.pricing') }}</router-link>
            </div>
          </div>
          <div class="relative group">
            <button :class="`text-gray-700 dark:text-gray-300 ${colorClasses.hoverText} flex items-center`">
              {{ t('navigation.news') }}
              <svg class="w-4 h-4 ms-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              class="absolute top-full start-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <router-link to="/conseils"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">{{
                  t('navigation.realEstateAdvice') }}</router-link>
              <router-link to="/decouvrez-maroc"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">{{
                  t('navigation.discoverMorocco') }}</router-link>
            </div>
          </div>
          <router-link to="/contact" :class="`text-gray-700 dark:text-gray-300 ${colorClasses.hoverText}`">{{
            t('common.contact') }}</router-link>
        </nav>

        <!-- Right Side Actions - Hidden on mobile -->
        <div class="hidden lg:flex items-center gap-4">
          <button :class="`px-4 py-2 text-gray-700 dark:text-gray-300 ${colorClasses.hoverText}`">{{ t('common.login')
            }}</button>
          <router-link to="/ajouter-annonce"
            :class="`${colorClasses.bg} text-white px-4 py-2 rounded-lg ${colorClasses.hover} flex items-center`">
            <svg class="w-4 h-4 me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            {{ t('common.freeAd') }}
          </router-link>
          <!-- Dark Mode Toggle -->
          <DarkModeToggle />
          <!-- Language Switcher -->
          <LanguageSwitcher />
        </div>

        <!-- Mobile Menu Button -->
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="lg:hidden">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="lg:hidden pb-4">
        <nav class="flex flex-col space-y-2">
          <router-link to="/"
            class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">{{
              t('common.home') }}</router-link>
          <router-link to="/immobilier-a-vendre"
            class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">{{
              t('navigation.buy') }}</router-link>
          <router-link to="/location-immobiliere"
            class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">{{
              t('navigation.rent') }}</router-link>
          <router-link to="/professionnels"
            class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">{{
              t('navigation.services') }}</router-link>
          <router-link to="/contact"
            class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">{{
              t('common.contact') }}</router-link>
          <div
            class="px-4 py-2 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
            <span class="text-sm text-gray-600 dark:text-gray-400">{{ t('common.theme') }}</span>
            <DarkModeToggle />
          </div>
          <div class="px-4 py-2 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
            <span class="text-sm text-gray-600 dark:text-gray-400">{{ t('common.language') }}</span>
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from '../composables/useTheme'
import { useI18n } from '../composables/useI18n'
import DarkModeToggle from './DarkModeToggle.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'
import logoBlue from '../assets/images/logos/logo-blue.svg'
import logoGreen from '../assets/images/logos/logo-green.svg'
import logoOrange from '../assets/images/logos/logo-orange.svg'
import logoPurple from '../assets/images/logos/logo-purple.svg'
import logoRed from '../assets/images/logos/logo-red.svg'

const mobileMenuOpen = ref(false)
const route = useRoute()
const { logoColor, colorClasses } = useTheme()
const { t } = useI18n()

const logos = {
  blue: logoBlue,
  green: logoGreen,
  orange: logoOrange,
  'orange-decouvrez': '/assets/images/logo-orange-decouvrez.svg',
  purple: logoPurple,
  red: logoRed,
}

const logoPath = computed(() => {
  return logos[logoColor.value] || logos.blue
})
</script>
