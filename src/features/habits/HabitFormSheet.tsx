import { useState, useEffect } from 'react'
import { Sheet } from '@/components/ui/Sheet'
import { Button } from '@/components/ui/Button'
import { HabitFormFields } from './HabitFormFields'
import type { Habit, HabitInput } from '@/types'
import { useHabitStore } from '@/store/useHabitStore'
import { useUIStore } from '@/store/useUIStore'
import { useCategoryStore } from '@/store/useCategoryStore'

const DEFAULT_FORM: Partial<HabitInput> = {
  title: '',
  description: '',
  icon: '✨',
  color: '#d4a5c9',
  timeBlock: 'morning',
  frequency: { type: 'daily' },
  active: true,
  targetTime: ''
}

interface HabitFormSheetProps {
  isOpen: boolean
  onClose: () => void
  editHabit?: Habit | null
}

export function HabitFormSheet({ isOpen, onClose, editHabit }: HabitFormSheetProps) {
  const [form, setForm] = useState<Partial<HabitInput>>(DEFAULT_FORM)
  const [isLoading, setIsLoading] = useState(false)
  const { addHabit, updateHabit } = useHabitStore()
  const { pushToast } = useUIStore()
  const { categories } = useCategoryStore()

  useEffect(() => {
    if (editHabit) {
      setForm({
        title: editHabit.title,
        description: editHabit.description,
        icon: editHabit.icon,
        color: editHabit.color,
        category: editHabit.category,
        timeBlock: editHabit.timeBlock,
        frequency: editHabit.frequency,
        targetTime: editHabit.targetTime,
        active: editHabit.active
      })
    } else {
      setForm({ ...DEFAULT_FORM, category: categories[0]?.id })
    }
  }, [editHabit, isOpen, categories])

  function handleChange(updates: Partial<HabitInput>) {
    setForm((prev) => ({ ...prev, ...updates }))
  }

  async function handleSubmit() {
    if (!form.title?.trim()) {
      pushToast('Please enter a habit name', 'error')
      return
    }
    if (!form.category) {
      pushToast('Please select a category', 'error')
      return
    }

    setIsLoading(true)
    try {
      if (editHabit) {
        await updateHabit(editHabit.id, form as Partial<Habit>)
        pushToast('Habit updated!')
      } else {
        await addHabit(form as HabitInput)
        pushToast(`${form.icon} ${form.title} added!`)
      }
      onClose()
    } catch (err) {
      pushToast('Something went wrong', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      title={editHabit ? 'Edit Habit' : 'New Habit'}
      footer={
        <Button fullWidth onClick={handleSubmit} isLoading={isLoading}>
          {editHabit ? 'Save changes' : 'Add habit'}
        </Button>
      }
    >
      <HabitFormFields data={form} onChange={handleChange} />
    </Sheet>
  )
}
