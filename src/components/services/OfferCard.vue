<template>
  <article
    :class="[
      'relative flex flex-col h-full bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-shadow hover:shadow-lg',
      compact ? 'rounded-2xl' : 'rounded-3xl',
      featured ? ['ring-2', colorClasses.ring, 'lg:scale-105 lg:z-10'] : '',
    ]"
  >
    <ServiceImage v-if="image?.src" v-bind="image" :rounded="false" sizes="(min-width: 768px) 50vw, 100vw" />

    <div :class="['flex flex-col flex-1 text-start', compact ? 'p-4 sm:p-5' : 'p-6 md:p-8']">
      <div v-if="card.n || (!compact && (card.groupTitle || card.tagline)) || (compact && card.tagline)" :class="['flex items-center gap-3', compact ? 'mb-2' : 'mb-3']">
        <span v-if="card.n" :class="['flex-shrink-0 rounded-full text-white font-bold flex items-center justify-center', colorClasses.bg, compact ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm']" aria-hidden="true">{{ card.n }}</span>
        <p v-if="(!compact && (card.groupTitle || card.tagline)) || (compact && card.tagline)" :class="['font-semibold uppercase tracking-wide', colorClasses.text, compact ? 'text-xs' : 'text-sm']">
          {{ card.tagline || card.groupTitle }}
        </p>
      </div>

      <component :is="`h${headingLevel}`" v-if="card.name" :class="['font-bold text-gray-900 dark:text-white', compact ? 'text-lg md:text-xl' : 'text-xl md:text-2xl']">
        <bdi>{{ card.name }}</bdi>
      </component>

      <p v-if="card.badge" :class="compact ? 'mt-2' : 'mt-3'">
        <span :class="['inline-block rounded-full bg-yellow/20 dark:bg-yellow/15 text-gray-900 dark:text-yellow font-bold tracking-wide leading-snug', compact ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs']">
          {{ card.badge }}
        </span>
      </p>

      <p v-if="card.price && (SHOW_TODO || !isTodo(card.price))" :class="['font-bold leading-snug', colorClasses.text, compact ? 'mt-2 text-lg md:text-xl' : 'mt-4 text-3xl']">
        <bdi><TodoText :value="card.price" /></bdi>
        <span v-if="priceNote" :class="['ms-2 align-middle font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400', compact ? 'text-xs' : 'text-sm']">{{ priceNote }}</span>
      </p>

      <p v-if="!compact && card.question" class="mt-4 font-medium text-gray-800 dark:text-gray-200">{{ card.question }}</p>
      <p v-if="!compact && card.lead" class="mt-3 font-semibold text-gray-900 dark:text-white">{{ card.lead }}</p>
      <p v-if="!compact && card.text" class="mt-2 text-gray-600 dark:text-gray-400">{{ card.text }}</p>

      <dl v-if="card.fees?.length" :class="compact ? 'mt-4 space-y-2' : 'mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3'">
        <div v-for="(fee, i) in card.fees" :key="i" :class="compact ? '' : 'rounded-2xl bg-gray-50 dark:bg-gray-700/50 p-4'">
          <dt class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{{ fee.label }}</dt>
          <dd :class="['mt-1 font-bold', colorClasses.text, compact ? 'text-lg' : 'text-2xl']"><bdi><TodoText :value="fee.value" /></bdi></dd>
          <dd v-if="fee.min && !compact" class="mt-1 text-sm text-gray-600 dark:text-gray-400"><bdi>{{ fee.min }}</bdi></dd>
        </div>
      </dl>

      <div v-if="visibleIncludes.length" :class="compact ? 'mt-3' : 'mt-5'">
        <p v-if="card.includesTitle && !compact" class="font-semibold text-gray-900 dark:text-white mb-3">{{ card.includesTitle }}</p>
        <CheckList :items="visibleIncludes" :compact="compact" />
      </div>

      <p v-if="card.highlight" :class="['mt-5 font-bold', colorClasses.text]">{{ card.highlight }}</p>

      <ul v-if="!compact && card.notes?.length" class="mt-5 space-y-2" role="list">
        <li v-for="(note, i) in card.notes" :key="i" class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Info :size="16" :class="['flex-shrink-0 mt-0.5', colorClasses.text]" aria-hidden="true" />
          <TodoText :value="note" />
        </li>
      </ul>

      <p v-if="!compact && card.note" class="mt-4 text-sm text-gray-500 dark:text-gray-400">{{ card.note }}</p>

      <div v-if="$slots.actions" :class="['mt-auto flex flex-col gap-2', compact ? 'pt-4' : 'pt-6']">
        <slot name="actions" />
      </div>
    </div>
  </article>
</template>

<script setup>
// Usage: <OfferCard :card="c.card" featured><template #actions><ServiceButton …/></template></OfferCard>
// card fields (all optional): n, name, groupTitle, tagline, question, lead, text, price, includesTitle, includes[],
// badge, notes[], fees[{ label, value, min }], highlight, note. "[TODO…" values go through <TodoText>.
import { computed } from 'vue'
import { Info } from 'lucide-vue-next'
import { useServiceTheme } from '../../composables/useServiceTheme'
import { isTodo, SHOW_TODO } from '../../utils/todo'
import ServiceImage from './ServiceImage.vue'
import CheckList from './CheckList.vue'
import TodoText from './TodoText.vue'

const props = defineProps({
  card: { type: Object, required: true },
  featured: { type: Boolean, default: false },
  compact: { type: Boolean, default: false },
  image: { type: Object, default: null },
  headingLevel: { type: Number, default: 3 },
  priceNote: { type: String, default: '' },
})

const visibleIncludes = computed(() => {
  const items = props.card.includes || []
  return props.compact ? items.slice(0, 3) : items
})

const { colorClasses } = useServiceTheme()
</script>
