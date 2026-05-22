import { useState, useEffect } from 'react'
import type { AnalyticsSummary, AnalyticsPeriod } from '@/types'
import { getAnalytics } from '@/services/analytics.service'
import { useHabitStore } from '@/store/useHabitStore'
import { useCompletionStore } from '@/store/useCompletionStore'

export function useAnalytics(period: AnalyticsPeriod) {
  const [data, setData] = useState<AnalyticsSummary | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const habits = useHabitStore((s) => s.habits)
  const completionsByDate = useCompletionStore((s) => s.completionsByDate)

  useEffect(() => {
    setIsLoading(true)
    getAnalytics(period)
      .then((result) => {
        setData(result)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [period, habits, completionsByDate])

  return { data, isLoading }
}
