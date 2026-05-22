import { Sheet } from '@/components/ui/Sheet'
import { Avatar } from '@/components/ui/Avatar'
import type { Habit } from '@/types'
import { Edit, Copy, Archive, ArchiveRestore, Trash2 } from 'lucide-react'

interface HabitActionsMenuProps {
  habit: Habit | null
  isOpen: boolean
  onClose: () => void
  onEdit: () => void
  onDuplicate: () => void
  onArchive: () => void
  onDelete: () => void
}

export function HabitActionsMenu({
  habit,
  isOpen,
  onClose,
  onEdit,
  onDuplicate,
  onArchive,
  onDelete
}: HabitActionsMenuProps) {
  if (!habit) return null

  const actions = [
    { icon: Edit, label: 'Edit habit', onClick: onEdit },
    { icon: Copy, label: 'Duplicate', onClick: onDuplicate },
    { icon: habit.archived ? ArchiveRestore : Archive, label: habit.archived ? 'Unarchive' : 'Archive', onClick: onArchive },
    { icon: Trash2, label: 'Delete habit', onClick: onDelete, danger: true }
  ]

  return (
    <Sheet isOpen={isOpen} onClose={onClose}>
      <div className="px-5 py-4 space-y-1">
        <div className="flex items-center gap-3 mb-4">
          <Avatar icon={habit.icon} color={habit.color} size="md" />
          <div>
            <p className="font-semibold text-text">{habit.title}</p>
            <p className="text-xs text-text-muted">Choose an action</p>
          </div>
        </div>

        {actions.map(({ icon: Icon, label, onClick, danger }) => (
          <button
            key={label}
            onClick={() => { onClick(); onClose() }}
            className={[
              'w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left transition-colors touch-manipulation',
              danger
                ? 'text-danger hover:bg-danger/10 active:bg-danger/15'
                : 'text-text hover:bg-surface-2 active:bg-surface-3'
            ].join(' ')}
          >
            <Icon className="h-5 w-5 flex-shrink-0" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>
    </Sheet>
  )
}
