<template>
  <div v-if="advertisements && advertisements.length > 0" class="bg-gray-50 py-4 mb-3">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a 
          v-for="(advertising, index) in advertisements" 
          :key="index"
          :href="advertising.link || '#'" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <img 
            :src="getImageUrl(advertising)" 
            :alt="advertising.title || 'Publicité'"
            class="w-full h-auto rounded-lg"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  advertisements: {
    type: Array,
    default: () => []
  }
})

const getImageUrl = (advertising) => {
  if (!advertising?.main_image) return ''
  return `https://cdn.2p.ma/storage/advertising/${advertising.main_image}`
}
</script>

