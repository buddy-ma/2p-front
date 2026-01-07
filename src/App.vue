<template>
  <div id="app" class="min-h-screen flex flex-col bg-white">
    <Header />
    <main class="flex-grow bg-white">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

