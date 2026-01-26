<template>
  <div class="container max-w-6xl mx-auto px-4 my-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="col-md-6 col-12">
        <a :href="addProductRoute">
          <img src="../assets/images/advertising/immobilier-a-vendre-au-Maroc.webp" width="601" height="200"
            alt="Annonces d'immobilier à vendre au Maroc" class="w-full h-auto rounded-lg" />
        </a>
      </div>
      <div class="col-md-6 col-12">
        <a :href="addProductRoute">
          <img src="../assets/images/advertising/immobilier-a-louer-au-Maroc.webp" width="601" height="200"
            alt="Annonces d'immobilier à louer au Maroc" class="w-full h-auto rounded-lg" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  categoryId: {
    type: Number,
    default: null
  }
})

const router = useRouter()

// Get the route for adding a product (equivalent to route('show-visiteur-add'))
const addProductRoute = computed(() => {
  try {
    // Try to resolve the AddProduct route
    const route = router.resolve({ name: 'AddProduct' })
    return route.href || '/app'
  } catch {
    // Fallback to '/app' if route doesn't exist
    return '/app'
  }
})
</script>
