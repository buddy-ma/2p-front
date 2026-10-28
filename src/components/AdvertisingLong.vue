<template>
  <div v-if="advertising" class="py-4">
    <div class="container mx-auto px-4">
      <a :href="adHref(advertising.link)" target="_blank" rel="noopener noreferrer">
        <img :src="imageUrl" :alt="advertising.title || 'Publicité'" class="w-full h-auto rounded-lg" />
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { adHref } from '../utils/publicLink'

const props = defineProps({
  advertising: {
    type: Object,
    default: null
  }
})

const imageUrl = computed(() => {
  if (!props.advertising?.main_image) return ''
  return `https://cdn.2p.ma/storage/advertising/${props.advertising.main_image}`
})
</script>
