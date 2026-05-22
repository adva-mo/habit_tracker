export type ThemeOption = 'light' | 'dark' | 'system'

export interface AppSettings {
  id: string
  theme: ThemeOption
  pinEnabled: boolean
  pin?: string
  seeded: boolean
}

export const DEFAULT_SETTINGS: AppSettings = {
  id: 'settings',
  theme: 'system',
  pinEnabled: false,
  pin: undefined,
  seeded: false
}
