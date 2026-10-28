<template>
  <component
    :is="as"
    :id="id || undefined"
    :aria-labelledby="title && id ? `${id}-title` : undefined"
    :class="['scroll-mt-20', toneClass]"
  >
    <div :class="['container mx-auto px-4', compact ? 'py-8 md:py-10' : 'py-16 md:py-20', narrow ? 'max-w-4xl' : 'max-w-6xl']">
      <header v-if="title || eyebrow" :class="[compact ? 'mb-5' : 'mb-10 md:mb-12', center ? 'text-center mx-auto max-w-3xl' : 'text-start']">
        <p v-if="eyebrow" :class="['text-sm font-semibold uppercase tracking-wide mb-2', tone === 'brand' ? 'text-white/80' : colorClasses.text]">
          {{ eyebrow }}
        </p>
        <h2
          v-if="title"
          :id="id ? `${id}-title` : undefined"
          :class="[compact ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl', strong ? 'font-bold' : 'font-semibold', tone === 'brand' ? 'text-white' : colorClasses.text]"
        >{{ title }}</h2>
        <p v-if="intro" :class="['mt-3 text-lg', center ? '' : 'max-w-3xl', tone === 'brand' ? 'text-white/90' : 'text-gray-600 dark:text-gray-400']">
          {{ intro }}
        </p>
      </header>
      <slot />
    </div>
  </component>
</template>

<script setup>
// Usage: <ServiceSection id="inclus" :title="c.includes.title" tone="muted"> … </ServiceSection>
// tone: 'white' | 'muted' | 'brand'. The h2 gets id="<id>-title" and the section is labelled by it.
import { computed } from 'vue'
import { useServiceTheme } from '../../composables/useServiceTheme'

const props = defineProps({
  id: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  title: { type: String, default: '' },
  intro: { type: String, default: '' },
  tone: { type: String, default: 'white' },
  as: { type: String, default: 'section' },
  center: { type: Boolean, default: false },
  strong: { type: Boolean, default: false },
  narrow: { type: Boolean, default: false },
  compact: { type: Boolean, default: false },
})

const { colorClasses } = useServiceTheme()

const toneClass = computed(() => {
  if (props.tone === 'muted') return 'bg-gray-50 dark:bg-gray-800/40'
  if (props.tone === 'brand') return `${colorClasses.value.bgDark} text-white`
  return 'bg-white dark:bg-gray-900'
})
</script>
