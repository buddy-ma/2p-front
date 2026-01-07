import { computed } from 'vue'
import { useRoute } from 'vue-router'

export function useTheme() {
  const route = useRoute()

  const logoColor = computed(() => {
    return route.meta?.logo || 'blue'
  })

  const colorClasses = computed(() => {
    const colorMap = {
      blue: {
        text: 'text-blue-800',
        textLight: 'text-blue-500',
        textDark: 'text-blue-900',
        bg: 'bg-blue-800',
        bgLight: 'bg-blue-500',
        bgDark: 'bg-blue-900',
        border: 'border-blue-400',
        borderLight: 'border-blue-500',
        ring: 'ring-blue-500',
        focusBorder: 'border-blue-500',
        hover: 'hover:bg-blue-700',
        hoverText: 'hover:text-blue-600',
      },
      green: {
        text: 'text-green-600',
        textLight: 'text-green-500',
        textDark: 'text-green-700',
        bg: 'bg-green-600',
        bgLight: 'bg-green-500',
        bgDark: 'bg-green-700',
        border: 'border-green-600',
        borderLight: 'border-green-500',
        ring: 'ring-green-500',
        focusBorder: 'border-green-500',
        hover: 'hover:bg-green-700',
        hoverText: 'hover:text-green-600',
      },
      orange: {
        text: 'text-orange-600',
        textLight: 'text-orange-500',
        textDark: 'text-orange-700',
        bg: 'bg-orange-600',
        bgLight: 'bg-orange-500',
        bgDark: 'bg-orange-700',
        border: 'border-orange-600',
        borderLight: 'border-orange-500',
        ring: 'ring-orange-500',
        focusBorder: 'border-orange-500',
        hover: 'hover:bg-orange-700',
        hoverText: 'hover:text-orange-600',
      },
      purple: {
        text: 'text-purple-600',
        textLight: 'text-purple-500',
        textDark: 'text-purple-700',
        bg: 'bg-purple-600',
        bgLight: 'bg-purple-500',
        bgDark: 'bg-purple-700',
        border: 'border-purple-600',
        borderLight: 'border-purple-500',
        ring: 'ring-purple-500',
        focusBorder: 'border-purple-500',
        hover: 'hover:bg-purple-700',
        hoverText: 'hover:text-purple-600',
      },
      red: {
        text: 'text-red-600',
        textLight: 'text-red-500',
        textDark: 'text-red-700',
        bg: 'bg-red-600',
        bgLight: 'bg-red-500',
        bgDark: 'bg-red-700',
        border: 'border-red-600',
        borderLight: 'border-red-500',
        ring: 'ring-red-500',
        focusBorder: 'border-red-500',
        hover: 'hover:bg-red-700',
        hoverText: 'hover:text-red-600',
      },
      white: {
        text: 'text-blue-600',
        textLight: 'text-blue-500',
        textDark: 'text-blue-700',
        bg: 'bg-blue-600',
        bgLight: 'bg-blue-500',
        bgDark: 'bg-blue-700',
        border: 'border-blue-600',
        borderLight: 'border-blue-500',
        ring: 'ring-blue-500',
        focusBorder: 'border-blue-500',
        hover: 'hover:bg-blue-700',
        hoverText: 'hover:text-blue-600',
      },
    }
    return colorMap[logoColor.value] || colorMap.blue
  })

  return {
    logoColor,
    colorClasses,
  }
}

