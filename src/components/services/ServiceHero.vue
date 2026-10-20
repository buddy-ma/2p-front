<template>
  <section
    :aria-labelledby="titleId"
    :class="['relative rounded-3xl overflow-hidden mx-4 lg:mx-auto max-w-7xl mt-6 flex items-end md:items-center md:min-h-[560px]', colorClasses.bgDark]"
  >
    <ServiceImage
      v-if="image?.src"
      v-bind="image"
      :width="1920"
      :height="1080"
      sizes="(min-width: 1280px) 1280px, 100vw"
      eager
      fill
      mirror
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10" aria-hidden="true"></div>
    <div class="hidden md:block absolute inset-0 ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-black/70 via-black/30 to-transparent" aria-hidden="true"></div>

    <div class="relative z-10 w-full px-6 md:px-12 pt-24 pb-10 md:py-16">
      <div class="max-w-3xl text-start text-white">
        <ServiceBreadcrumbs v-if="breadcrumb.length" :items="breadcrumb" light class="mb-6" />

        <p v-if="eyebrow" class="text-sm font-semibold uppercase tracking-wide text-yellow mb-3">
          {{ eyebrow }}
          <span v-if="eyebrowSecondary" dir="ltr" class="block text-xs text-white/70 mt-1">{{ eyebrowSecondary }}</span>
        </p>

        <h1 :id="titleId" class="text-3xl md:text-5xl font-bold leading-tight">{{ title }}</h1>

        <div v-if="paragraphs.length" class="mt-5 space-y-3">
          <p
            v-for="(p, i) in paragraphs"
            :key="i"
            :class="i === 0 ? (leadStrong ? 'text-xl font-semibold text-white' : 'text-lg text-white/90') : 'text-base text-white/80'"
          >{{ p }}</p>
        </div>

        <ul v-if="visibleChips.length" class="mt-6 flex flex-wrap gap-2" role="list">
          <li
            v-for="(chip, i) in visibleChips"
            :key="i"
            class="rounded-full bg-white/15 backdrop-blur-sm border border-white/30 px-4 py-1.5 text-sm font-semibold"
          >
            <bdi><TodoText :value="chip" /></bdi>
          </li>
        </ul>

        <div v-if="$slots.actions" class="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Usage:
// <ServiceHero :image="c.images.hero" :eyebrow="c.hero.eyebrow" :title="c.hero.title" :intro="c.hero.intro"
//              :chips="[c.hero.price, c.hero.badge]" :breadcrumb="crumbs">
//   <template #actions><ServiceButton …/></template>
// </ServiceHero>
// Hero photos contain no text, so the image is mirrored in RTL to keep the calm side behind the text column.
import { computed } from 'vue'
import { useServiceTheme } from '../../composables/useServiceTheme'
import { isTodo, SHOW_TODO } from '../../utils/todo'
import ServiceImage from './ServiceImage.vue'
import ServiceBreadcrumbs from './ServiceBreadcrumbs.vue'
import TodoText from './TodoText.vue'

const props = defineProps({
  image: { type: Object, default: null },
  eyebrow: { type: String, default: '' },
  eyebrowSecondary: { type: String, default: '' },
  title: { type: String, required: true },
  intro: { type: [String, Array], default: '' },
  leadStrong: { type: Boolean, default: false },
  chips: { type: Array, default: () => [] },
  breadcrumb: { type: Array, default: () => [] },
})

const { colorClasses } = useServiceTheme()
const titleId = 'service-hero-title'

const paragraphs = computed(() => (Array.isArray(props.intro) ? props.intro : [props.intro]).filter(Boolean))
const visibleChips = computed(() => props.chips.filter((c) => c && (SHOW_TODO || !isTodo(c))))
</script>
