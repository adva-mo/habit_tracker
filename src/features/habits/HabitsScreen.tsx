import { useState } from 'react'
import { Plus, FolderPlus } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { IconButton } from '@/components/ui/IconButton'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/shared/EmptyState'
import { ConfirmDialog } from '@/components/shared/ConfirmDialog'
import { HabitListEditable } from './HabitListEditable'
import { HabitFormSheet } from './HabitFormSheet'
import { HabitActionsMenu } from './HabitActionsMenu'
import { CategoryFormSheet } from './CategoryFormSheet'
import { ArchivedHabitsSection } from './ArchivedHabitsSection'
import type { Habit } from '@/types'
import { useHabitStore } from '@/store/useHabitStore'
import { useActiveHabits, useArchivedHabits } from '@/hooks/useHabits'
import { useUIStore } from '@/store/useUIStore'

export function HabitsScreen() {
  const [formOpen, setFormOpen] = useState(false)
  const [categoryFormOpen, setCategoryFormOpen] = useState(false)
  const [actionsOpen, setActionsOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null)
  const [editHabit, setEditHabit] = useState<Habit | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const { duplicateHabit, archiveHabit, unarchiveHabit, deleteHabit } = useHabitStore()
  const activeHabits = useActiveHabits()
  const archivedHabits = useArchivedHabits()
  const { pushToast } = useUIStore()

  function openMenu(habit: Habit) {
    setSelectedHabit(habit)
    setActionsOpen(true)
  }

  function handleEdit() {
    setEditHabit(selectedHabit)
    setActionsOpen(false)
    setFormOpen(true)
  }

  async function handleDuplicate() {
    if (!selectedHabit) return
    await duplicateHabit(selectedHabit.id)
    pushToast(`${selectedHabit.icon} Duplicated!`)
  }

  async function handleArchive() {
    if (!selectedHabit) return
    if (selectedHabit.archived) {
      await unarchiveHabit(selectedHabit.id)
      pushToast('Habit restored!')
    } else {
      await archiveHabit(selectedHabit.id)
      pushToast('Habit archived')
    }
  }

  async function handleDelete() {
    if (!selectedHabit) return
    setIsDeleting(true)
    await deleteHabit(selectedHabit.id)
    pushToast('Habit deleted')
    setIsDeleting(false)
    setDeleteOpen(false)
  }

  return (
    <div className="flex flex-col min-h-full">
      <PageHeader
        title="My Habits"
        subtitle={`${activeHabits.length} active`}
        right={
          <div className="flex gap-1">
            <IconButton label="New category" onClick={() => setCategoryFormOpen(true)}>
              <FolderPlus />
            </IconButton>
            <IconButton label="New habit" onClick={() => { setEditHabit(null); setFormOpen(true) }}>
              <Plus />
            </IconButton>
          </div>
        }
      />

      <div className="pt-2 pb-6">
        {activeHabits.length === 0 ? (
          <EmptyState
            icon="🌱"
            title="No habits yet"
            description="Start building your routine by adding your first habit."
            action={
              <Button onClick={() => { setEditHabit(null); setFormOpen(true) }}>
                Add first habit
              </Button>
            }
          />
        ) : (
          <HabitListEditable habits={activeHabits} onMenuOpen={openMenu} />
        )}

        <ArchivedHabitsSection habits={archivedHabits} />
      </div>

      <HabitFormSheet
        isOpen={formOpen}
        onClose={() => { setFormOpen(false); setEditHabit(null) }}
        editHabit={editHabit}
      />

      <CategoryFormSheet isOpen={categoryFormOpen} onClose={() => setCategoryFormOpen(false)} />

      <HabitActionsMenu
        habit={selectedHabit}
        isOpen={actionsOpen}
        onClose={() => setActionsOpen(false)}
        onEdit={handleEdit}
        onDuplicate={handleDuplicate}
        onArchive={handleArchive}
        onDelete={() => { setActionsOpen(false); setDeleteOpen(true) }}
      />

      <ConfirmDialog
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete habit?"
        message={`"${selectedHabit?.title}" and all its history will be permanently deleted.`}
        confirmLabel="Delete"
        isDestructive
        isLoading={isDeleting}
      />
    </div>
  )
}
