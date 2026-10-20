<template>
  <ul role="list" :class="['grid gap-5', gridCols]">
    <li
      v-for="(item, i) in items"
      :key="i"
      class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
    >
      <CheckCircle2 :size="28" :class="['mb-3', colorClasses.text]" aria-hidden="true" />
      <h3 class="font-semibold text-gray-900 dark:text-white text-lg">{{ item.title }}</h3>
      <p class="mt-2 text-gray-600 dark:text-gray-400 first-letter:uppercase">{{ item.text }}</p>
    </li>
  </ul>
</template>

<script setup>
// Usage: <BenefitGrid :items="c.why.items" :cols="2" />   items: [{ title, text }]
import { computed } from 'vue'
import { CheckCircle2 } from 'lucide-vue-next'
import { useServiceTheme } from '../../composables/useServiceTheme'

const props = defineProps({
  items: { type: Array, default: () => [] },
  cols: { type: Number, default: 3 },
})

const { colorClasses } = useServiceTheme()

const gridCols = computed(() => ({
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
}[props.cols] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'))
</script>
