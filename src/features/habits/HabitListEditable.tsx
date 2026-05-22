import { useMemo } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, MoreHorizontal } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Habit } from '@/types'
import { Avatar } from '@/components/ui/Avatar'
import { Switch } from '@/components/ui/Switch'
import { useCategoryStore } from '@/store/useCategoryStore'
import { useHabitStore } from '@/store/useHabitStore'
import { useDragReorder } from '@/hooks/useDragReorder'

interface SortableHabitRowProps {
  habit: Habit
  onMenuOpen: (habit: Habit) => void
}

function SortableHabitRow({ habit, onMenuOpen }: SortableHabitRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: habit.id })
  const toggleActive = useHabitStore((s) => s.toggleActive)

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
    opacity: isDragging ? 0.8 : 1
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      className={['flex items-center gap-3 px-4 py-3 rounded-2xl bg-surface-2 transition-shadow', isDragging ? 'shadow-card-hover' : ''].join(' ')}
    >
      <button
        className="touch-manipulation text-text-subtle cursor-grab active:cursor-grabbing p-1"
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-4 w-4" />
      </button>

      <Avatar icon={habit.icon} color={habit.color} size="sm" />

      <div className="flex-1 min-w-0">
        <p className={['text-sm font-medium truncate', !habit.active ? 'text-text-muted' : 'text-text'].join(' ')}>
          {habit.title}
        </p>
      </div>

      <Switch
        checked={habit.active}
        onChange={() => toggleActive(habit.id)}
        aria-label="Toggle active"
      />

      <button
        onClick={() => onMenuOpen(habit)}
        className="p-1.5 rounded-xl hover:bg-surface-3 text-text-muted touch-manipulation"
        aria-label="More options"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
    </motion.div>
  )
}

interface HabitListEditableProps {
  habits: Habit[]
  onMenuOpen: (habit: Habit) => void
}

export function HabitListEditable({ habits, onMenuOpen }: HabitListEditableProps) {
  const reorderHabits = useHabitStore((s) => s.reorderHabits)
  const { activeId, handleDragStart, handleDragEnd, handleDragCancel } = useDragReorder(habits, reorderHabits)
  const { categories } = useCategoryStore()

  // Suppress unused activeId warning
  void activeId

  const grouped = useMemo(() => {
    const catMap = new Map(categories.map((c) => [c.id, c]))
    const groups: { category: { id: string; name: string; icon: string; color: string } | null; habits: Habit[] }[] = []
    const seen = new Map<string, number>()

    for (const habit of habits) {
      const cat = catMap.get(habit.category)
      const key = habit.category
      if (seen.has(key)) {
        groups[seen.get(key)!].habits.push(habit)
      } else {
        seen.set(key, groups.length)
        groups.push({ category: cat ?? null, habits: [habit] })
      }
    }

    return groups.sort((a, b) =>
      (a.category?.name ?? '').localeCompare(b.category?.name ?? '')
    )
  }, [habits, categories])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={habits.map((h) => h.id)} strategy={verticalListSortingStrategy}>
        <div className="px-4 space-y-5">
          {grouped.map(({ category, habits: groupHabits }) => (
            <div key={category?.id ?? 'uncategorized'}>
              {category && (
                <div className="flex items-center gap-2 mb-2 px-1">
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: `${category.color}20`, color: category.color }}
                  >
                    {category.icon} {category.name}
                  </span>
                  <span className="text-xs text-text-subtle">{groupHabits.length}</span>
                </div>
              )}
              <div className="space-y-2">
                {groupHabits.map((habit) => (
                  <SortableHabitRow key={habit.id} habit={habit} onMenuOpen={onMenuOpen} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
