<template>
  <div v-if="secondTitle || description">
    <h2 v-if="secondTitle" class="text-2xl md:text-3xl font-semibold mb-4">{{ secondTitle }}</h2>
    <p v-if="description" class="text-gray-600">{{ description }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  ville: {
    type: String,
    default: ''
  },
  quartier: {
    type: String,
    default: ''
  },
  producttype: {
    type: Object,
    default: null
  }
})

const secondTitle = computed(() => {
  if (!props.producttype?.secondTitle) return ''
  
  let title = String(props.producttype.secondTitle)
  if (props.ville) {
    title = title.replace(/\(ville\)/g, props.ville)
  }
  if (props.quartier && props.quartier !== 'toutelaville' && props.quartier !== '') {
    title = title.replace(/à \(quartier\)|\(quartier\)/g, props.quartier)
  } else {
    title = title.replace(/à \(quartier\)|\(quartier\)/g, '')
  }
  title = title.replace(/et\/ou/g, '')
  return title.trim()
})

const description = computed(() => {
  if (!props.producttype?.description) return ''
  
  let desc = String(props.producttype.description)
  if (props.ville) {
    desc = desc.replace(/\(ville\)/g, props.ville)
  }
  if (props.quartier && props.quartier !== 'toutelaville' && props.quartier !== '') {
    desc = desc.replace(/à \(quartier\)|\(quartier\)/g, props.quartier)
  } else {
    desc = desc.replace(/à \(quartier\)|\(quartier\)/g, '')
  }
  desc = desc.replace(/et\/ou/g, '')
  return desc.trim()
})
</script>

