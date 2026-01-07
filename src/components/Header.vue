<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between py-4">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center">
            <img :src="logoPath" alt="2P" class="h-10" />
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center space-x-6">
          <router-link to="/" :class="`text-gray-700 ${colorClasses.hoverText}`">Accueil</router-link>
          <div class="relative group">
            <button :class="`text-gray-700 ${colorClasses.hoverText} flex items-center`">
              Acheter
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div class="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <router-link to="/immobilier-a-vendre" class="block px-4 py-2 hover:bg-gray-100">Vente</router-link>
              <router-link to="/immobilier-neuf" class="block px-4 py-2 hover:bg-gray-100">ImmoNeuf</router-link>
            </div>
          </div>
          <div class="relative group">
            <button :class="`text-gray-700 ${colorClasses.hoverText} flex items-center`">
              Louer
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div class="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <router-link to="/location-immobiliere" class="block px-4 py-2 hover:bg-gray-100">Location</router-link>
              <router-link to="/location-vacances" class="block px-4 py-2 hover:bg-gray-100">Vacances</router-link>
            </div>
          </div>
          <div class="relative group">
            <button :class="`text-gray-700 ${colorClasses.hoverText} flex items-center`">
              Nos Services
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div class="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <router-link to="/service-vente" class="block px-4 py-2 hover:bg-gray-100">Service Vente</router-link>
              <router-link to="/service-promoteur" class="block px-4 py-2 hover:bg-gray-100">Service Promoteur</router-link>
              <router-link to="/service-vacances" class="block px-4 py-2 hover:bg-gray-100">Service Vacances</router-link>
              <router-link to="/service-location" class="block px-4 py-2 hover:bg-gray-100">Service Location</router-link>
              <router-link to="/coworking" class="block px-4 py-2 hover:bg-gray-100">Coworking</router-link>
              <router-link to="/nos-tarifs" class="block px-4 py-2 hover:bg-gray-100">Nos Tarifs</router-link>
            </div>
          </div>
          <div class="relative group">
            <button :class="`text-gray-700 ${colorClasses.hoverText} flex items-center`">
              Actualités
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div class="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <router-link to="/conseils" class="block px-4 py-2 hover:bg-gray-100">Conseils immobiliers</router-link>
              <router-link to="/decouvrez-maroc" class="block px-4 py-2 hover:bg-gray-100">Découvrez le Maroc</router-link>
            </div>
          </div>
          <router-link to="/contact" :class="`text-gray-700 ${colorClasses.hoverText}`">Contact</router-link>
        </nav>

        <!-- Right Side Actions -->
        <div class="flex items-center space-x-4">
          <button :class="`px-4 py-2 text-gray-700 ${colorClasses.hoverText}`">S'identifier</button>
          <button :class="`${colorClasses.bg} text-white px-4 py-2 rounded-lg ${colorClasses.hover} flex items-center`">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Annonce gratuite
          </button>
          <div class="relative">
            <button class="flex items-center">
              <img :src="flagPath" alt="FR" class="w-5 h-5 rounded-full" />
            </button>
          </div>
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
          <router-link to="/" class="px-4 py-2 text-gray-700 hover:bg-gray-100">Accueil</router-link>
          <router-link to="/immobilier-a-vendre" class="px-4 py-2 text-gray-700 hover:bg-gray-100">Acheter</router-link>
          <router-link to="/location-immobiliere" class="px-4 py-2 text-gray-700 hover:bg-gray-100">Louer</router-link>
          <router-link to="/professionnels" class="px-4 py-2 text-gray-700 hover:bg-gray-100">Nos Services</router-link>
          <router-link to="/contact" class="px-4 py-2 text-gray-700 hover:bg-gray-100">Contact</router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from '../composables/useTheme'
import logoBlue from '../assets/images/logos/logo-blue.svg'
import logoGreen from '../assets/images/logos/logo-green.svg'
import logoOrange from '../assets/images/logos/logo-orange.svg'
import logoPurple from '../assets/images/logos/logo-purple.svg'
import logoRed from '../assets/images/logos/logo-red.svg'
import logoWhite from '../assets/images/logos/logo-white.svg'
import flagAr from '../assets/images/flags/ar.svg'
import flagEn from '../assets/images/flags/en.svg'
import flagFr from '../assets/images/flags/fr.svg'

const mobileMenuOpen = ref(false)
const route = useRoute()
const { logoColor, colorClasses } = useTheme()

const logos = {
  blue: logoBlue,
  green: logoGreen,
  orange: logoOrange,
  purple: logoPurple,
  red: logoRed,
  white: logoWhite,
}

const flags = {
  ar: flagAr,
  en: flagEn,
  fr: flagFr,
}

const logoPath = computed(() => {
  return logos[logoColor.value] || logos.blue
})

const currentLocale = ref('fr') // You can make this dynamic based on your locale system

const flagPath = computed(() => {
  return flags[currentLocale.value] || flags.fr
})
</script>

