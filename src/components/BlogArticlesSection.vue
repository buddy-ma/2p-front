<template>
  <section :class="sectionClass">
    <div :class="containerClass">
      <h2 v-if="heading" :class="headingClass">
        {{ heading }}
      </h2>

      <div v-if="loading" class="text-center py-12">
        <div :class="['inline-block animate-spin rounded-full h-12 w-12 border-b-2', loadingSpinnerClass]"></div>
        <p class="mt-4 text-gray-600">{{ t('common.loading') }}</p>
      </div>

      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-600">{{ error }}</p>
      </div>

      <div v-else-if="showEmptyState && items.length === 0" class="flex flex-wrap">
        <div class="w-1/3 hidden md:block"></div>
        <div class="w-full md:w-1/3 text-center">
          <img v-if="emptyImage" class="max-w-full h-auto mx-auto" :src="emptyImage" alt="no-search-results" />
          <div class="text-center mt-3">
            <h3 class="text-xl font-semibold">{{ emptyTitle }}</h3>
            <p class="text-gray-600">{{ emptyMessage }}</p>
          </div>
        </div>
        <div class="w-1/3 hidden md:block"></div>
      </div>

      <div v-else :class="cardsWrapperClass">
        <div v-for="item in items" :key="item.id" @click.prevent="goToArticle(item.slug)" :class="cardOuterClass">
          <div :class="cardClass">
            <a v-if="variant === 'filter'" @click.prevent="goToArticle(item.slug)" class="cursor-pointer block">
              <div>
                <img class="w-full h-48 object-cover rounded-t-lg" :src="getImageUrl(item)" :alt="item.slug" />
              </div>
            </a>

            <img v-else-if="item.image" :src="getImageUrl(item.image)" :alt="item.title"
              class="w-full h-48 object-cover" />

            <div :class="cardBodyClass">
              <a v-if="variant === 'filter'" @click.prevent="goToArticle(item.slug)" class="cursor-pointer block">
                <h3 :class="cardTitleClass">
                  {{ item.title }}
                </h3>
              </a>
              <h3 v-else :class="cardTitleClass">
                {{ item.title }}
              </h3>
              <div>
                <p :class="cardTextClass">{{ truncateText(item.text) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from '../composables/useI18n'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  heading: {
    type: String,
    default: ''
  },
  headingClass: {
    type: String,
    default: 'text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100'
  },
  loading: {
    type: Boolean,
    default: false
  },
  loadingSpinnerClass: {
    type: String,
    default: 'border-red-500'
  },
  error: {
    type: String,
    default: ''
  },
  showEmptyState: {
    type: Boolean,
    default: false
  },
  emptyTitle: {
    type: String,
    default: ''
  },
  emptyMessage: {
    type: String,
    default: ''
  },
  emptyImage: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'filter'
  },
  sectionClass: {
    type: String,
    default: ''
  },
  containerClass: {
    type: String,
  },
  truncateLength: {
    type: Number,
    default: 170
  }
})

const router = useRouter()
const { t } = useI18n()

const cardsWrapperClass = computed(() => {
  if (props.variant === 'similar') {
    return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
  }
  return 'flex flex-wrap -mx-3'
})

const cardOuterClass = computed(() => {
  if (props.variant === 'similar') {
    return 'bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer'
  }
  return 'w-full md:w-1/2 xl:w-1/3 px-3 mb-6 cursor-pointer'
})

const cardClass = computed(() => {
  if (props.variant === 'similar') {
    return ''
  }
  return 'bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-2'
})

const cardBodyClass = computed(() => {
  if (props.variant === 'similar') {
    return 'p-4'
  }
  return 'p-2 min-h-[150px]'
})

const cardTitleClass = computed(() => {
  if (props.variant === 'similar') {
    return 'font-bold text-lg mb-2 line-clamp-2 text-gray-900 dark:text-gray-100'
  }
  return 'text-lg font-semibold mb-2 text-gray-800'
})

const cardTextClass = computed(() => {
  if (props.variant === 'similar') {
    return 'text-gray-600 dark:text-gray-400 text-sm line-clamp-2'
  }
  return 'text-gray-600 text-sm'
})

const stripHtmlTags = (html) => {
  const tmp = document.createElement('DIV')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

const truncateText = (text, length = props.truncateLength) => {
  const cleanText = stripHtmlTags(text)
  return cleanText.length > length ? cleanText.substring(0, length) + '...' : cleanText
}

const getImageUrl = (value) => {
  const imagePath = typeof value === 'string' ? value : value?.image
  if (imagePath) {
    return `https://2p.ma/images/${imagePath}`
  }
  return 'https://2p.ma/assets/images/blog/b-10.jpg'
}

const goToArticle = (slug) => {
  router.push(`/conseils/${slug}`)
}
</script>
