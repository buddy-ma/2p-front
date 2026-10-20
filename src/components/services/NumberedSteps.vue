<template>
  <ol v-if="layout === 'grid'" :class="['grid gap-5', gridCols]" role="list">
    <li
      v-for="(item, i) in items"
      :key="i"
      :class="[
        'flex items-start gap-4 rounded-2xl bg-white dark:bg-gray-800 border shadow-sm',
        compact ? 'p-4' : 'p-6',
        isHighlighted(item, i) ? ['border-2', colorClasses.border] : 'border-gray-100 dark:border-gray-700',
      ]"
    >
      <span :class="badgeClass" aria-hidden="true">{{ number(item, i) }}</span>
      <div class="min-w-0">
        <component :is="headingTag" v-if="item.title" :class="titleClass">{{ item.title }}</component>
        <p
          v-for="(p, j) in paragraphs(item)"
          :key="j"
          :class="[item.title ? 'text-gray-600 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200 font-medium', compact ? 'text-sm' : '', j > 0 || item.title ? 'mt-2' : '']"
        >{{ p }}</p>
      </div>
    </li>
  </ol>
  <ol v-else :class="['relative', horizontal ? ['lg:grid lg:gap-6', timelineCols] : '']" role="list">
    <li
      v-for="(item, i) in items"
      :key="i"
      :class="['relative flex gap-4 pb-8 last:pb-0', horizontal ? 'lg:flex-col lg:pb-0' : '']"
    >
      <template v-if="i < items.length - 1">
        <span :class="['absolute start-6 top-12 bottom-0 w-px bg-gray-200 dark:bg-gray-700', horizontal ? 'lg:hidden' : '']" aria-hidden="true"></span>
        <span v-if="horizontal" class="hidden lg:block absolute top-6 start-14 -end-4 h-px bg-gray-200 dark:bg-gray-700" aria-hidden="true"></span>
      </template>
      <span :class="[badgeClass, 'relative z-10']" aria-hidden="true">{{ number(item, i) }}</span>
      <div :class="['min-w-0 flex-1', isHighlighted(item, i) ? ['border-2 rounded-2xl p-4 bg-white dark:bg-gray-800', colorClasses.border] : 'pt-2', horizontal && !isHighlighted(item, i) ? 'lg:pt-0' : '']">
        <component :is="headingTag" v-if="item.title" :class="titleClass">{{ item.title }}</component>
        <p
          v-for="(p, j) in paragraphs(item)"
          :key="j"
          :class="[item.title ? 'text-gray-600 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200', compact ? 'text-sm' : '', j > 0 || item.title ? 'mt-2' : '']"
        >{{ p }}</p>
        <slot :name="`after-${number(item, i)}`" />
      </div>
    </li>
  </ol>
</template>

<script setup>
// Usage: <NumberedSteps :items="c.how.items" layout="timeline" />
//        <NumberedSteps :items="c.includes.items" layout="grid" :cols="3" />
// items: [{ n, title, text }] — text can be a string or an array of paragraphs; empty title shows the text only;
// empty n is replaced by the index (01, 02…). `highlight` = the n of the item to emphasise.
// Timeline items expose a slot named after their number, e.g. <template #after-01>…</template>.
import { computed } from 'vue'
import { useServiceTheme } from '../../composables/useServiceTheme'

const props = defineProps({
  items: { type: Array, default: () => [] },
  layout: { type: String, default: 'grid' },
  cols: { type: Number, default: 2 },
  horizontal: { type: Boolean, default: true },
  compact: { type: Boolean, default: false },
  highlight: { type: String, default: '' },
  headingLevel: { type: Number, default: 3 },
})

const { colorClasses } = useServiceTheme()

const headingTag = computed(() => `h${props.headingLevel}`)
const badgeClass = computed(() => [
  'flex-shrink-0 rounded-full text-white font-bold flex items-center justify-center',
  props.compact ? 'w-10 h-10 text-sm' : 'w-12 h-12',
  colorClasses.value.bg,
])
const titleClass = computed(() => ['font-semibold text-gray-900 dark:text-white', props.compact ? 'text-base' : 'text-lg'])

const gridCols = computed(() => ({
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
}[props.cols] || 'grid-cols-1 md:grid-cols-2'))

const timelineCols = computed(() => ({
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
}[props.items.length] || 'lg:grid-cols-4'))

const number = (item, i) => item.n || String(i + 1).padStart(2, '0')
const paragraphs = (item) => (Array.isArray(item.text) ? item.text : [item.text]).filter(Boolean)
const isHighlighted = (item, i) => !!props.highlight && number(item, i) === props.highlight
</script>
