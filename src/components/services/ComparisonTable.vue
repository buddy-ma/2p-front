<template>
  <div class="overflow-x-auto small-scrollbar rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
    <table class="w-full min-w-[640px] text-sm text-start">
      <caption class="sr-only">{{ caption }}</caption>
      <thead>
        <tr class="bg-gray-50 dark:bg-gray-700/50">
          <td class="sticky start-0 bg-gray-50 dark:bg-gray-700 p-4"></td>
          <th v-for="(col, i) in columns" :key="i" scope="col" :class="['p-4 text-start font-semibold', colorClasses.text]">
            <bdi>{{ col }}</bdi>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, r) in rows" :key="r" class="border-t border-gray-100 dark:border-gray-700">
          <th scope="row" class="sticky start-0 bg-white dark:bg-gray-800 p-4 text-start font-semibold text-gray-900 dark:text-white align-top w-40">
            {{ row.label }}
          </th>
          <td v-for="(cell, i) in row.cells" :key="i" class="p-4 text-gray-700 dark:text-gray-300 align-top">
            <TodoText :value="cell" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
// Usage: <ComparisonTable :caption="c.sections.compare" :columns="c.compare.columns" :rows="c.compare.rows" />
// rows: [{ label, cells[] }]. Scrolls horizontally on small screens; the row-label column stays sticky.
import { useServiceTheme } from '../../composables/useServiceTheme'
import TodoText from './TodoText.vue'

defineProps({
  caption: { type: String, default: '' },
  columns: { type: Array, default: () => [] },
  rows: { type: Array, default: () => [] },
})

const { colorClasses } = useServiceTheme()
</script>
