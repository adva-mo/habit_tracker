import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useHabitsByTimeBlock } from '@/hooks/useHabits'
import { useCompletionsForDate } from '@/hooks/useCompletions'
import { TimeBlockSection } from '@/components/shared/TimeBlockSection'
import { HabitCard } from '@/components/shared/HabitCard'
import { EmptyState } from '@/components/shared/EmptyState'
import { CompletionSheet } from './CompletionSheet'
import { TIME_BLOCKS, type TimeBlock, type Habit } from '@/types'
import { todayString } from '@/utils/date.utils'

export function HabitList() {
  const today = todayString()
  const groups = useHabitsByTimeBlock()
  const { isCompleted, toggle } = useCompletionsForDate(today)
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const totalDue = Object.values(groups).flat().length

  if (totalDue === 0) {
    return (
      <EmptyState
        icon="🌸"
        title="All clear for today"
        description="No habits scheduled. Tap the + to add some, or head to Habits to set them up."
      />
    )
  }

  async function handleToggle(habit: Habit) {
    await toggle(habit.id)
  }

  async function handleLongPress(habit: Habit) {
    if (!isCompleted(habit.id)) {
      await toggle(habit.id)
    }
    setSelectedHabit(habit)
    setSheetOpen(true)
  }

  return (
    <>
      <div className="pt-2 pb-4">
        {TIME_BLOCKS.map(({ value: block }) => {
          const habits = groups[block as TimeBlock]
          if (habits.length === 0) return null

          const completedCount = habits.filter((h) => isCompleted(h.id)).length

          return (
            <TimeBlockSection
              key={block}
              timeBlock={block as TimeBlock}
              completedCount={completedCount}
              totalCount={habits.length}
            >
              <AnimatePresence>
                {habits.map((habit) => (
                  <motion.div
                    key={habit.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <HabitCard
                      habit={habit}
                      isCompleted={isCompleted(habit.id)}
                      onToggle={() => handleToggle(habit)}
                      onLongPress={() => handleLongPress(habit)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </TimeBlockSection>
          )
        })}
      </div>

      <CompletionSheet
        habit={selectedHabit}
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
      />
    </>
  )
}
