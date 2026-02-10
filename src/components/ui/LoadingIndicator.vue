<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4 scale-95"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 translate-y-4 scale-95"
  >
    <div
      v-if="loaderState.isLoading.value || loaderState.showSuccess.value"
      class="fixed bottom-6 right-6 z-50 pointer-events-auto"
    >
      <div
        :class="[
          'flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border backdrop-blur-sm transition-all duration-300',
          loaderState.showSuccess.value 
            ? 'bg-green-500/90 dark:bg-green-600/90 border-green-600 dark:border-green-700 text-white' 
            : 'bg-white/90 dark:bg-gray-800/90 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100'
        ]"
      >
        <!-- Loading Spinner -->
        <div v-if="loaderState.isLoading.value" class="relative">
          <svg
            class="animate-spin h-5 w-5"
            :class="loaderState.showSuccess.value ? 'text-white' : 'text-blue-500 dark:text-blue-400'"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>

        <!-- Success Check Icon -->
        <div v-else-if="loaderState.showSuccess.value" class="relative">
          <svg
            class="h-5 w-5 text-white animate-scale-in"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <!-- Message -->
        <div class="text-sm font-medium whitespace-nowrap">
          <span v-if="loaderState.isLoading.value">
            {{ loaderState.loadingMessage.value }}
          </span>
          <span v-else-if="loaderState.showSuccess.value">
            Success!
          </span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { loaderState } from '../../composables/useLoader'
</script>

<style scoped>
@keyframes scale-in {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
