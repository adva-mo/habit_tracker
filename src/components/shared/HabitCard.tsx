import { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Clock } from 'lucide-react'
import type { Habit } from '@/types'
import { Avatar } from '@/components/ui/Avatar'
import { StreakBadge } from './StreakBadge'
import { useHabitStreak } from '@/hooks/useStreak'
import { hexToRgba } from '@/utils/color.utils'

interface HabitCardProps {
  habit: Habit
  isCompleted: boolean
  onToggle: () => void
  onLongPress?: () => void
  readonly?: boolean
}

export function HabitCard({ habit, isCompleted, onToggle, onLongPress, readonly = false }: HabitCardProps) {
  const { current: streak } = useHabitStreak(habit.id)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const didLongPress = useRef(false)
  const startPos = useRef<{ x: number; y: number } | null>(null)

  function cancelTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    startPos.current = null
  }

  function handlePointerDown(e: React.PointerEvent) {
    if (readonly) return
    didLongPress.current = false
    startPos.current = { x: e.clientX, y: e.clientY }
    timerRef.current = setTimeout(() => {
      didLongPress.current = true
      onLongPress?.()
    }, 500)
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!startPos.current) return
    const dx = Math.abs(e.clientX - startPos.current.x)
    const dy = Math.abs(e.clientY - startPos.current.y)
    if (dx > 8 || dy > 8) cancelTimer()
  }

  function handleClick() {
    if (readonly || didLongPress.current) return
    onToggle()
  }

  return (
    <motion.button
      layout
      type="button"
      disabled={readonly}
      onPointerDown={readonly ? undefined : handlePointerDown}
      onPointerMove={readonly ? undefined : handlePointerMove}
      onPointerUp={readonly ? undefined : cancelTimer}
      onPointerLeave={readonly ? undefined : cancelTimer}
      onPointerCancel={readonly ? undefined : cancelTimer}
      onClick={handleClick}
      whileTap={readonly ? {} : { scale: 0.98 }}
      className="w-full flex items-center gap-3 p-3.5 rounded-2xl transition-colors duration-200 touch-manipulation text-left"
      style={{
        backgroundColor: isCompleted ? hexToRgba(habit.color, 0.12) : undefined
      }}
    >
      <Avatar icon={habit.icon} color={habit.color} size="md" />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={[
              'text-sm font-medium leading-tight transition-colors',
              isCompleted ? 'text-text-muted line-through' : 'text-text'
            ].join(' ')}
          >
            {habit.title}
          </span>
          {streak > 0 && <StreakBadge count={streak} />}
        </div>
        {habit.targetTime && (
          <div className="flex items-center gap-1 mt-0.5">
            <Clock className="h-3 w-3 text-text-subtle" />
            <span className="text-xs text-text-subtle">{habit.targetTime}</span>
          </div>
        )}
      </div>

      {!readonly && (
        <div
          className={[
            'h-7 w-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200',
            isCompleted ? 'border-transparent' : 'border-border bg-transparent'
          ].join(' ')}
          style={isCompleted ? { backgroundColor: habit.color } : undefined}
        >
          <AnimatePresence>
            {isCompleted && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              >
                <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.button>
  )
}
