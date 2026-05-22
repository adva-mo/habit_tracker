import type { Habit, TimeBlock } from '@/types'
import { isHabitDueOnDate } from './frequency.utils'
import { todayString } from './date.utils'

export function getHabitsDueToday(habits: Habit[]): Habit[] {
  const today = todayString()
  return habits.filter((h) => !h.archived && h.active && isHabitDueOnDate(h, today))
}

export function getHabitsDueOnDate(habits: Habit[], date: string): Habit[] {
  return habits.filter((h) => !h.archived && h.active && isHabitDueOnDate(h, date))
}

export function groupByTimeBlock(habits: Habit[]): Record<TimeBlock, Habit[]> {
  const groups: Record<TimeBlock, Habit[]> = {
    morning: [],
    work: [],
    afternoon: [],
    evening: [],
    night: []
  }
  for (const habit of habits) {
    groups[habit.timeBlock].push(habit)
  }
  return groups
}

export function sortByOrder(habits: Habit[]): Habit[] {
  return [...habits].sort((a, b) => a.sortOrder - b.sortOrder)
}

export function getNextSortOrder(habits: Habit[]): number {
  if (habits.length === 0) return 0
  return Math.max(...habits.map((h) => h.sortOrder)) + 1
}
