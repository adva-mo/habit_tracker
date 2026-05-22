import { db } from '@/db/database'
import type { HabitCompletion } from '@/types'
import { generateId } from '@/utils/id.utils'

export async function getCompletionsForDate(date: string): Promise<HabitCompletion[]> {
  return db.completions.where('date').equals(date).toArray()
}

export async function getCompletionsForRange(startDate: string, endDate: string): Promise<HabitCompletion[]> {
  return db.completions
    .where('date')
    .between(startDate, endDate, true, true)
    .toArray()
}

export async function getCompletionsForHabit(habitId: string): Promise<HabitCompletion[]> {
  return db.completions.where('habitId').equals(habitId).sortBy('date')
}

export async function toggleCompletion(habitId: string, date: string): Promise<'completed' | 'removed'> {
  const existing = await db.completions
    .where('[habitId+date]')
    .equals([habitId, date])
    .first()

  if (existing) {
    await db.completions.delete(existing.id)
    return 'removed'
  } else {
    await db.completions.add({
      id: generateId(),
      habitId,
      date,
      completedAt: new Date()
    })
    try {
      navigator.vibrate(10)
    } catch {
      // vibrate not supported
    }
    return 'completed'
  }
}

export async function isCompleted(habitId: string, date: string): Promise<boolean> {
  const count = await db.completions
    .where('[habitId+date]')
    .equals([habitId, date])
    .count()
  return count > 0
}

export async function addNote(completionId: string, note: string): Promise<void> {
  await db.completions.update(completionId, { note })
}

export async function getCompletion(habitId: string, date: string): Promise<HabitCompletion | undefined> {
  return db.completions.where('[habitId+date]').equals([habitId, date]).first()
}
