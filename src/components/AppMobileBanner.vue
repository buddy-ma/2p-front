<template>
  <div class="md:hidden bg-white">
    <a :href="storeUrl" target="_blank" rel="noopener noreferrer" class="block">
      <img
        :src="appMobileBanner"
        alt="2P.ma - Plus simple, rapide - Télécharger l’app"
        class="w-full h-auto"
        loading="lazy"
      />
    </a>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import appMobileBanner from '../assets/images/elements/2P banne-r.jpg.jpeg'

const APP_STORE_URL = 'https://apps.apple.com/ma/app/2p-ma-immobilier-maroc/id6751427331'
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=ma.particulier.app&pcampaignid=web_share'

const isIOS = ref(false)
const isAndroid = ref(false)

onMounted(() => {
  if (typeof navigator === 'undefined') return
  const ua = navigator.userAgent || navigator.vendor || ''
  isIOS.value = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  isAndroid.value = /android/i.test(ua)
})

const storeUrl = computed(() => {
  if (isIOS.value) return APP_STORE_URL
  if (isAndroid.value) return PLAY_STORE_URL
  // Default to Play Store for other mobile devices (e.g. other Android forks)
  return PLAY_STORE_URL
})
</script>
