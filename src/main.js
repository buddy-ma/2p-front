import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)
  // Display error in console for debugging
  if (event.error) {
    console.error('Error details:', {
      message: event.error.message,
      stack: event.error.stack,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    })
  }
})

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
})

try {
  const app = createApp(App)
  app.use(router)
  app.mount('#app')
} catch (error) {
  console.error('Failed to initialize Vue app:', error)
  // Display error message in the DOM
  const appElement = document.getElementById('app')
  if (appElement) {
    appElement.innerHTML = `
      <div style="padding: 20px; font-family: Arial, sans-serif; color: #d32f2f;">
        <h1>Application Error</h1>
        <p>Failed to initialize the application. Please check the browser console for details.</p>
        <pre style="background: #f5f5f5; padding: 10px; border-radius: 4px; overflow-x: auto;">${error.message}\n${error.stack}</pre>
      </div>
    `
  }
}

