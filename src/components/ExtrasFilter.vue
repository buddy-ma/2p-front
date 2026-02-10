<template>
  <section v-if="shouldShow" class="mt-2 overflow-x-auto container mx-auto max-w-6xl px-4 md:px-10 z-10">
    <div class="flex flex-wrap items-center justify-center gap-2">
      <template v-for="(translated, originale, index) in sortedExtras" :key="originale">
        <a :href="getExtraUrl(originale)" :class="[
          'inline-flex items-center px-3 py-1 text-sm rounded-full transition-all duration-200',
          isSelected(originale)
            ? `${colorClasses.bg} text-white shadow-sm`
            : [
              'bg-white/50',
              'text-gray-100',
              'border',
              'border-gray-300',
              `hover:${colorClasses.bg}`,
              'hover:bg-white/30',
              'hover:border-transparent'
            ].join(' '),
          index >= showMoreLimit && !isExpanded ? 'hidden' : ''
        ]" @click.prevent="handleExtraClick(originale)">
          {{ translated }}
        </a>
      </template>
      <button v-if="extrasCount > showMoreLimit" type="button" :class="[
        'inline-flex items-center px-3 py-1 text-sm rounded-full transition-all duration-200 cursor-pointer',
        'bg-white',
        colorClasses.text,
        'border',
        'border-gray-300',
        `hover:${colorClasses.bg}`,
      ].join(' ')" @click.prevent="toggleShowMore">
        {{ isExpanded ? t('hero.showLess') : t('hero.showMore') }}
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTheme } from '../composables/useTheme'
import { useI18n } from '../composables/useI18n'
import { getLocalizedPath } from '../utils/routeHelpers'

const props = defineProps({
  extras: {
    type: Object,
    default: () => ({})
  },
  extra: {
    type: Array,
    default: () => []
  },
  ville: {
    type: String,
    default: ''
  },
  quartier: {
    type: String,
    default: ''
  },
  typesImmobilier: {
    type: Array,
    default: () => []
  },
  showMoreLimit: {
    type: Number,
    default: 7
  },
  containerClass: {
    type: String,
    default: ''
  },
  sectionClass: {
    type: String,
    default: ''
  },
  isMobile: {
    type: Boolean,
    default: false
  }
})

const { colorClasses } = useTheme()
const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const isExpanded = ref(false)

const shouldShow = computed(() => {
  return props.typesImmobilier && props.typesImmobilier.length > 0 && props.typesImmobilier[0] !== ''
})

const extrasCount = computed(() => {
  return Object.keys(props.extras || {}).length
})

// Sort extras so selected ones appear first
const sortedExtras = computed(() => {
  const extras = props.extras || {}
  const entries = Object.entries(extras)

  return entries.sort(([keyA], [keyB]) => {
    const aSelected = props.extra && props.extra.includes(keyA)
    const bSelected = props.extra && props.extra.includes(keyB)

    if (aSelected && !bSelected) return -1
    if (!aSelected && bSelected) return 1
    return 0
  }).reduce((acc, [key, value]) => {
    acc[key] = value
    return acc
  }, {})
})

const isSelected = (originale) => {
  return props.extra && props.extra.includes(originale)
}

// Helper function to build path with extra added/removed
const buildPathWithExtra = (originale) => {
  const locale = localStorage.getItem('app_locale') || 'fr'

  // Get current path without locale prefix
  let path = route.path

  // Remove locale prefix if present
  if (path.startsWith(`/${locale}/`)) {
    path = path.substring(`/${locale}/`.length)
  } else if (path === `/${locale}`) {
    path = ''
  } else if (path.startsWith('/')) {
    path = path.substring(1)
  }

  // Normalize the extra value
  const normalizedOriginale = originale.replace(/\s+/g, '-')

  // Get all available extras (normalized)
  const allExtras = Object.keys(props.extras || {}).map(key => key.replace(/\s+/g, '-').toLowerCase())

  // Split path and filter out empty segments
  const pathSegments = path.split('/').filter(segment => segment !== '')

  // Check if this specific extra is already in the path
  const extraIndex = pathSegments.findIndex(segment =>
    segment.toLowerCase() === normalizedOriginale.toLowerCase() ||
    decodeURIComponent(segment).toLowerCase() === originale.toLowerCase()
  )

  // Remove ALL extras from path segments (not just the current one)
  const cleanedSegments = pathSegments.filter(segment => {
    const normalizedSegment = segment.toLowerCase()
    return !allExtras.includes(normalizedSegment)
  })

  // Build new path
  let newPath = ''
  if (extraIndex !== -1) {
    // Extra was already selected, just remove it (and any other extras)
    newPath = '/' + cleanedSegments.join('/')
  } else {
    // Extra not selected, add it to the cleaned path
    if (cleanedSegments.length > 0) {
      newPath = '/' + cleanedSegments.join('/') + '/' + normalizedOriginale
    } else {
      newPath = '/' + normalizedOriginale
    }
  }

  return { newPath, locale }
}

// Build URL for extra filter - preserving current path and query parameters
const getExtraUrl = (originale) => {
  const { newPath, locale } = buildPathWithExtra(originale)

  // Preserve all query parameters from the current route
  const query = { ...route.query }

  // Build localized path with query parameters
  const localizedPath = getLocalizedPath(newPath, locale)

  // Add query parameters to the URL
  const queryString = Object.keys(query)
    .map(key => {
      const value = query[key]
      if (Array.isArray(value)) {
        return value.map(v => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`).join('&')
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    })
    .filter(Boolean)
    .join('&')

  return queryString ? `${localizedPath}?${queryString}` : localizedPath
}

const handleExtraClick = (originale) => {
  const { newPath, locale } = buildPathWithExtra(originale)

  // Preserve all query parameters from the current route
  const query = { ...route.query }

  // Build localized path
  const localizedPath = getLocalizedPath(newPath, locale)

  // Navigate with path and query
  router.push({
    path: localizedPath,
    query: query
  })
}

const toggleShowMore = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<style scoped>
.extra-visible {
  display: inline-block;
}

.extra-hidden {
  display: none;
}
</style>
