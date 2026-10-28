<template>
  <div>
    <div
      role="tablist"
      :aria-label="label || undefined"
      :class="compact
        ? 'flex flex-wrap gap-1.5 rounded-2xl bg-gray-100 dark:bg-gray-800 p-1 mb-4'
        : 'flex flex-wrap gap-2 rounded-2xl bg-gray-100 dark:bg-gray-800 p-1.5 mb-8'"
      @keydown="onKeydown"
    >
      <button
        v-for="tab in tabs"
        :id="`${idPrefix}-tab-${tab.id}`"
        :key="tab.id"
        :ref="(el) => (tabRefs[tab.id] = el)"
        type="button"
        role="tab"
        :aria-selected="modelValue === tab.id"
        :aria-controls="`${idPrefix}-panel-${tab.id}`"
        :tabindex="modelValue === tab.id ? 0 : -1"
        :class="[
          'flex-1 rounded-xl font-semibold transition-colors focus:outline-none focus-visible:ring-2',
          compact ? 'min-w-[7rem] px-3 py-2 text-sm' : 'min-w-[8rem] px-4 py-2.5 text-sm',
          colorClasses.ring,
          modelValue === tab.id
            ? [colorClasses.bg, 'text-white shadow-sm']
            : 'text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700',
        ]"
        @click="emit('update:modelValue', tab.id)"
      >
        <bdi>{{ tab.label }}</bdi>
      </button>
    </div>

    <div
      v-for="tab in tabs"
      :id="`${idPrefix}-panel-${tab.id}`"
      :key="tab.id"
      role="tabpanel"
      :aria-labelledby="`${idPrefix}-tab-${tab.id}`"
      :hidden="modelValue !== tab.id"
      tabindex="0"
      class="focus:outline-none"
    >
      <slot :name="tab.id" />
    </div>
  </div>
</template>

<script setup>
// Usage: <ServiceTabs v-model="active" id-prefix="details" :tabs="[{ id: 'premium', label: 'Annonce Premium' }]">
//          <template #premium>…</template>
//        </ServiceTabs>
// WAI-ARIA tabs with roving tabindex; Arrow keys are swapped in RTL; Home/End jump to first/last tab.
import { reactive, nextTick } from 'vue'
import { useServiceTheme } from '../../composables/useServiceTheme'
import { useLanguage } from '../../composables/useLanguage'

const props = defineProps({
  tabs: { type: Array, default: () => [] },
  modelValue: { type: String, default: '' },
  idPrefix: { type: String, default: 'tabs' },
  label: { type: String, default: '' },
  compact: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue'])

const { colorClasses } = useServiceTheme()
const { currentLocale } = useLanguage()
const tabRefs = reactive({})

const onKeydown = async (e) => {
  const ids = props.tabs.map((t) => t.id)
  const i = ids.indexOf(props.modelValue)
  const rtl = currentLocale.value === 'ar'
  const next = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 }[e.key]
  let target = null
  if (next) target = ids[(i + next + ids.length) % ids.length]
  else if (e.key === 'Home') target = ids[0]
  else if (e.key === 'End') target = ids[ids.length - 1]
  if (!target) return
  e.preventDefault()
  emit('update:modelValue', target)
  await nextTick()
  tabRefs[target]?.focus()
}
</script>
