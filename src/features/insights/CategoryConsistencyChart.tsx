import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts'
import type { CategoryConsistency } from '@/types'

interface CategoryConsistencyChartProps {
  data: CategoryConsistency[]
}

export function CategoryConsistencyChart({ data }: CategoryConsistencyChartProps) {
  if (data.length === 0) return null

  const chartData = data.map((d) => ({
    category: d.category.split(' ')[0],
    value: Math.round(d.rate * 100)
  }))

  return (
    <div className="mx-4 mb-4 bg-surface-2 rounded-3xl p-4">
      <h3 className="text-sm font-semibold text-text mb-1">Category consistency</h3>
      <p className="text-xs text-text-muted mb-2">How consistent you are per category</p>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData}>
            <PolarGrid stroke="hsl(var(--color-border))" />
            <PolarAngleAxis
              dataKey="category"
              tick={{ fontSize: 10, fill: 'hsl(var(--color-text-muted))' }}
            />
            <Radar
              dataKey="value"
              stroke="hsl(var(--color-primary))"
              fill="hsl(var(--color-primary))"
              fillOpacity={0.25}
              strokeWidth={2}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null
                return (
                  <div className="bg-surface border border-border rounded-xl px-3 py-2 shadow-card text-xs">
                    <p className="font-semibold text-text">{payload[0].payload.category}</p>
                    <p className="text-text-muted">{payload[0].value}% consistency</p>
                  </div>
                )
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
