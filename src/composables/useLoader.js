import { ref } from 'vue'

// Global loader state
const isLoading = ref(false)
const loadingMessage = ref('Loading...')
const showSuccess = ref(false)

let successTimeout = null

// Loader manager functions
const startLoading = (message = 'Loading...') => {
  isLoading.value = true
  loadingMessage.value = message
  showSuccess.value = false
  
  // Clear any existing success timeout
  if (successTimeout) {
    clearTimeout(successTimeout)
    successTimeout = null
  }
}

const stopLoading = (showSuccessIndicator = true, successDuration = 2000) => {
  isLoading.value = false
  
  if (showSuccessIndicator) {
    showSuccess.value = true
    
    // Auto-hide success after duration
    successTimeout = setTimeout(() => {
      showSuccess.value = false
    }, successDuration)
  } else {
    showSuccess.value = false
  }
}

const hideLoader = () => {
  isLoading.value = false
  showSuccess.value = false
  
  if (successTimeout) {
    clearTimeout(successTimeout)
    successTimeout = null
  }
}

// Export loader state for LoadingIndicator component
export const loaderState = {
  isLoading,
  loadingMessage,
  showSuccess
}

// Export composable for components
export function useLoader() {
  return {
    startLoading,
    stopLoading,
    hideLoader,
    isLoading,
    showSuccess
  }
}
