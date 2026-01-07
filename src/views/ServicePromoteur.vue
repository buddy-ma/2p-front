<template>
  <div class="service-promoteur">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-green-600 to-green-700 py-20 mt-20 rounded-3xl mx-4 md:mx-auto max-w-7xl">
      <div class="absolute inset-0 bg-black opacity-30 rounded-3xl"></div>
      <div class="container mx-auto px-4 relative z-10 text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">Service Promoteur</h1>
        <p class="text-white text-lg max-w-3xl mx-auto mb-6">
          Gérez vos projets immobiliers neufs avec nos solutions complètes pour promoteurs
        </p>
        <button class="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
          En savoir plus
        </button>
      </div>
    </section>

    <!-- Features Section -->
    <section class="container mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Nos Services</h2>
        <p class="text-gray-600">Des solutions adaptées à vos besoins</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Gestion Complète</h3>
          <p class="text-gray-600">Gérez tous vos projets immobiliers en un seul endroit</p>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Visibilité Accrue</h3>
          <p class="text-gray-600">Mettez en avant vos projets pour attirer plus de clients</p>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Tarifs Transparents</h3>
          <p class="text-gray-600">Des forfaits clairs et adaptés à votre activité</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-green-600 text-white py-16">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">Prêt à commencer ?</h2>
        <p class="text-lg mb-8">Rejoignez nos promoteurs et développez votre activité</p>
        <button class="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          S'abonner maintenant
        </button>
      </div>
    </section>

    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
    </div>
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-4 my-8">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { serviceService } from '../services/serviceService'

const data = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    loading.value = true
    error.value = null
    const response = await serviceService.getServiceData('service-promoteur')
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
.service-promoteur {
  min-height: 100vh;
}
</style>
