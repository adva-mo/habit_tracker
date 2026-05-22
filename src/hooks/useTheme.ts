import { useEffect } from 'react'
import { useSettingsStore } from '@/store/useSettingsStore'

export function useTheme() {
  const { settings, setTheme } = useSettingsStore()

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if (settings.theme === 'system') {
        const root = document.documentElement
        mq.matches ? root.classList.add('dark') : root.classList.remove('dark')
      }
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [settings.theme])

  return { theme: settings.theme, setTheme }
}
