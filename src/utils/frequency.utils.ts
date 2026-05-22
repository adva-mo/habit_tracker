import type { Habit, FrequencySpec } from '@/types'
import { getDayOfWeek } from './date.utils'

export function isHabitDueOnDate(habit: Habit, dateStr: string): boolean {
  return isFrequencyDueOnDate(habit.frequency, dateStr)
}

export function isFrequencyDueOnDate(frequency: FrequencySpec, dateStr: string): boolean {
  const dayOfWeek = getDayOfWeek(dateStr)

  switch (frequency.type) {
    case 'daily':
      return true
    case 'weekdays':
      return dayOfWeek >= 1 && dayOfWeek <= 5
    case 'weekends':
      return dayOfWeek === 0 || dayOfWeek === 6
    case 'custom':
      return frequency.days.includes(dayOfWeek)
  }
}

export function getFrequencyLabel(frequency: FrequencySpec): string {
  switch (frequency.type) {
    case 'daily':
      return 'Every day'
    case 'weekdays':
      return 'Weekdays'
    case 'weekends':
      return 'Weekends'
    case 'custom': {
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      return frequency.days.map((d) => dayNames[d]).join(', ')
    }
  }
}

export function getFrequencyDaysCount(frequency: FrequencySpec): number {
  switch (frequency.type) {
    case 'daily':
      return 7
    case 'weekdays':
      return 5
    case 'weekends':
      return 2
    case 'custom':
      return frequency.days.length
  }
}
