<template>
  <ul role="list" :class="compact ? 'space-y-2' : 'space-y-3'">
    <li v-for="(item, i) in items" :key="i" class="flex items-start gap-3">
      <component :is="iconComponent" :size="20" :class="['flex-shrink-0 mt-0.5', light ? 'text-white' : colorClasses.text]" aria-hidden="true" />
      <span v-if="typeof item === 'object'" :class="light ? 'text-white/90' : 'text-gray-700 dark:text-gray-300'">
        <strong :class="['block font-semibold', light ? 'text-white' : 'text-gray-900 dark:text-white']">{{ item.title }}</strong>
        <span class="block first-letter:uppercase">{{ item.text }}</span>
      </span>
      <TodoText v-else :value="item" :class="light ? 'text-white/90' : 'text-gray-700 dark:text-gray-300'" />
    </li>
  </ul>
</template>

<script setup>
// Usage: <CheckList :items="c.card.includes" />  ·  <CheckList :items="c.conditions.items" icon="info" />
// items: strings, or { title, text } objects. icon: 'check' | 'info' | 'shield'.
import { computed } from 'vue'
import { CheckCircle2, Info, ShieldCheck } from 'lucide-vue-next'
import { useServiceTheme } from '../../composables/useServiceTheme'
import TodoText from './TodoText.vue'

const props = defineProps({
  items: { type: Array, default: () => [] },
  icon: { type: String, default: 'check' },
  light: { type: Boolean, default: false },
  compact: { type: Boolean, default: false },
})

const { colorClasses } = useServiceTheme()
const iconComponent = computed(() => ({ info: Info, shield: ShieldCheck }[props.icon] || CheckCircle2))
</script>
