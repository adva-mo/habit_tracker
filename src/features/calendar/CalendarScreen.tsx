import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { IconButton } from '@/components/ui/IconButton'
import { MonthCalendar } from './MonthCalendar'
import { DayDetailSheet } from './DayDetailSheet'
import { WeeklySummaryCard } from './WeeklySummaryCard'
import { HeatmapLegend } from './HeatmapLegend'
import { useCompletionsForRange } from '@/hooks/useCompletions'
import { formatMonthYear, toDateString } from '@/utils/date.utils'
import { startOfMonth, endOfMonth } from 'date-fns'

export function CalendarScreen() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const startDate = toDateString(startOfMonth(new Date(year, month, 1)))
  const endDate = toDateString(endOfMonth(new Date(year, month, 1)))
  useCompletionsForRange(startDate, endDate)

  function goPrev() {
    if (month === 0) { setMonth(11); setYear((y) => y - 1) }
    else setMonth((m) => m - 1)
  }

  function goNext() {
    if (month === 11) { setMonth(0); setYear((y) => y + 1) }
    else setMonth((m) => m + 1)
  }

  function handleDaySelect(dateStr: string) {
    setSelectedDate(dateStr)
    setSheetOpen(true)
  }

  return (
    <div className="flex flex-col min-h-full">
      <PageHeader
        title="Calendar"
        right={
          <div className="flex items-center gap-1">
            <IconButton label="Previous month" size="sm" onClick={goPrev}>
              <ChevronLeft />
            </IconButton>
            <span className="text-sm font-medium text-text-muted min-w-[110px] text-center">
              {formatMonthYear(year, month)}
            </span>
            <IconButton label="Next month" size="sm" onClick={goNext}>
              <ChevronRight />
            </IconButton>
          </div>
        }
      />

      <WeeklySummaryCard />
      <MonthCalendar year={year} month={month} onDaySelect={handleDaySelect} selectedDate={selectedDate} />
      <HeatmapLegend />

      <DayDetailSheet
        date={selectedDate}
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
      />
    </div>
  )
}
