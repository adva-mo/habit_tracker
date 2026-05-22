import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import type { Habit } from '@/types'
import { useHabitStore } from '@/store/useHabitStore'
import { useUIStore } from '@/store/useUIStore'

interface ArchivedHabitsSectionProps {
  habits: Habit[]
}

export function ArchivedHabitsSection({ habits }: ArchivedHabitsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { unarchiveHabit, deleteHabit } = useHabitStore()
  const { pushToast } = useUIStore()

  if (habits.length === 0) return null

  return (
    <div className="mt-4 mx-4">
      <button
        onClick={() => setIsExpanded((e) => !e)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-surface-2 text-text-muted transition-colors hover:bg-surface-3 touch-manipulation"
      >
        <span className="text-sm font-medium">Archived ({habits.length})</span>
        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-1 mt-2">
              {habits.map((habit) => (
                <div key={habit.id} className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-surface-2">
                  <Avatar icon={habit.icon} color={habit.color} size="sm" />
                  <span className="flex-1 text-sm text-text-muted line-through">{habit.title}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={async () => { await unarchiveHabit(habit.id); pushToast('Habit restored!') }}
                  >
                    Restore
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={async () => { await deleteHabit(habit.id); pushToast('Habit deleted') }}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
