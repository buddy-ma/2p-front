<template>
  <div class="agents-grid col-xl-3 col-md-4 col-12 mb-3">
    <a :href="addProductRoute">
      <img 
        src="../assets/images/advertising/Ajouter-une-annonce-immobilière-Maroc.webp" 
        width="301" 
        height="551" 
        alt="Ajouter une annonce immobilière Maroc"
        class="img-responsive img-advertising w-full h-auto rounded-lg"
      />
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const addProductRoute = computed(() => {
  try {
    const route = router.resolve({ name: 'AddProduct' })
    return route.href || '/app'
  } catch {
    return '/app'
  }
})
</script>
