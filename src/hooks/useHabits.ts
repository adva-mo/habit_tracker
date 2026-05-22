import { useMemo } from 'react'
import { useHabitStore } from '@/store/useHabitStore'
import { getHabitsDueToday, getHabitsDueOnDate, groupByTimeBlock, sortByOrder } from '@/utils/habit.utils'
import type { TimeBlock } from '@/types'

export function useHabitsForToday() {
  const habits = useHabitStore((s) => s.habits)
  return useMemo(() => {
    const due = getHabitsDueToday(habits)
    return sortByOrder(due)
  }, [habits])
}

export function useHabitsForDate(date: string) {
  const habits = useHabitStore((s) => s.habits)
  return useMemo(() => {
    const due = getHabitsDueOnDate(habits, date)
    return sortByOrder(due)
  }, [habits, date])
}

export function useHabitsByTimeBlock(date?: string) {
  const habits = useHabitStore((s) => s.habits)
  return useMemo(() => {
    const due = date ? getHabitsDueOnDate(habits, date) : getHabitsDueToday(habits)
    return groupByTimeBlock(sortByOrder(due))
  }, [habits, date])
}

export function useActiveHabits() {
  const habits = useHabitStore((s) => s.habits)
  return useMemo(() => habits.filter((h) => !h.archived && h.active), [habits])
}

export function useArchivedHabits() {
  const habits = useHabitStore((s) => s.habits)
  return useMemo(() => habits.filter((h) => h.archived), [habits])
}

export function useHabitsForTimeBlock(timeBlock: TimeBlock, date?: string) {
  const groups = useHabitsByTimeBlock(date)
  return groups[timeBlock]
}
