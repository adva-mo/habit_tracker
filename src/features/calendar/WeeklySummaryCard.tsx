import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from 'recharts'
import { useAnalytics } from '@/hooks/useAnalytics'
import { formatDayLabel } from '@/utils/date.utils'

export function WeeklySummaryCard() {
  const { data } = useAnalytics('7d')

  if (!data) return null

  const chartData = data.weeklyRates.map((d) => ({
    day: formatDayLabel(d.date),
    rate: Math.round(d.rate * 100),
    date: d.date
  }))

  return (
    <div className="mx-4 mb-4 bg-surface-2 rounded-3xl p-4">
      <p className="text-xs font-medium text-text-muted mb-3">This week</p>
      <div className="h-20">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barSize={20}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: 'hsl(var(--color-text-subtle))' }}
            />
            <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={
                    entry.rate === 100
                      ? 'hsl(var(--color-primary))'
                      : entry.rate > 50
                      ? 'hsl(var(--color-primary) / 0.6)'
                      : entry.rate > 0
                      ? 'hsl(var(--color-primary) / 0.3)'
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
