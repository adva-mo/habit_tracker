import Dexie, { type EntityTable } from 'dexie'
import type { Habit, HabitCompletion, Category, AppSettings } from '@/types'

const db = new Dexie('HabitTrackerDB') as Dexie & {
  habits: EntityTable<Habit, 'id'>
  completions: EntityTable<HabitCompletion, 'id'>
  categories: EntityTable<Category, 'id'>
  settings: EntityTable<AppSettings, 'id'>
}

db.version(1).stores({
  habits: 'id, archived, active, category, timeBlock, sortOrder',
  completions: 'id, habitId, date, [habitId+date]',
  categories: 'id',
  settings: 'id'
})

export { db }
