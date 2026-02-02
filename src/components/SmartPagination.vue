<template>
  <div v-if="totalPages > 1" class="flex flex-wrap items-center justify-center gap-2 mt-8">
    <!-- Previous Button -->
    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" :class="[
      'px-4 py-2 rounded-lg transition-colors font-semibold',
      currentPage === 1
        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
        : `${colorClasses.bg} text-white hover:opacity-90`
    ]">
      « {{ t('pagination.previous') }}
    </button>

    <!-- First Page -->
    <button v-if="showFirstPage" @click="goToPage(1)" :class="[
      'px-4 py-2 rounded-lg transition-colors font-semibold min-w-[44px]',
      currentPage === 1
        ? `${colorClasses.bg} text-white`
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    ]">
      1
    </button>

    <!-- First Ellipsis -->
    <span v-if="showFirstEllipsis" class="px-4 py-2 text-gray-500">
      ...
    </span>

    <!-- Page Numbers -->
    <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" :class="[
      'px-4 py-2 rounded-lg transition-colors font-semibold min-w-[44px]',
      currentPage === page
        ? `${colorClasses.bg} text-white`
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    ]">
      {{ page }}
    </button>

    <!-- Last Ellipsis -->
    <span v-if="showLastEllipsis" class="px-4 py-2 text-gray-500">
      ...
    </span>

    <!-- Last Page -->
    <button v-if="showLastPage" @click="goToPage(totalPages)" :class="[
      'px-4 py-2 rounded-lg transition-colors font-semibold min-w-[44px]',
      currentPage === totalPages
        ? `${colorClasses.bg} text-white`
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    ]">
      {{ totalPages }}
    </button>

    <!-- Next Button -->
    <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" :class="[
      'px-4 py-2 rounded-lg transition-colors font-semibold',
      currentPage === totalPages
        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
        : `${colorClasses.bg} text-white hover:opacity-90`
    ]">
      {{ t('pagination.next') }} »
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTheme } from '../composables/useTheme'
import { useI18n } from '../composables/useI18n'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
    default: 1
  },
  totalPages: {
    type: Number,
    required: true,
    default: 1
  },
  siblingCount: {
    type: Number,
    default: 1 // Number of pages to show on each side of current page
  },
  boundaryCount: {
    type: Number,
    default: 1 // Number of pages to show at start/end
  }
})

const router = useRouter()
const route = useRoute()
const { colorClasses } = useTheme()
const { t } = useI18n()

// Calculate which pages to show
const visiblePages = computed(() => {
  const { currentPage, totalPages, siblingCount, boundaryCount } = props

  if (totalPages <= 0) return []

  const pages = []

  // Calculate the range of pages to show around current page
  const start = Math.max(1, currentPage - siblingCount)
  const end = Math.min(totalPages, currentPage + siblingCount)

  // Add pages around current page
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  // Remove duplicates and sort
  return [...new Set(pages)].sort((a, b) => a - b)
})

const showFirstPage = computed(() => {
  if (props.totalPages <= 0) return false
  const firstVisible = visiblePages.value[0]
  // Show first page if there's a gap between page 1 and first visible page
  return firstVisible > 2
})

const showLastPage = computed(() => {
  if (props.totalPages <= 0) return false
  const lastVisible = visiblePages.value[visiblePages.value.length - 1]
  // Show last page if there's a gap between last visible page and total pages
  return lastVisible < props.totalPages - 1
})

const showFirstEllipsis = computed(() => {
  if (props.totalPages <= 0) return false
  const firstVisible = visiblePages.value[0]
  // Show ellipsis if there's a gap (more than 1 page difference)
  return firstVisible > 2
})

const showLastEllipsis = computed(() => {
  if (props.totalPages <= 0) return false
  const lastVisible = visiblePages.value[visiblePages.value.length - 1]
  // Show ellipsis if there's a gap (more than 1 page difference)
  return lastVisible < props.totalPages - 1
})

const goToPage = (page) => {
  if (page < 1 || page > props.totalPages || page === props.currentPage) {
    return
  }

  // Update route query parameters
  router.push({
    query: {
      ...route.query,
      page: page === 1 ? undefined : page
    }
  })
}
</script>
