import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { InsightsSummaryStats } from './InsightsSummaryStats'
import { WeeklyCompletionChart } from './WeeklyCompletionChart'
import { StreakLeaderboard } from './StreakLeaderboard'
import { CategoryConsistencyChart } from './CategoryConsistencyChart'
import { MissedHabitsCard } from './MissedHabitsCard'
import { Skeleton } from '@/components/ui/Skeleton'
import { useAnalytics } from '@/hooks/useAnalytics'
import type { AnalyticsPeriod } from '@/types'

const PERIODS: { value: AnalyticsPeriod; label: string }[] = [
  { value: '7d', label: '7 days' },
  { value: '30d', label: '30 days' },
  { value: '90d', label: '90 days' }
]

export function InsightsScreen() {
  const [period, setPeriod] = useState<AnalyticsPeriod>('7d')
  const { data, isLoading } = useAnalytics(period)

  return (
    <div className="flex flex-col min-h-full">
      <PageHeader title="Insights" />

      {/* Period selector */}
      <div className="flex gap-2 px-4 pb-4">
        {PERIODS.map((p) => (
          <button
            key={p.value}
            onClick={() => setPeriod(p.value)}
            className={[
              'flex-1 py-2 rounded-2xl text-sm font-medium transition-colors touch-manipulation',
              period === p.value ? 'bg-primary text-primary-foreground' : 'bg-surface-2 text-text-muted hover:bg-surface-3'
            ].join(' ')}
          >
            {p.label}
          </button>
        ))}
      </div>

      {isLoading || !data ? (
        <div className="px-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}
          </div>
          <Skeleton className="h-56 rounded-3xl" />
          <Skeleton className="h-48 rounded-3xl" />
        </div>
      ) : (
        <>
          <InsightsSummaryStats data={data} />
          <WeeklyCompletionChart data={data.weeklyRates} />
          <StreakLeaderboard streaks={data.streaks} />
          <CategoryConsistencyChart data={data.categoryConsistency} />
          <MissedHabitsCard habits={data.mostMissed} />
        </>
      )}
    </div>
  )
}
