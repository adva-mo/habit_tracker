import { useState, useEffect } from 'react'
import { useHabitStore } from '@/store/useHabitStore'
import { calculateStreak } from '@/services/analytics.service'

export function useHabitStreak(habitId: string) {
  const [streak, setStreak] = useState({ current: 0, longest: 0 })
  const habits = useHabitStore((s) => s.habits)

  useEffect(() => {
    const habit = habits.find((h) => h.id === habitId)
    if (!habit) return

    calculateStreak(habit).then(setStreak).catch(() => {})
  }, [habitId, habits])

  return streak
}
