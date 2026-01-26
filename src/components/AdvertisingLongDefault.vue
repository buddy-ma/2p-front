<template>
  <div class="container max-w-6xl mx-auto px-4 my-8">
    <a href="/app">
      <img src="../assets/images/advertising/V4-02.jpg" width="1268" height="200"
        alt="Annonces d'immobilier neuf à vendre au Maroc" class="w-full h-auto" />
    </a>
  </div>
</template>

<script setup>

const props = defineProps({
  categoryId: {
    type: Number,
    default: null
  }
})

</script>
