<template>
  <component :is="tag" v-if="value && !todo" v-bind="$attrs">{{ value }}</component>
  <component
    :is="tag"
    v-else-if="value && SHOW_TODO"
    v-bind="$attrs"
    class="inline-block border-2 border-dashed border-yellow bg-yellow/10 text-gray-800 dark:text-gray-100 px-2 py-0.5 rounded text-sm font-normal normal-case tracking-normal"
    title="Placeholder – to be validated"
  >{{ value }}</component>
</template>

<script setup>
// Usage: <TodoText :value="c.tagline" tag="p" class="..." />
// Renders the string. "[TODO…" placeholders show as a yellow dashed badge in dev and render nothing in production.
import { computed, watchEffect } from 'vue'
import { isTodo, SHOW_TODO } from '../../utils/todo'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  value: { type: String, default: '' },
  tag: { type: String, default: 'span' },
})

const todo = computed(() => isTodo(props.value))

watchEffect(() => {
  if (todo.value && !SHOW_TODO) console.warn(props.value)
})
</script>
