import { motion } from 'framer-motion'
import { useHeatmap } from '@/hooks/useHeatmap'
import { getCompletionColor } from '@/utils/color.utils'
import { todayString, toDateString, isToday } from '@/utils/date.utils'

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

interface MonthCalendarProps {
  year: number
  month: number
  onDaySelect: (dateStr: string) => void
  selectedDate: string | null
}

export function MonthCalendar({ year, month, onDaySelect, selectedDate }: MonthCalendarProps) {
  const days = useHeatmap(year, month)
  const today = todayString()

  return (
    <div className="px-4">
      {/* Day labels */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map((label, i) => (
          <div key={i} className="text-center text-xs text-text-subtle py-1 font-medium">
            {label}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          if (!day.date || !day.dateStr) {
            return <div key={i} />
          }

          const dateStr = toDateString(day.date)
          const isCurrentDay = isToday(day.date)
          const isSelected = selectedDate === dateStr
          const isFuture = dateStr > today

          return (
            <motion.button
              key={dateStr}
              whileTap={{ scale: 0.88 }}
              onClick={() => onDaySelect(dateStr)}
              className="relative aspect-square rounded-xl flex items-center justify-center touch-manipulation"
              style={{
                backgroundColor:
                  isSelected
                    ? 'hsl(var(--color-primary))'
                    : isFuture
                    ? undefined
                    : day.total > 0
                    ? getCompletionColor(day.rate)
                    : undefined
              }}
            >
              <span
                className={[
                  'text-sm font-medium leading-none',
                  isSelected
                    ? 'text-primary-foreground'
                    : isCurrentDay
                    ? 'text-primary font-bold'
                    : isFuture
                    ? 'text-text-subtle'
                    : day.total > 0
                    ? 'text-text'
                    : 'text-text-muted'
                ].join(' ')}
              >
                {day.date.getDate()}
              </span>
              {isCurrentDay && !isSelected && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary" />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
