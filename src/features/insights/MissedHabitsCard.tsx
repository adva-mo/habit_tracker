interface MissedHabit {
  habitId: string
  title: string
  icon: string
  missedDays: number
}

interface MissedHabitsCardProps {
  habits: MissedHabit[]
}

export function MissedHabitsCard({ habits }: MissedHabitsCardProps) {
  if (habits.length === 0) return null

  return (
    <div className="mx-4 mb-4 bg-surface-2 rounded-3xl p-4">
      <h3 className="text-sm font-semibold text-text mb-1">Needs attention</h3>
      <p className="text-xs text-text-muted mb-4">Most missed habits in this period</p>
      <div className="space-y-2">
        {habits.map((h) => (
          <div key={h.habitId} className="flex items-center gap-3">
            <span className="text-lg">{h.icon}</span>
            <span className="flex-1 text-sm text-text truncate">{h.title}</span>
            <span className="text-xs text-danger font-medium">{h.missedDays}d missed</span>
          </div>
        ))}
      </div>
    </div>
  )
}
