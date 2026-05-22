import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sheet } from '@/components/ui/Sheet'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import type { Habit } from '@/types'
import { useCompletionStore } from '@/store/useCompletionStore'
import { todayString } from '@/utils/date.utils'

interface CompletionSheetProps {
  habit: Habit | null
  isOpen: boolean
  onClose: () => void
}

export function CompletionSheet({ habit, isOpen, onClose }: CompletionSheetProps) {
  const [note, setNote] = useState('')
  const [showNote, setShowNote] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { addNote, getCompletionsForDate } = useCompletionStore()

  useEffect(() => {
    if (isOpen) {
      setNote('')
      setShowNote(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (showNote) {
      const t = setTimeout(() => textareaRef.current?.focus(), 80)
      return () => clearTimeout(t)
    }
  }, [showNote])

  if (!habit) return null

  const completions = getCompletionsForDate(todayString())
  const completion = completions.find((c) => c.habitId === habit.id)

  async function handleDone() {
    if (completion && note.trim()) {
      await addNote(completion.id, note.trim())
    }
    onClose()
  }

  return (
    <Sheet
      isOpen={isOpen}
      onClose={handleDone}
      footer={
        <div className="flex gap-3">
          <AnimatePresence initial={false}>
            {!showNote && (
              <motion.div
                key="add-note-btn"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-1 overflow-hidden"
              >
                <Button variant="secondary" fullWidth onClick={() => setShowNote(true)}>
                  Add note
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex-1">
            <Button fullWidth onClick={handleDone}>
              {note.trim() ? 'Save & close' : 'Done'}
            </Button>
          </div>
        </div>
      }
    >
      <div className="px-5 pt-6 pb-4 space-y-5">
        <div className="flex flex-col items-center gap-3">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 380, damping: 22, delay: 0.05 }}
            className="h-20 w-20 rounded-3xl flex items-center justify-center text-4xl"
            style={{ backgroundColor: `${habit.color}22`, border: `2px solid ${habit.color}44` }}
          >
            {habit.icon}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.25 }}
            className="text-center space-y-0.5"
          >
            <p className="font-semibold text-text text-base">{habit.title}</p>
            <p className="text-sm text-text-muted">Completed today</p>
          </motion.div>
        </div>

        <AnimatePresence>
          {showNote && (
            <motion.div
              key="note"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <Textarea
                ref={textareaRef}
                label="How did it go?"
                placeholder="Any thoughts or reflections..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Sheet>
  )
}
