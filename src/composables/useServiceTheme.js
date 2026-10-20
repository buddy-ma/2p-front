import { computed } from 'vue'
import { useTheme } from './useTheme'

const DARK_TEXT = {
  'text-blue-800': 'dark:text-blue-400',
}

export function useServiceTheme() {
  const theme = useTheme()

  const colorClasses = computed(() => {
    const base = theme.colorClasses.value
    const dark = DARK_TEXT[base.text]
    return dark ? { ...base, text: `${base.text} ${dark}` } : base
  })

  return { ...theme, colorClasses }
}
