<template>
  <div v-if="advertising" class="agents-grid col-xl-3 col-md-4 col-12 mb-3">
    <a :href="addProductRoute">
      <img 
        :src="imageUrl" 
        :alt="advertising.title || 'Immobilier au Maroc'"
        class="img-responsive img-advertising w-full h-auto rounded-lg"
      />
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  advertising: {
    type: Object,
    default: null
  },
  ville: {
    type: String,
    default: ''
  }
})

const router = useRouter()

const imageUrl = computed(() => {
  if (!props.advertising?.main_image) return ''
  return `https://cdn.2p.ma/storage/advertising/${props.advertising.main_image}`
})

const addProductRoute = computed(() => {
  try {
    const route = router.resolve({ name: 'AddProduct' })
    return route.href || '/app'
  } catch {
    return '/app'
  }
})
</script>
