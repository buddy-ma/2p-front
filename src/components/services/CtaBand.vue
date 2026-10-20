<template>
  <section :aria-labelledby="title ? titleId : undefined" class="bg-white dark:bg-gray-900">
    <div class="container mx-auto px-4 max-w-6xl py-12 md:py-16">
      <div :class="['rounded-3xl text-white p-8 md:p-12 text-start', colorClasses.bgDark]">
        <div class="max-w-3xl">
          <h2 v-if="title" :id="titleId" class="text-2xl md:text-3xl font-bold">{{ title }}</h2>
          <p v-if="text" class="mt-4 text-lg text-white/90">{{ text }}</p>
          <p v-if="priceLine" class="mt-6 inline-block rounded-2xl bg-white/15 px-5 py-3 text-lg md:text-xl font-bold" dir="auto">
            {{ priceLine }}
          </p>
        </div>
        <div v-if="$slots.actions" class="mt-8 flex flex-col sm:flex-row sm:items-center flex-wrap gap-4">
          <slot name="actions" />
        </div>
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup>
// Usage: <CtaBand :title="c.finalCta.title" :text="c.finalCta.text" :price-line="…">
//          <template #actions><ServiceButton variant="light" …/></template>
//        </CtaBand>
import { useId } from 'vue'
import { useServiceTheme } from '../../composables/useServiceTheme'

defineProps({
  title: { type: String, default: '' },
  text: { type: String, default: '' },
  priceLine: { type: String, default: '' },
})

const { colorClasses } = useServiceTheme()
const titleId = useId()
</script>
