import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import type { DailyRate } from '@/types'
import { formatDayLabel } from '@/utils/date.utils'

interface WeeklyCompletionChartProps {
  data: DailyRate[]
}

export function WeeklyCompletionChart({ data }: WeeklyCompletionChartProps) {
  const chartData = data.map((d) => ({
    day: formatDayLabel(d.date),
    rate: Math.round(d.rate * 100),
    completed: d.completed,
    total: d.total
  }))

  return (
    <div className="mx-4 mb-4 bg-surface-2 rounded-3xl p-4">
      <h3 className="text-sm font-semibold text-text mb-1">Daily completion rate</h3>
      <p className="text-xs text-text-muted mb-4">% of habits completed per day</p>
      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barSize={24}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: 'hsl(var(--color-text-subtle))' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: 'hsl(var(--color-text-subtle))' }}
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
              width={35}
            />
            <Tooltip
              cursor={{ fill: 'hsl(var(--color-surface-3))' }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null
                const d = payload[0].payload as typeof chartData[0]
                return (
                  <div className="bg-surface border border-border rounded-xl px-3 py-2 shadow-card text-xs">
                    <p className="font-semibold text-text">{d.rate}%</p>
                    <p className="text-text-muted">{d.completed} / {d.total} habits</p>
                  </div>
                )
              }}
            />
            <Bar dataKey="rate" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={
                    entry.rate >= 80
                      ? 'hsl(var(--color-primary))'
                      : entry.rate >= 50
                      ? 'hsl(var(--color-primary) / 0.65)'
                      : entry.rate > 0
                      ? 'hsl(var(--color-primary) / 0.35)'
                      : 'hsl(var(--color-surface-3))'
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
