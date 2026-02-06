<template>
  <div ref="dropdownRef" class="relative">
    <div @click="toggleDropdown"
      :class="`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer focus:ring-2 ${colorClasses.ring} ${colorClasses.focusBorder} flex items-center justify-between bg-white dark:bg-gray-700 text-gray-900 dark:text-white`">
      <div class="flex flex-wrap gap-1 flex-1">
        <span v-if="selectedValues.length === 0" class="text-gray-500 dark:text-gray-400">
          {{ placeholder }}
        </span>
        <span v-for="(value, index) in selectedValues" :key="index"
          class="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm">
          {{ getLabel(value) }}
          <button @click.stop="removeValue(value)"
            class="hover:text-blue-900 dark:hover:text-blue-100 focus:outline-none">
            ×
          </button>
        </span>
      </div>
      <svg class="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform" :class="{ 'rotate-180': isOpen }"
        fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <div v-if="isOpen"
      class="absolute z-50 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-[50vh] md:max-h-60 flex flex-col">
      <div class="p-2 overflow-auto flex-1">
        <input v-if="searchable" v-model="searchQuery" type="text" placeholder="Rechercher..."
          class="w-full px-3 py-2 mb-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
          @click.stop />
        <div v-for="option in filteredOptions" :key="getValue(option)" @click="toggleValue(option)" :class="[
          'px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 rounded flex items-center text-gray-900 dark:text-white',
          isSelected(option) ? 'bg-blue-50 dark:bg-blue-900/30' : ''
        ]">
          <input type="checkbox" :checked="isSelected(option)" :class="isRTL ? 'ml-2' : 'mr-2'"
            @click.stop="toggleValue(option)" readonly />
          <span>{{ getLabel(option) }}</span>
        </div>
        <div v-if="filteredOptions.length === 0" class="px-3 py-2 text-gray-500 dark:text-gray-400 text-sm">
          Aucun résultat trouvé
        </div>
      </div>
      <!-- Mobile-only buttons -->
      <div class="md:hidden border-t border-gray-300 dark:border-gray-600 flex">
        <button @click.stop="handleCancel"
          class="flex-1 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 font-medium transition-colors">
          {{ t('common.cancel') || 'Cancel' }}
        </button>
        <div class="w-px bg-gray-300 dark:bg-gray-600"></div>
        <button @click.stop="handleDone"
          class="flex-1 px-4 py-3 text-gray-700 font-medium transition-colors bg-white dark:bg-gray-600 dark:text-gray-300">
          {{ t('common.done') || 'Done' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useTheme } from '../composables/useTheme'
import { useI18n } from '../composables/useI18n'

const { colorClasses } = useTheme()
const { currentLocale, t } = useI18n()

const isRTL = computed(() => currentLocale.value === 'ar')

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  options: {
    type: Array,
    required: true
  },
  placeholder: {
    type: String,
    default: 'Sélectionner...'
  },
  searchable: {
    type: Boolean,
    default: true
  },
  valueKey: {
    type: String,
    default: 'id'
  },
  labelKey: {
    type: String,
    default: 'title'
  }
})

const emit = defineEmits(['update:modelValue'])

const dropdownRef = ref(null)
const isOpen = ref(false)
const searchQuery = ref('')
const selectedValues = ref([...props.modelValue])
const originalSelection = ref([...props.modelValue])

const getValue = (option) => {
  return typeof option === 'object' ? option[props.valueKey] : option
}

const getLabel = (valueOrOption) => {
  // If it's an object (option), extract the label directly
  if (typeof valueOrOption === 'object' && valueOrOption !== null) {
    return valueOrOption[props.labelKey] || valueOrOption
  }
  // If it's a string or other value, try to find the option by value to get translated label
  const option = props.options.find(opt => {
    const optValue = getValue(opt)
    return optValue === valueOrOption
  })
  if (option) {
    // Return the translated label from the option
    return typeof option === 'object' ? (option[props.labelKey] || option) : option
  }
  // Fallback: return the value as-is if no matching option found
  return valueOrOption
}

const filteredOptions = computed(() => {
  if (!searchQuery.value) {
    return props.options
  }
  const query = searchQuery.value.toLowerCase()
  return props.options.filter(option => {
    const label = typeof option === 'object' ? option[props.labelKey] : option
    return label.toLowerCase().includes(query)
  })
})

const isSelected = (option) => {
  const value = getValue(option)
  return selectedValues.value.includes(value)
}

const toggleValue = (option) => {
  const value = getValue(option)
  const index = selectedValues.value.indexOf(value)

  if (index > -1) {
    selectedValues.value.splice(index, 1)
  } else {
    selectedValues.value.push(value)
  }

  // On desktop, emit immediately. On mobile, wait for "Done" button
  const isMobile = window.innerWidth < 768
  if (!isMobile) {
    emit('update:modelValue', [...selectedValues.value])
  }
}

const removeValue = (value) => {
  const index = selectedValues.value.indexOf(value)
  if (index > -1) {
    selectedValues.value.splice(index, 1)
    // On desktop, emit immediately. On mobile, wait for "Done" button
    const isMobile = window.innerWidth < 768
    if (!isMobile) {
      emit('update:modelValue', [...selectedValues.value])
    }
  }
}

const toggleDropdown = () => {
  if (!isOpen.value) {
    // Save original selection when opening
    originalSelection.value = [...selectedValues.value]
  }
  isOpen.value = !isOpen.value
  if (!isOpen.value) {
    searchQuery.value = ''
  }
}

const handleDone = () => {
  // Apply current selection
  emit('update:modelValue', [...selectedValues.value])
  isOpen.value = false
  searchQuery.value = ''
}

const handleCancel = () => {
  // Revert to original selection
  selectedValues.value = [...originalSelection.value]
  isOpen.value = false
  searchQuery.value = ''
}

const closeDropdown = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    // On desktop, clicking outside applies changes (like before)
    // On mobile, user should use Done/Cancel buttons
    const isMobile = window.innerWidth < 768
    if (!isMobile) {
      emit('update:modelValue', [...selectedValues.value])
    } else {
      // On mobile, revert to original if clicking outside
      selectedValues.value = [...originalSelection.value]
    }
    isOpen.value = false
    searchQuery.value = ''
  }
}

watch(() => props.modelValue, (newValue) => {
  selectedValues.value = [...newValue]
  // Update original selection if dropdown is closed
  if (!isOpen.value) {
    originalSelection.value = [...newValue]
  }
})

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>
