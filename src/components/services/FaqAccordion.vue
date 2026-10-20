<template>
  <div v-if="visibleItems.length" class="divide-y divide-gray-200 dark:divide-gray-700 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
    <div v-for="(item, i) in visibleItems" :key="i">
      <h3>
        <button
          :id="`${idPrefix}-q-${i}`"
          type="button"
          :aria-expanded="open === i"
          :aria-controls="`${idPrefix}-a-${i}`"
          :class="['w-full flex items-center justify-between gap-4 p-5 text-start font-semibold text-gray-900 dark:text-white focus:outline-none focus-visible:ring-2 rounded-2xl', colorClasses.ring]"
          @click="open = open === i ? null : i"
        >
          <TodoText :value="item.q" />
          <ChevronDown :size="20" :class="['flex-shrink-0 transition-transform', open === i ? 'rotate-180' : '', colorClasses.text]" aria-hidden="true" />
        </button>
      </h3>
      <div
        v-show="open === i"
        :id="`${idPrefix}-a-${i}`"
        role="region"
        :aria-labelledby="`${idPrefix}-q-${i}`"
        class="px-5 pb-5 text-gray-600 dark:text-gray-400"
      >
        <TodoText :value="item.a" tag="p" />
      </div>
    </div>
  </div>
</template>

<script setup>
// Usage: <FaqAccordion :items="c.faq" />   items: [{ q, a }]
// TODO items are dropped in production (renders nothing when none are left); the parent should also hide
// its section heading in that case: `SHOW_TODO || withoutTodo(items).length`.
import { ref, computed } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import { useServiceTheme } from '../../composables/useServiceTheme'
import { withoutTodo, SHOW_TODO } from '../../utils/todo'
import TodoText from './TodoText.vue'

const props = defineProps({
  items: { type: Array, default: () => [] },
  idPrefix: { type: String, default: 'faq' },
})

const { colorClasses } = useServiceTheme()
const open = ref(null)

const visibleItems = computed(() => (SHOW_TODO ? props.items : withoutTodo(props.items)))
</script>
