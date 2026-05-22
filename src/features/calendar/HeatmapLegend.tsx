import { getCompletionColor } from '@/utils/color.utils'

export function HeatmapLegend() {
  const steps = [0, 0.25, 0.5, 0.75, 1]

  return (
    <div className="flex items-center gap-1.5 px-5 py-2">
      <span className="text-xs text-text-subtle mr-1">Less</span>
      {steps.map((step) => (
        <div
          key={step}
          className="h-4 w-4 rounded-sm border border-border/30"
          style={{ backgroundColor: step === 0 ? 'hsl(var(--color-surface-3))' : getCompletionColor(step) }}
        />
      ))}
      <span className="text-xs text-text-subtle ml-1">More</span>
    </div>
  )
}
