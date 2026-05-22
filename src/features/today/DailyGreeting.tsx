import { getGreeting } from '@/utils/date.utils'
import { format } from 'date-fns'

export function DailyGreeting() {
  const greeting = getGreeting()
  const today = format(new Date(), 'EEEE, MMMM d')

  return (
    <div className="px-5 pt-2 pb-1">
      <p className="text-sm text-text-muted">{today}</p>
      <h2 className="text-2xl font-bold text-text mt-0.5">{greeting} ✨</h2>
    </div>
  )
}
