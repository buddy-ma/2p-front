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
        text: 'text-[#ff7503]',
        textLight: 'text-[#ff7503]/90',
        textDark: 'text-[#ff7503]/95',
        bg: 'bg-[#ff7503]',
        bgLight: 'bg-[#ff7503]/90',
        bgDark: 'bg-[#ff7503]/95',
        border: 'border-[#ff7503]',
        borderLight: 'border-[#ff7503]/70',
        ring: 'ring-[#ff7503]',
        focusBorder: 'border-[#ff7503]',
        hover: 'hover:bg-[#ff7503]/90',
        hoverText: 'hover:text-[#d96903]',
      },
      orangeDecouvrez: {
        text: 'text-[#ff7503]',
        textLight: 'text-[#ff7503]/90',
        textDark: 'text-[#ff7503]/95',
        bg: 'bg-[#ff7503]',
        bgLight: 'bg-[#ff7503]/90',
        bgDark: 'bg-[#ff7503]/95',
        border: 'border-[#ff7503]',
        borderLight: 'border-[#ff7503]/70',
        ring: 'ring-[#ff7503]',
        focusBorder: 'border-[#ff7503]',
        hover: 'hover:bg-[#ff7503]/90',
        hoverText: 'hover:text-[#d96903]',
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
      pink: {
        text: 'text-[#ff1460]',
        textLight: 'text-[#ff1460]/90',
        textDark: 'text-[#ff1460]/95',
        bg: 'bg-[#ff1460]',
        bgLight: 'bg-[#ff1460]/90',
        bgDark: 'bg-[#ff1460]/95',
        border: 'border-[#ff1460]',
        borderLight: 'border-[#ff1460]/70',
        ring: 'ring-[#ff1460]',
        focusBorder: 'border-[#ff1460]',
        hover: 'hover:bg-[#ff1460]/90',
        hoverText: 'hover:text-[#d91156]',
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

