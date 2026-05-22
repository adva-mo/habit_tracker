import { getStreakColor } from '@/utils/color.utils'

interface StreakBadgeProps {
  count: number
  showZero?: boolean
}

export function StreakBadge({ count, showZero = false }: StreakBadgeProps) {
  if (!showZero && count === 0) return null

  return (
    <span
      className="inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-full"
      style={{ color: getStreakColor(count), backgroundColor: `${getStreakColor(count)}20` }}
    >
      🔥 {count}
    </span>
  )
}
