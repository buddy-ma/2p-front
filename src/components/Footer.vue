<template>
  <footer :class="[colorClasses.bgDark, 'text-white mt-12']">
    <div class="container max-w-6xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Logo -->
        <div>
          <img :src="logoPath" alt="2P" class="h-12 mb-4" width="120" height="48" loading="lazy" />
        </div>

        <!-- 
        <div>
          <h4 class="text-lg font-semibold mb-4">{{ t('footer.ourServices') }}</h4>
          <ul class="space-y-2">
            <li><router-link to="/service-vente"
                class="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">{{
                  t('navigation.serviceSale') }}</router-link></li>
            <li><router-link to="/service-promoteur"
                class="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">{{
                  t('navigation.servicePromoter') }}</router-link></li>
            <li><router-link to="/service-vacances"
                class="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">{{
                  t('navigation.serviceVacation') }}</router-link></li>
            <li><router-link to="/service-location"
                class="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">{{
                  t('navigation.serviceLocation') }}</router-link></li>
            <li><router-link to="/coworking"
                class="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">{{ t('navigation.coworking')
                }}</router-link></li>
            <li><router-link to="/nos-tarifs"
                class="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">{{ t('navigation.pricing')
                }}</router-link></li>
          </ul>
        </div>
        -->

        <!-- Nos Services -->
        <div>
          <h4 class="text-lg font-semibold mb-4">{{ t('footer.ourServices') }}</h4>
          <ul class="space-y-2">
            <li v-for="link in serviceLinks" :key="link.path"><router-link :to="getLocalizedPath(link.path)"
                class="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">{{ t(link.label)
                }}</router-link></li>
          </ul>
        </div>

        <!-- Liens Utiles -->
        <div>
          <h4 class="text-lg font-semibold mb-4">{{ t('footer.usefulLinks') }}</h4>
          <ul class="space-y-2">
            <li><router-link to="/decouvrezMaroc"
                class="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">{{
                  t('footer.discoverMorocco') }}</router-link></li>
            <li><router-link to="/conseils"
                class="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">{{ t('footer.advice')
                }}</router-link></li>
            <li><router-link to="/contact"
                class="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">{{ t('footer.contact')
                }}</router-link></li>
          </ul>
        </div>

        <!-- Pages Légales -->
        <div>
          <h4 class="text-lg font-semibold mb-4">{{ t('footer.legalPages') }}</h4>
          <ul class="space-y-2">
            <li v-for="link in legalLinks" :key="link.id">
              <router-link :to="link.to"
                class="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">
                {{ t(link.labelKey) }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n'
import { useTheme } from '../composables/useTheme'
import { useLanguage } from '../composables/useLanguage'
import { useLegalFooterLinks } from '../composables/useLegalFooterLinks'
import { SERVICE_PAGES } from '../config/services'
import logoWhite from '../assets/images/logos/logo-blue-white.svg'

const { t } = useI18n()
const { colorClasses } = useTheme()
const { getLocalizedPath } = useLanguage()
const { links: legalLinks } = useLegalFooterLinks()

const serviceLinks = [
  { label: 'navigation.sellRent', path: SERVICE_PAGES.proprietaires.path },
  { label: 'navigation.vacationRentalService', path: SERVICE_PAGES.locationVacances.path },
  { label: 'navigation.buyersTenants', path: SERVICE_PAGES.acheteursLocataires.path },
]

const logoPath = computed(() => {
  return logoWhite
})
</script>
