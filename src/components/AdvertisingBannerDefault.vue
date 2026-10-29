<template>
  <div class="container max-w-6xl mx-auto px-4 my-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="col-md-6 col-12">
        <a :href="SITE_HOME">
          <img src="../assets/images/advertising/immobilier-a-vendre-au-Maroc.webp" width="601" height="200"
            alt="Annonces d'immobilier à vendre au Maroc" class="w-full h-auto rounded-lg" />
        </a>
      </div>
      <div class="col-md-6 col-12">
        <a :href="SITE_HOME">
          <img src="../assets/images/advertising/immobilier-a-louer-au-Maroc.webp" width="601" height="200"
            alt="Annonces d'immobilier à louer au Maroc" class="w-full h-auto rounded-lg" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { SITE_HOME } from '../utils/publicLink'

defineProps({
  categoryId: {
    type: Number,
    default: null
  }
})
</script>
