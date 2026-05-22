import { db } from '@/db/database'
import type { AppSettings } from '@/types'
import { DEFAULT_SETTINGS } from '@/types'

export async function getSettings(): Promise<AppSettings> {
  const settings = await db.settings.get('settings')
  return settings ?? { ...DEFAULT_SETTINGS }
}

export async function saveSettings(settings: AppSettings): Promise<void> {
  await db.settings.put(settings)
}

export async function updateSettings(updates: Partial<AppSettings>): Promise<AppSettings> {
  const current = await getSettings()
  const updated = { ...current, ...updates }
  await db.settings.put(updated)
  return updated
}

export async function hashPin(pin: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(pin)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export async function verifyPin(pin: string, storedHash: string): Promise<boolean> {
  const hash = await hashPin(pin)
  return hash === storedHash
}
