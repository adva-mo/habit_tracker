import type { StreakData } from '@/types'
import { StreakBadge } from '@/components/shared/StreakBadge'

interface StreakLeaderboardProps {
  streaks: StreakData[]
}

export function StreakLeaderboard({ streaks }: StreakLeaderboardProps) {
  const top = streaks.filter((s) => s.current > 0).slice(0, 8)

  if (top.length === 0) {
    return (
      <div className="mx-4 mb-4 bg-surface-2 rounded-3xl p-4">
        <h3 className="text-sm font-semibold text-text mb-1">Current streaks</h3>
        <p className="text-xs text-text-muted mt-4 text-center py-4">Complete habits to build streaks 🔥</p>
      </div>
    )
  }

  return (
    <div className="mx-4 mb-4 bg-surface-2 rounded-3xl p-4">
      <h3 className="text-sm font-semibold text-text mb-4">Current streaks 🔥</h3>
      <div className="space-y-2">
        {top.map((s, i) => (
          <div key={s.habitId} className="flex items-center gap-3">
            <span className="text-xs font-bold text-text-subtle w-4">{i + 1}</span>
            <span className="text-lg">{s.icon}</span>
            <span className="flex-1 text-sm text-text truncate">{s.title}</span>
            <StreakBadge count={s.current} showZero />
          </div>
        ))}
      </div>
    </div>
  )
}
