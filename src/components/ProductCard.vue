<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer" @click="goToProduct">
    <div class="relative w-full h-48">
      <img
        :src="productImage"
        :alt="product.title"
        class="w-full h-48 object-cover"
      />
      <div class="absolute inset-0 bg-black opacity-20"></div>
      
      <!-- Badges container using flexbox -->
      <div class="absolute inset-0 flex justify-between items-start p-2 pointer-events-none">
        <!-- Left side badges -->
        <div class="flex flex-col gap-2 pointer-events-auto">
          <span
            v-if="product.vendu"
            class="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold"
          >
            {{ t('product.sold') }}
          </span>
          <span
            v-if="product.isPremium"
            class="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold shadow flex items-center gap-1"
          >
            <Tag class="w-3 h-3" />
            {{ t('product.premium') }}
          </span>
        </div>
        
        <!-- Right side badges -->
        <div class="flex flex-col gap-2 pointer-events-auto">
          <span :class="`${colorClasses.bg} text-white px-2 py-1 rounded text-xs font-semibold`">
            {{ product.category?.title || t('product.realEstate') }}
          </span>
        </div>
      </div>
      
      <!-- 3D View overlay (centered) -->
      <span v-if="product.vr_link" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
        <img :src="vr3d" :alt="t('product.view3D')" class="w-auto h-12">
      </span>
    </div>
    <div class="p-4">
      <div class="flex justify-between items-start mb-2">
        <span class="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
          {{ product.type?.title || t('product.type') }}
        </span>
        <span v-if="product.special_badges?.length > 0" class="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
          {{ product.special_badges.join(', ') }}
        </span>
      </div>
      <h3 class="font-bold text-lg mb-2 line-clamp-2 text-gray-900 dark:text-gray-100">{{ product.title }}</h3>
      <p class="text-gray-600 dark:text-gray-400 text-sm mb-3 flex items-center">
        <svg class="w-4 h-4 me-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {{ (product.ville + ', ' + product.quartier + ', ' + product.address).slice(0, 32) }}...
      </p>
      <div class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
        <span v-if="product.nbr_chambres" class="flex items-center">
          <svg class="w-4 h-4 me-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          {{ product.nbr_chambres }} {{ t('product.rooms') }}
        </span>
        <span v-if="product.surface" class="flex items-center">
          <svg class="w-4 h-4 me-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
          {{ product.surface }} {{ t('product.surface') }}
        </span>
      </div>
      <div class="flex items-center justify-between ayman">
        <span v-if="product.vendu" class="text-red-500 line-through text-lg font-bold" v-text="plainPrice">
        </span>
        <span v-else :class="`${colorClasses.text} text-xl font-bold`" v-text="plainPrice">
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import vr3d from '../assets/images/icons/3d-view.webp'
import { Tag } from 'lucide-vue-next'
import { useTheme } from '../composables/useTheme'
import { useI18n } from '../composables/useI18n'

const { colorClasses } = useTheme()
const { t } = useI18n()
const props = defineProps({
  product: {
    type: Object,
    required: true,
  }
})

const router = useRouter()

const productImage = computed(() => {
  if (props.product.first_image?.image) {
    return `https://cdn.2p.ma/product/images/${props.product.first_image.image}`
  }
  return 'http://localhost:8000/admin_assets/images/products/1.webp'
})

const plainPrice = computed(() => {
  if (!props.product.formatted_price) return ''
  // Strip HTML tags and decode HTML entities
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = props.product.formatted_price
  return tempDiv.textContent || tempDiv.innerText || ''
})

const goToProduct = () => {
  router.push(`/annonce/${props.product.slug}`)
}
</script>

