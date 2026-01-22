import { ref } from 'vue'

// Global toast state
const toasts = ref([])
let toastIdCounter = 0

// Toast manager functions
const addToast = (toast) => {
  const id = `toast-${++toastIdCounter}`
  const newToast = {
    id,
    title: toast.title || '',
    description: toast.description || '',
    variant: toast.variant || 'default',
    duration: toast.duration !== undefined ? toast.duration : 5000
  }
  toasts.value.push(newToast)
  return id
}

const removeToast = (id) => {
  const index = toasts.value.findIndex((t) => t.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

const clearToasts = () => {
  toasts.value = []
}

// Export toast state for Toaster component
export const toastState = {
  toasts,
  removeToast
}

// Export composable for components
export function useToast() {
  const toast = (options) => {
    if (typeof options === 'string') {
      return addToast({
        description: options,
        variant: 'default'
      })
    }
    return addToast(options)
  }

  const success = (message, options = {}) => {
    if (typeof message === 'string') {
      return addToast({
        description: message,
        variant: 'success',
        ...options
      })
    }
    return addToast({
      ...message,
      variant: 'success'
    })
  }

  const error = (message, options = {}) => {
    if (typeof message === 'string') {
      return addToast({
        description: message,
        variant: 'destructive',
        ...options
      })
    }
    return addToast({
      ...message,
      variant: 'destructive'
    })
  }

  const warning = (message, options = {}) => {
    if (typeof message === 'string') {
      return addToast({
        description: message,
        variant: 'warning',
        ...options
      })
    }
    return addToast({
      ...message,
      variant: 'warning'
    })
  }

  const info = (message, options = {}) => {
    if (typeof message === 'string') {
      return addToast({
        description: message,
        variant: 'info',
        ...options
      })
    }
    return addToast({
      ...message,
      variant: 'info'
    })
  }

  return {
    toast,
    success,
    error,
    warning,
    info
  }
}
