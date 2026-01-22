<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-x-full"
    enter-to-class="opacity-100 translate-x-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-x-0"
    leave-to-class="opacity-0 translate-x-full"
  >
    <div
      v-if="visible"
      :class="[
        'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all',
        variantClasses,
        visible ? 'animate-in slide-in-from-top-full' : ''
      ]"
      role="alert"
    >
      <div class="grid gap-1">
        <div v-if="title" :class="['text-sm font-semibold', titleClasses]">
          {{ title }}
        </div>
        <div v-if="description" :class="['text-sm opacity-90', descriptionClasses]">
          {{ description }}
        </div>
      </div>
      <button
        class="absolute right-2 top-2 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2"
        @click="handleClose"
      >
        <svg
          class="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div
        v-if="showProgress"
        class="absolute bottom-0 left-0 h-1 bg-black/10 transition-all duration-[var(--toast-duration)]"
        :style="{ width: `${progress}%` }"
      />
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'destructive', 'success', 'warning', 'info'].includes(value)
  },
  duration: {
    type: Number,
    default: 5000
  }
})

const emit = defineEmits(['close'])

const visible = ref(false)
const progress = ref(100)
const showProgress = ref(props.duration > 0)
let progressInterval = null
let timeoutId = null

const variantClasses = computed(() => {
  const variants = {
    default: 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100',
    destructive: 'bg-red-500 dark:bg-red-600 border-red-600 dark:border-red-700 text-white',
    success: 'bg-green-500 dark:bg-green-600 border-green-600 dark:border-green-700 text-white',
    warning: 'bg-yellow-500 dark:bg-yellow-600 border-yellow-600 dark:border-yellow-700 text-white',
    info: 'bg-blue-500 dark:bg-blue-600 border-blue-600 dark:border-blue-700 text-white'
  }
  return variants[props.variant] || variants.default
})

const titleClasses = computed(() => {
  if (props.variant === 'default') {
    return 'text-gray-900 dark:text-gray-100'
  }
  return 'text-white'
})

const descriptionClasses = computed(() => {
  if (props.variant === 'default') {
    return 'text-gray-600 dark:text-gray-300'
  }
  return 'text-white'
})

const handleClose = () => {
  visible.value = false
  clearTimers()
  setTimeout(() => {
    emit('close', props.id)
  }, 200)
}

const clearTimers = () => {
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
}

const startTimer = () => {
  if (props.duration <= 0) {
    showProgress.value = false
    return
  }

  const startTime = Date.now()
  const updateProgress = () => {
    const elapsed = Date.now() - startTime
    const remaining = Math.max(0, props.duration - elapsed)
    progress.value = (remaining / props.duration) * 100

    if (remaining <= 0) {
      handleClose()
    }
  }

  progressInterval = setInterval(updateProgress, 16) // ~60fps
  timeoutId = setTimeout(() => {
    handleClose()
  }, props.duration)
}

onMounted(() => {
  visible.value = true
  startTimer()
})

watch(() => props.duration, () => {
  clearTimers()
  progress.value = 100
  startTimer()
})

// Cleanup on unmount
onUnmounted(() => {
  clearTimers()
})
</script>

<style scoped>
.animate-in {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
