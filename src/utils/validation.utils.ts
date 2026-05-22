import type { Habit, HabitCompletion, Category, AppSettings } from '@/types'

interface ExportData {
  version: number
  exportedAt: string
  habits: Habit[]
  completions: HabitCompletion[]
  categories: Category[]
  settings: AppSettings
}

export function isValidExportData(data: unknown): data is ExportData {
  if (!data || typeof data !== 'object') return false
  const d = data as Record<string, unknown>

  if (d.version !== 1) return false
  if (!Array.isArray(d.habits)) return false
  if (!Array.isArray(d.completions)) return false
  if (!Array.isArray(d.categories)) return false
  if (typeof d.settings !== 'object') return false

  return d.habits.every(isValidHabit)
}

function isValidHabit(h: unknown): boolean {
  if (!h || typeof h !== 'object') return false
  const habit = h as Record<string, unknown>
  return (
    typeof habit.id === 'string' &&
    typeof habit.title === 'string' &&
    typeof habit.category === 'string' &&
    typeof habit.timeBlock === 'string' &&
    typeof habit.icon === 'string' &&
    typeof habit.color === 'string'
  )
}

export type { ExportData }
