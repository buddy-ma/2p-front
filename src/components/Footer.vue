<template>
  <footer class="bg-gray-900 dark:bg-black text-white mt-12">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Logo -->
        <div>
          <img src="../assets/images/logos/logo-blue.svg" alt="2P" class="h-12 mb-4" />
        </div>

        <!-- Nos Services -->
        <div>
          <h4 class="text-lg font-semibold mb-4">{{ t('footer.ourServices') }}</h4>
          <ul class="space-y-2">
            <li><router-link to="/service-vente" class="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">{{ t('navigation.serviceSale') }}</router-link></li>
            <li><router-link to="/service-promoteur" class="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">{{ t('navigation.servicePromoter') }}</router-link></li>
            <li><router-link to="/service-vacances" class="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">{{ t('navigation.serviceVacation') }}</router-link></li>
            <li><router-link to="/service-location" class="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">{{ t('navigation.serviceLocation') }}</router-link></li>
            <li><router-link to="/coworking" class="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">{{ t('navigation.coworking') }}</router-link></li>
            <li><router-link to="/nos-tarifs" class="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">{{ t('navigation.pricing') }}</router-link></li>
          </ul>
        </div>

        <!-- Liens Utiles -->
        <div>
          <h4 class="text-lg font-semibold mb-4">{{ t('footer.usefulLinks') }}</h4>
          <ul class="space-y-2">
            <li><router-link to="/decouvrezMaroc" class="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">{{ t('footer.discoverMorocco') }}</router-link></li>
            <li><router-link to="/conseils" class="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">{{ t('footer.advice') }}</router-link></li>
            <li><router-link to="/contact" class="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">{{ t('footer.contact') }}</router-link></li>
          </ul>
        </div>

        <!-- Pages Légales -->
        <div>
          <h4 class="text-lg font-semibold mb-4">{{ t('footer.legalPages') }}</h4>
          <ul class="space-y-2">
            <li v-for="blog in footerBlogs" :key="blog.id">
              <a 
                v-if="blog && blog.slug"
                :href="`/conseils/${blog.slug}`" 
                class="text-gray-300 dark:text-gray-400 hover:text-white transition-colors"
              >
                {{ blog.short_title || blog.title }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { homeService } from '../services/homeService'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
const footerBlogs = ref([])

onMounted(async () => {
  try {
    const response = await homeService.getHomeData()
    const responseData = response.data || response
    footerBlogs.value = responseData.footer_blogs || []
  } catch (error) {
    // Silently handle API errors - footer blogs are optional
    footerBlogs.value = []
  }
})
</script>

