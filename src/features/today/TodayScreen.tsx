import { useNavigate } from 'react-router-dom'
import { Settings } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { IconButton } from '@/components/ui/IconButton'
import { DailyGreeting } from './DailyGreeting'
import { DailyProgressRing } from './DailyProgressRing'
import { HabitList } from './HabitList'
import { QuickAddHabit } from './QuickAddHabit'

export function TodayScreen() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-full">
      <div className="sticky top-0 z-10 bg-surface">
        <PageHeader
          title="Today"
          right={
            <IconButton label="Settings" onClick={() => navigate('/settings')}>
              <Settings />
            </IconButton>
          }
        />

        <DailyGreeting />

        <div className="mx-4 mt-3 mb-2 bg-surface-2 rounded-3xl overflow-hidden">
          <DailyProgressRing />
        </div>
      </div>

      <HabitList />
      <QuickAddHabit />
    </div>
  )
}
