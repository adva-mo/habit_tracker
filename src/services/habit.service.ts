import { db } from '@/db/database'
import type { Habit, HabitInput } from '@/types'
import { generateId } from '@/utils/id.utils'
import { getNextSortOrder } from '@/utils/habit.utils'

export async function getAllHabits(): Promise<Habit[]> {
  return db.habits.orderBy('sortOrder').toArray()
}

export async function getActiveHabits(): Promise<Habit[]> {
  return db.habits.where('archived').equals(0).and((h) => h.active).sortBy('sortOrder')
}

export async function createHabit(input: HabitInput): Promise<Habit> {
  const all = await getAllHabits()
  const habit: Habit = {
    ...input,
    id: generateId(),
    createdAt: new Date(),
    sortOrder: getNextSortOrder(all),
    archived: false
  }
  await db.habits.add(habit)
  return habit
}

export async function updateHabit(id: string, updates: Partial<Omit<Habit, 'id' | 'createdAt'>>): Promise<void> {
  await db.habits.update(id, updates)
}

export async function deleteHabit(id: string): Promise<void> {
  await db.transaction('rw', db.habits, db.completions, async () => {
    await db.habits.delete(id)
    await db.completions.where('habitId').equals(id).delete()
  })
}

export async function archiveHabit(id: string): Promise<void> {
  await db.habits.update(id, { archived: true })
}

export async function unarchiveHabit(id: string): Promise<void> {
  await db.habits.update(id, { archived: false })
}

export async function duplicateHabit(id: string): Promise<Habit | null> {
  const habit = await db.habits.get(id)
  if (!habit) return null

  const all = await getAllHabits()
  const newHabit: Habit = {
    ...habit,
    id: generateId(),
    title: `${habit.title} (copy)`,
    createdAt: new Date(),
    sortOrder: getNextSortOrder(all)
  }
  await db.habits.add(newHabit)
  return newHabit
}

export async function toggleHabitActive(id: string): Promise<void> {
  const habit = await db.habits.get(id)
  if (habit) {
    await db.habits.update(id, { active: !habit.active })
  }
}

export async function reorderHabits(orderedIds: string[]): Promise<void> {
  await db.transaction('rw', db.habits, async () => {
    for (let i = 0; i < orderedIds.length; i++) {
      await db.habits.update(orderedIds[i], { sortOrder: i })
    }
  })
}
