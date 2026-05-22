import { create } from 'zustand'
import type { AppSettings, ThemeOption } from '@/types'
import { DEFAULT_SETTINGS } from '@/types'
import * as settingsService from '@/services/settings.service'

interface SettingsStore {
  settings: AppSettings
  isInitialized: boolean
  loadSettings: () => Promise<void>
  updateSettings: (updates: Partial<AppSettings>) => Promise<void>
  setTheme: (theme: ThemeOption) => Promise<void>
  setPin: (pin: string) => Promise<void>
  clearPin: () => Promise<void>
  verifyPin: (pin: string) => Promise<boolean>
}

function applyTheme(theme: ThemeOption): void {
  const root = document.documentElement
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const isDark = theme === 'dark' || (theme === 'system' && prefersDark)

  if (isDark) {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }

  try {
    localStorage.setItem('habit-theme', theme)
  } catch {
    // ignore
  }
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  settings: { ...DEFAULT_SETTINGS },
  isInitialized: false,

  loadSettings: async () => {
    const settings = await settingsService.getSettings()
    applyTheme(settings.theme)
    set({ settings, isInitialized: true })
  },

  updateSettings: async (updates) => {
    const updated = await settingsService.updateSettings(updates)
    set({ settings: updated })
  },

  setTheme: async (theme) => {
    applyTheme(theme)
    await get().updateSettings({ theme })
  },

  setPin: async (pin) => {
    const hashed = await settingsService.hashPin(pin)
    await get().updateSettings({ pinEnabled: true, pin: hashed })
  },

  clearPin: async () => {
    await get().updateSettings({ pinEnabled: false, pin: undefined })
  },

  verifyPin: async (pin) => {
    const { settings } = get()
    if (!settings.pin) return false
    return settingsService.verifyPin(pin, settings.pin)
  }
}))
