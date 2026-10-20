<template>
  <div
    :class="[
      'overflow-hidden',
      fill ? 'absolute inset-0' : ['relative', isWide ? 'aspect-video' : 'aspect-[4/3]', 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700'],
      rounded && !fill ? 'rounded-3xl' : '',
    ]"
  >
    <img
      v-show="!failed"
      :src="url"
      :srcset="urlSm ? `${urlSm} ${Math.round(width / 2)}w, ${url} ${width}w` : undefined"
      :sizes="sizes"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : 'auto'"
      decoding="async"
      :class="['absolute inset-0 w-full h-full object-cover', mirror ? 'rtl:-scale-x-100' : '']"
      @error="failed = true"
    />
    <div v-if="failed && !fill" class="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-gray-600" aria-hidden="true">
      <ImageIcon :size="48" :stroke-width="1.25" />
    </div>
  </div>
</template>

<script setup>
// Usage: <ServiceImage v-bind="c.images.photos" />  (section 4:3, 1200x900 + 600x450 -sm)
//        <ServiceImage v-bind="c.images.hero" :width="1920" :height="1080" eager fill mirror />  (hero)
// Explicit width/height + aspect-ratio box: no layout shift, and a neutral placeholder while the file is missing.
import { computed, ref, watch } from 'vue'
import { Image as ImageIcon } from 'lucide-vue-next'
import { serviceImageUrl } from '../../utils/serviceImages'

const props = defineProps({
  src: { type: String, required: true },
  srcSm: { type: String, default: '' },
  alt: { type: String, default: '' },
  width: { type: Number, default: 1200 },
  height: { type: Number, default: 900 },
  eager: { type: Boolean, default: false },
  sizes: { type: String, default: '(min-width: 1024px) 50vw, 100vw' },
  fill: { type: Boolean, default: false },
  mirror: { type: Boolean, default: false },
  rounded: { type: Boolean, default: true },
})

const url = computed(() => serviceImageUrl(props.src))
const urlSm = computed(() => serviceImageUrl(props.srcSm))

const failed = ref(false)
watch(() => props.src, () => { failed.value = false })

const isWide = computed(() => props.width / props.height > 1.5)
</script>
