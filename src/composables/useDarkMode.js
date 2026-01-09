import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'app_dark_mode'

// Global state
const isDark = ref(false)
let initialized = false

// Apply dark mode to document
const applyDarkMode = (dark) => {
  if (typeof document === 'undefined') return
  
  const html = document.documentElement
  
  if (dark) {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
}

// Initialize dark mode from localStorage or system preference
const initializeDarkMode = () => {
  if (initialized) return
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    
    if (stored !== null) {
      // Use stored preference
      isDark.value = stored === 'true'
    } else {
      // Use system preference
      if (typeof window !== 'undefined' && window.matchMedia) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        isDark.value = prefersDark
      }
    }
    
    applyDarkMode(isDark.value)
    initialized = true
  } catch (error) {
    console.error('Failed to initialize dark mode:', error)
    isDark.value = false
    applyDarkMode(false)
    initialized = true
  }
}

// Initialize immediately if in browser
if (typeof window !== 'undefined') {
  initializeDarkMode()
  
  // Watch for system preference changes
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e) => {
      // Only update if user hasn't set a preference
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === null) {
        isDark.value = e.matches
        applyDarkMode(isDark.value)
      }
    }

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange)
    }
  }
}

export function useDarkMode() {
  // Ensure initialization
  if (!initialized && typeof window !== 'undefined') {
    initializeDarkMode()
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    isDark.value = !isDark.value
    applyDarkMode(isDark.value)
    saveDarkModeToStorage(isDark.value)
  }

  // Set dark mode explicitly
  const setDarkMode = (value) => {
    isDark.value = Boolean(value)
    applyDarkMode(isDark.value)
    saveDarkModeToStorage(isDark.value)
  }

  // Save preference to localStorage
  const saveDarkModeToStorage = (value) => {
    try {
      localStorage.setItem(STORAGE_KEY, String(value))
    } catch (error) {
      console.error('Failed to save dark mode preference:', error)
    }
  }

  // Watch isDark changes
  watch(isDark, (newValue) => {
    applyDarkMode(newValue)
  })

  return {
    isDark: computed(() => isDark.value),
    toggleDarkMode,
    setDarkMode,
    initializeDarkMode,
  }
}
