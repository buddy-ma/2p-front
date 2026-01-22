<template>
  <Teleport to="body">
    <div
      class="pointer-events-none fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"
    >
      <Toast
        v-for="toast in toastState.toasts.value"
        :key="toast.id"
        :id="toast.id"
        :title="toast.title"
        :description="toast.description"
        :variant="toast.variant"
        :duration="toast.duration"
        @close="toastState.removeToast"
      />
    </div>
  </Teleport>
</template>

<script setup>
import Toast from './Toast.vue'
import { toastState } from '../../composables/useToast'
</script>
