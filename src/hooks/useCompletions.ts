import { useEffect } from 'react'
import { useCompletionStore } from '@/store/useCompletionStore'

export function useCompletionsForDate(date: string) {
  const { loadCompletionsForDate, getCompletionsForDate, isHabitCompletedOnDate, toggleCompletion } =
    useCompletionStore()

  useEffect(() => {
    loadCompletionsForDate(date)
  }, [date, loadCompletionsForDate])

  return {
    completions: getCompletionsForDate(date),
    isCompleted: (habitId: string) => isHabitCompletedOnDate(habitId, date),
    toggle: (habitId: string) => toggleCompletion(habitId, date)
  }
}

export function useCompletionsForRange(startDate: string, endDate: string) {
  const { loadCompletionsForRange, completionsByDate } = useCompletionStore()

  useEffect(() => {
    loadCompletionsForRange(startDate, endDate)
  }, [startDate, endDate, loadCompletionsForRange])

  return completionsByDate
}
