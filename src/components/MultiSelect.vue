<template>
  <div ref="dropdownRef" class="relative">
    <div
      @click="toggleDropdown"
      :class="`w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer focus:ring-2 ${colorClasses.ring} ${colorClasses.focusBorder} flex items-center justify-between`"
    >
      <div class="flex flex-wrap gap-1 flex-1">
        <span v-if="selectedValues.length === 0" class="text-gray-500">
          {{ placeholder }}
        </span>
        <span
          v-for="(value, index) in selectedValues"
          :key="index"
          class="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
        >
          {{ getLabel(value) }}
          <button
            @click.stop="removeValue(value)"
            class="hover:text-blue-900 focus:outline-none"
          >
            ×
          </button>
        </span>
      </div>
      <svg
        class="w-5 h-5 text-gray-500 transition-transform"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <div
      v-if="isOpen"
      class="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
    >
      <div class="p-2">
        <input
          v-if="searchable"
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher..."
          class="w-full px-3 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          @click.stop
        />
        <div
          v-for="option in filteredOptions"
          :key="getValue(option)"
          @click="toggleValue(option)"
          :class="[
            'px-3 py-2 cursor-pointer hover:bg-gray-100 rounded flex items-center',
            isSelected(option) ? 'bg-blue-50' : ''
          ]"
        >
          <input
            type="checkbox"
            :checked="isSelected(option)"
            class="mr-2"
            @click.stop
            readonly
          />
          <span>{{ getLabel(option) }}</span>
        </div>
        <div v-if="filteredOptions.length === 0" class="px-3 py-2 text-gray-500 text-sm">
          Aucun résultat trouvé
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useTheme } from '../composables/useTheme'

const { colorClasses } = useTheme()

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

const getValue = (option) => {
  return typeof option === 'object' ? option[props.valueKey] : option
}

const getLabel = (valueOrOption) => {
  // If it's a string, return it directly
  if (typeof valueOrOption === 'string') {
    return valueOrOption
  }
  // If it's an object (option), extract the label directly
  if (typeof valueOrOption === 'object' && valueOrOption !== null) {
    return valueOrOption[props.labelKey] || valueOrOption
  }
  // Otherwise, try to find the option by value
  const option = props.options.find(opt => getValue(opt) === valueOrOption)
  return option ? (typeof option === 'object' ? option[props.labelKey] : option) : valueOrOption
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
  
  emit('update:modelValue', [...selectedValues.value])
}

const removeValue = (value) => {
  const index = selectedValues.value.indexOf(value)
  if (index > -1) {
    selectedValues.value.splice(index, 1)
    emit('update:modelValue', [...selectedValues.value])
  }
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
  if (!isOpen.value) {
    searchQuery.value = ''
  }
}

const closeDropdown = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
    searchQuery.value = ''
  }
}

watch(() => props.modelValue, (newValue) => {
  selectedValues.value = [...newValue]
})

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

