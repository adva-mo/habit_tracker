import type { AnalyticsSummary } from '@/types'

interface StatCardProps {
  label: string
  value: string | number
  emoji: string
  color: string
}

function StatCard({ label, value, emoji, color }: StatCardProps) {
  return (
    <div
      className="flex flex-col gap-1 p-4 rounded-2xl"
      style={{ backgroundColor: `${color}15` }}
    >
      <span className="text-xl">{emoji}</span>
      <span className="text-2xl font-bold text-text">{value}</span>
      <span className="text-xs text-text-muted">{label}</span>
    </div>
  )
}

interface InsightsSummaryStatsProps {
  data: AnalyticsSummary
}

export function InsightsSummaryStats({ data }: InsightsSummaryStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 px-4 mb-4">
      <StatCard label="Total completed" value={data.totalCompletions} emoji="✅" color="#a8d8a8" />
      <StatCard label="Best streak" value={`${data.bestStreak}d`} emoji="🔥" color="#f9c784" />
      <StatCard label="Active habits" value={data.activeHabits} emoji="🌱" color="#d4a5c9" />
      <StatCard label="Current streaks" value={data.currentStreaks} emoji="⚡" color="#87ceeb" />
    </div>
  )
}
