import { ProgressRing } from '@/components/ui/ProgressRing'
import { useDailyProgress } from '@/hooks/useDailyProgress'

export function DailyProgressRing() {
  const { total, completed, rate, remaining } = useDailyProgress()

  const getMessage = () => {
    if (total === 0) return 'Add some habits to get started'
    if (rate === 1) return 'Perfect day! All done 🎉'
    if (rate === 0) return "Let's get started!"
    if (remaining === 1) return 'Just one more to go!'
    return `${remaining} habit${remaining !== 1 ? 's' : ''} remaining`
  }

  return (
    <div className="flex items-center gap-5 px-5 py-4">
      <ProgressRing value={rate} size={96} strokeWidth={7}>
        <div className="text-center">
          <div className="text-2xl font-bold text-text leading-none">{Math.round(rate * 100)}</div>
          <div className="text-xs text-text-muted">%</div>
        </div>
      </ProgressRing>

      <div className="flex-1">
        <div className="text-2xl font-bold text-text leading-none">
          {completed}
          <span className="text-lg text-text-muted font-normal"> / {total}</span>
        </div>
        <p className="text-xs text-text-muted mt-1 leading-tight">{getMessage()}</p>

        {/* Mini progress bar */}
        <div className="mt-3 h-1.5 bg-surface-3 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
            style={{ width: `${rate * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
