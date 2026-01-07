<template>
  <footer class="bg-gray-900 text-white mt-12">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Logo -->
        <div>
          <img src="http://localhost:8000/assets/images/logo-blue-white.svg" alt="2P" class="h-12 mb-4" />
        </div>

        <!-- Nos Services -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Nos Services</h4>
          <ul class="space-y-2">
            <li><router-link to="/service-vente" class="text-gray-300 hover:text-white">Service Vente</router-link></li>
            <li><router-link to="/service-promoteur" class="text-gray-300 hover:text-white">Service Promoteur</router-link></li>
            <li><router-link to="/service-vacances" class="text-gray-300 hover:text-white">Service Vacances</router-link></li>
            <li><router-link to="/service-location" class="text-gray-300 hover:text-white">Service Location</router-link></li>
            <li><router-link to="/coworking" class="text-gray-300 hover:text-white">Coworking</router-link></li>
            <li><router-link to="/nos-tarifs" class="text-gray-300 hover:text-white">Nos Tarifs</router-link></li>
          </ul>
        </div>

        <!-- Liens Utiles -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Liens Utiles</h4>
          <ul class="space-y-2">
            <li><router-link to="/decouvrezMaroc" class="text-gray-300 hover:text-white">Découvrez le Maroc</router-link></li>
            <li><router-link to="/conseils" class="text-gray-300 hover:text-white">Conseils</router-link></li>
            <li><router-link to="/contact" class="text-gray-300 hover:text-white">Contact</router-link></li>
          </ul>
        </div>

        <!-- Pages Légales -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Pages Légales</h4>
          <ul class="space-y-2">
            <li v-for="blog in footerBlogs" :key="blog.id">
              <router-link :to="`/conseils/${blog.slug}`" class="text-gray-300 hover:text-white">
                {{ blog.short_title || blog.title }}
              </router-link>
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

