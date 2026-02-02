<template>
  <section
    v-if="shouldShow"
    class="mt-2 overflow-x-auto container mx-auto max-w-6xl px-4 md:px-10 z-10"
  >
    <div class="flex flex-wrap items-center justify-center gap-2">
      <template
        v-for="(translated, originale, index) in sortedExtras"
        :key="originale"
      >
        <a
          :href="getExtraUrl(originale)"
          :class="[
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
          ]"
          @click.prevent="handleExtraClick(originale)"
        >
          {{ translated }}
        </a>
      </template>
      <button
        v-if="extrasCount > showMoreLimit"
        type="button"
        :class="[
          'inline-flex items-center px-3 py-1 text-sm rounded-full transition-all duration-200 cursor-pointer',
          'bg-white',
          colorClasses.text,
          'border',
          'border-gray-300',
          `hover:${colorClasses.bg}`,
        ].join(' ')"
        @click.prevent="toggleShowMore"
      >
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

// Build URL for extra filter - matching Blade template logic
const getExtraUrl = (originale) => {
  const locale = localStorage.getItem('app_locale') || 'fr'

  // Get base route from path (matching Blade's Request::path() first segment logic)
  let path = route.path

  // Remove locale prefix if present
  if (path.startsWith(`/${locale}/`)) {
    path = path.substring(`/${locale}/`.length)
  } else if (path === `/${locale}`) {
    path = ''
  } else if (path.startsWith('/')) {
    path = path.substring(1)
  }

  // Get first segment (base route) - matching Blade's substr($url, 0, $firstSlash)
  const firstSlash = path.indexOf('/')
  const baseRoute = firstSlash !== -1 ? path.substring(0, firstSlash) : path

  // Build link path matching Blade template logic
  let link = ''
  if (props.ville && props.ville !== 'maroc' && props.ville !== '') {
    link += '/' + props.ville.replace(/\s+/g, '-')
    if (props.quartier && props.quartier !== 'toutelaville' && props.quartier !== '') {
      link += '/' + props.quartier.replace(/\s+/g, '-')
      if (props.typesImmobilier && props.typesImmobilier[0] && props.typesImmobilier[0] !== '') {
        const typeValue = String(props.typesImmobilier[0]).replace(/\s+/g, '-')
        link += '/' + typeValue
      }
    } else if (props.typesImmobilier && props.typesImmobilier[0] && props.typesImmobilier[0] !== '') {
      link += '/toutelaville/' + String(props.typesImmobilier[0]).replace(/\s+/g, '-')
    }
  }

  // Determine if we should add or remove the extra (matching Blade logic)
  const currentExtra = props.extra && props.extra[0] ? props.extra[0] : ''
  const normalizedOriginale = originale.replace(/\s+/g, '-')

  let href = ''
  if (!currentExtra || currentExtra === '') {
    // No extra selected, add it
    href = '/' + baseRoute + link + '/' + normalizedOriginale
  } else {
    if (!props.extra.includes(originale)) {
      // Extra not in selected list, add it
      href = '/' + baseRoute + link + '/' + normalizedOriginale
    } else {
      // Extra already selected, remove it
      href = '/' + baseRoute + link
    }
  }

  // Clean up the URL
  href = href.replace(/\s+/g, '-').replace(/%20/g, '-')

  // Build localized path
  return getLocalizedPath(href, locale)
}

const handleExtraClick = (originale) => {
  const url = getExtraUrl(originale)
  router.push(url)
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
