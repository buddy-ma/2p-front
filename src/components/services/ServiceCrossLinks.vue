<template>
  <section v-if="items.length" :aria-labelledby="title ? titleId : undefined" class="bg-white dark:bg-gray-900">
    <div class="container mx-auto px-4 max-w-6xl py-12 md:py-16">
      <h2 v-if="title" :id="titleId" :class="['text-2xl md:text-3xl font-semibold mb-8 text-start', colorClasses.text]">{{ title }}</h2>
      <ul role="list" class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <li v-for="(item, i) in items" :key="i">
          <router-link
            :to="localePath(item.to)"
            :class="['group flex h-full flex-col rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm transition-shadow hover:shadow-lg focus:outline-none focus-visible:ring-2 text-start', colorClasses.ring]"
          >
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white"><bdi>{{ item.title }}</bdi></h3>
            <p v-if="item.text" class="mt-2 text-gray-600 dark:text-gray-400">{{ item.text }}</p>
            <ArrowRight :size="20" :class="['mt-4 rtl:-scale-x-100 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1', colorClasses.text]" aria-hidden="true" />
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
// Usage: <ServiceCrossLinks :title="common.otherServices" :items="[{ title, text, to: SERVICE_PAGES.mandatExclusif.path }]" />
// `to` is a French path, localized here. Renders nothing when items is empty.
import { useId } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
import { useServiceTheme } from '../../composables/useServiceTheme'
import { useLanguage } from '../../composables/useLanguage'

defineProps({
  title: { type: String, default: '' },
  items: { type: Array, default: () => [] },
})

const { colorClasses } = useServiceTheme()
const { getLocalizedPath: localePath } = useLanguage()
const titleId = useId()
</script>
