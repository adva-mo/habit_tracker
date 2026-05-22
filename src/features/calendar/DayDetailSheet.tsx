import { Sheet } from '@/components/ui/Sheet'
import { HabitCard } from '@/components/shared/HabitCard'
import { EmptyState } from '@/components/shared/EmptyState'
import { useHabitsForDate } from '@/hooks/useHabits'
import { useCompletionStore } from '@/store/useCompletionStore'
import { formatDisplayDate } from '@/utils/date.utils'

interface DayDetailSheetProps {
  date: string | null
  isOpen: boolean
  onClose: () => void
}

export function DayDetailSheet({ date, isOpen, onClose }: DayDetailSheetProps) {
  const habits = useHabitsForDate(date ?? '')
  const { isHabitCompletedOnDate, getCompletionsForDate } = useCompletionStore()

  const d = date ?? ''
  const completions = getCompletionsForDate(d)
  const completedCount = habits.filter((h) => isHabitCompletedOnDate(h.id, d)).length

  return (
    <Sheet isOpen={isOpen} onClose={onClose} title={date ? formatDisplayDate(date) : ''}>
      <div className="px-2 py-4">
        {habits.length === 0 ? (
          <EmptyState icon="🗓️" title="No habits scheduled" description="No habits were due on this day." />
        ) : (
          <>
            <p className="text-xs text-text-muted px-3 mb-3">
              {completedCount} of {habits.length} completed
            </p>
            <div className="space-y-1 px-2">
              {habits.map((habit) => {
                const completion = completions.find((c) => c.habitId === habit.id)
                return (
                  <div key={habit.id}>
                    <HabitCard
                      habit={habit}
                      isCompleted={!!completion}
                      onToggle={() => {}}
                      readonly
                    />
                    {completion?.note && (
                      <p className="text-xs text-text-muted italic px-4 pt-1 pb-3">
                        "{completion.note}"
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </Sheet>
  )
}
