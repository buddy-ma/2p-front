<template>
  <router-link v-if="to" :to="localePath(to)" :class="classes">
    <slot />
    <ArrowRight v-if="arrow" :size="18" class="rtl:-scale-x-100" aria-hidden="true" />
  </router-link>
  <a v-else-if="href" :href="href" :class="classes">
    <slot />
    <ArrowRight v-if="arrow" :size="18" class="rtl:-scale-x-100" aria-hidden="true" />
  </a>
  <button v-else type="button" :class="classes">
    <slot />
    <ArrowRight v-if="arrow" :size="18" class="rtl:-scale-x-100" aria-hidden="true" />
  </button>
</template>

<script setup>
// Usage: <ServiceButton @click="buy('annoncePremium')" arrow>…</ServiceButton>
//        <ServiceButton to="/services/proprietaires/annonce-premium" variant="secondary">…</ServiceButton>
// `to` is a French path, localized here. variant: primary | secondary | ghost-light | light | link | link-light
import { computed } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
import { useServiceTheme } from '../../composables/useServiceTheme'
import { useLanguage } from '../../composables/useLanguage'

const props = defineProps({
  to: { type: String, default: '' },
  href: { type: String, default: '' },
  variant: { type: String, default: 'primary' },
  arrow: { type: Boolean, default: false },
})

const { colorClasses } = useServiceTheme()
const { getLocalizedPath: localePath } = useLanguage()

const classes = computed(() => {
  const cc = colorClasses.value
  const focus = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
  if (props.variant === 'link' || props.variant === 'link-light') {
    return [
      'inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline rounded',
      focus,
      props.variant === 'link-light' ? 'text-white focus-visible:ring-white focus-visible:ring-offset-transparent' : [cc.text, cc.ring, 'dark:focus-visible:ring-offset-gray-900'],
    ]
  }
  const base = ['inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors w-full sm:w-auto text-center', focus]
  const variants = {
    primary: [cc.bg, cc.hover, 'text-white shadow-md hover:shadow-lg', cc.ring, 'dark:focus-visible:ring-offset-gray-900'],
    secondary: ['bg-white dark:bg-gray-800 border', cc.text, cc.border, 'hover:bg-gray-50 dark:hover:bg-gray-700', cc.ring, 'dark:focus-visible:ring-offset-gray-900'],
    'ghost-light': 'border-2 border-white/80 text-white hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-transparent',
    light: ['bg-white hover:bg-gray-100', cc.text, 'focus-visible:ring-white focus-visible:ring-offset-transparent'],
  }
  return [...base, variants[props.variant] || variants.primary]
})
</script>
