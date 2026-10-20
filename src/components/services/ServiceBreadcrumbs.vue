<template>
  <nav aria-label="Breadcrumb">
    <ol class="flex flex-wrap items-center gap-2 text-sm">
      <li v-for="(item, i) in items" :key="i" class="flex items-center gap-2">
        <ChevronRight v-if="i > 0" :size="14" class="rtl:-scale-x-100 opacity-60" aria-hidden="true" />
        <router-link
          v-if="item.to && i < items.length - 1"
          :to="localePath(item.to)"
          :class="['hover:underline underline-offset-4 rounded focus:outline-none focus-visible:ring-2', light ? 'text-white/80 hover:text-white focus-visible:ring-white' : `text-gray-600 dark:text-gray-400 ${colorClasses.ring}`]"
        >{{ item.label }}</router-link>
        <span
          v-else
          :aria-current="i === items.length - 1 ? 'page' : undefined"
          :class="light ? 'text-white font-medium' : 'text-gray-900 dark:text-white font-medium'"
        >{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
// Usage: <ServiceBreadcrumbs :items="[{ label: 'Accueil', to: '/' }, { label: 'Annonce Premium' }]" light />
// `to` is a French path; it is localized (/ar/...) here.
import { ChevronRight } from 'lucide-vue-next'
import { useLanguage } from '../../composables/useLanguage'
import { useServiceTheme } from '../../composables/useServiceTheme'

defineProps({
  items: { type: Array, default: () => [] },
  light: { type: Boolean, default: false },
})

const { getLocalizedPath: localePath } = useLanguage()
const { colorClasses } = useServiceTheme()
</script>
