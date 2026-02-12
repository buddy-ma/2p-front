<template>
  <div v-if="secondTitle || description">
    <h2 v-if="secondTitle" class="text-2xl md:text-3xl font-semibold mb-4">{{ secondTitle }}</h2>
    <p v-if="description" class="text-gray-600">{{ description }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n'

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

const { t } = useI18n()

const translateCity = (cityTitle) => {
  if (!cityTitle) return ''

  const normalized = cityTitle.replace(/-/g, ' ').split(' ').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ')

  let translation = t(`common.cities.${normalized}`)
  if (translation === `common.cities.${normalized}`) {
    translation = t(`common.cities.${normalized.toLowerCase()}`)
  }

  if (translation && translation !== `common.cities.${normalized}` && translation !== `common.cities.${normalized.toLowerCase()}`) {
    return translation
  }

  return normalized
}

const translateQuartier = (quartierTitle) => {
  if (!quartierTitle) return ''

  const normalized = quartierTitle.replace(/-/g, ' ')
  let translation = t(`common.quartiers.${normalized}`)
  if (translation === `common.quartiers.${normalized}`) {
    translation = t(`common.quartiers.${normalized.toLowerCase()}`)
  }

  if (translation && translation !== `common.quartiers.${normalized}` && translation !== `common.quartiers.${normalized.toLowerCase()}`) {
    return translation
  }

  return normalized
}

const localizedVille = computed(() => translateCity(props.ville))
const localizedQuartier = computed(() => translateQuartier(props.quartier))

const secondTitle = computed(() => {
  if (!props.producttype?.secondTitle) return ''

  let title = String(props.producttype.secondTitle)
  if (localizedVille.value) {
    title = title.replace(/\(ville\)/g, localizedVille.value)
  }
  if (localizedQuartier.value && props.quartier !== 'toutelaville' && props.quartier !== '') {
    title = title.replace(/à \(quartier\)|\(quartier\)/g, localizedQuartier.value)
  } else {
    title = title.replace(/à \(quartier\)|\(quartier\)/g, '')
  }
  title = title.replace(/et\/ou/g, '')
  return title.trim()
})

const description = computed(() => {
  if (!props.producttype?.description) return ''

  let desc = String(props.producttype.description)
  if (localizedVille.value) {
    desc = desc.replace(/\(ville\)/g, localizedVille.value)
  }
  if (localizedQuartier.value && props.quartier !== 'toutelaville' && props.quartier !== '') {
    desc = desc.replace(/à \(quartier\)|\(quartier\)/g, localizedQuartier.value)
  } else {
    desc = desc.replace(/à \(quartier\)|\(quartier\)/g, '')
  }
  desc = desc.replace(/et\/ou/g, '')
  return desc.trim()
})
</script>
