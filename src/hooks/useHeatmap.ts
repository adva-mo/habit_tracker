import { useMemo } from 'react'
import { useHabitStore } from '@/store/useHabitStore'
import { useCompletionStore } from '@/store/useCompletionStore'
import { getHabitsDueOnDate } from '@/utils/habit.utils'
import { toDateString } from '@/utils/date.utils'

interface HeatmapDay {
  date: Date | null
  dateStr: string | null
  completed: number
  total: number
  rate: number
}

export function useHeatmap(year: number, month: number): HeatmapDay[] {
  const habits = useHabitStore((s) => s.habits)
  const completionsByDate = useCompletionStore((s) => s.completionsByDate)

  return useMemo(() => {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startPad = firstDay.getDay()

    const days: HeatmapDay[] = []

    // Padding before month start
    for (let i = 0; i < startPad; i++) {
      days.push({ date: null, dateStr: null, completed: 0, total: 0, rate: 0 })
    }

    // Actual month days
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const date = new Date(year, month, d)
      const dateStr = toDateString(date)
      const dueHabits = getHabitsDueOnDate(habits, dateStr)
      const completions = completionsByDate[dateStr] ?? []
      const completedIds = new Set(completions.map((c) => c.habitId))
      const completed = dueHabits.filter((h) => completedIds.has(h.id)).length
      const total = dueHabits.length
      days.push({ date, dateStr, completed, total, rate: total > 0 ? completed / total : 0 })
    }

    // Trailing padding to complete grid
    const remaining = (7 - (days.length % 7)) % 7
    for (let i = 0; i < remaining; i++) {
      days.push({ date: null, dateStr: null, completed: 0, total: 0, rate: 0 })
    }

    return days
  }, [year, month, habits, completionsByDate])
}
