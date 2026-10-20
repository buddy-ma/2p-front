<template>
  <section :aria-labelledby="titleId" class="bg-white dark:bg-gray-900">
    <div
      :class="[
        'container mx-auto px-4 max-w-3xl py-12 md:py-16 text-center',
        card ? 'md:px-12 my-12 md:my-16 rounded-3xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 w-[calc(100%-2rem)]' : '',
      ]"
    >
      <p v-if="eyebrow" :class="['text-sm font-semibold uppercase tracking-wide mb-2', colorClasses.text]">{{ eyebrow }}</p>
      <h2 :id="titleId" :class="['text-2xl md:text-3xl font-bold leading-snug', colorClasses.text]">{{ title }}</h2>
      <p v-if="text" class="mt-4 text-lg text-gray-600 dark:text-gray-400">{{ text }}</p>
      <slot />
    </div>
  </section>
</template>

<script setup>
// Usage: <ServiceStatement :title="c.closing.title" :text="c.closing.text" />  (centered closing statement)
//        <ServiceStatement card :eyebrow="…" :title="…"><p>disclaimer</p></ServiceStatement>  (boxed variant)
import { useId } from 'vue'
import { useServiceTheme } from '../../composables/useServiceTheme'

defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  text: { type: String, default: '' },
  card: { type: Boolean, default: false },
})

const { colorClasses } = useServiceTheme()
const titleId = useId()
</script>
