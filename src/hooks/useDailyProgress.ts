import { useMemo } from 'react'
import { useHabitsForToday } from './useHabits'
import { useCompletionStore } from '@/store/useCompletionStore'
import { todayString } from '@/utils/date.utils'

export function useDailyProgress() {
  const todayHabits = useHabitsForToday()
  const completionsByDate = useCompletionStore((s) => s.completionsByDate)
  const today = todayString()

  return useMemo(() => {
    const todayIds = new Set((completionsByDate[today] ?? []).map((c) => c.habitId))
    const total = todayHabits.length
    const completed = todayHabits.filter((h) => todayIds.has(h.id)).length
    const rate = total > 0 ? completed / total : 0
    return { total, completed, rate, remaining: total - completed }
  }, [todayHabits, completionsByDate, today])
}
