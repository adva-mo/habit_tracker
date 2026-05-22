import { db } from './database'
import { generateId } from '@/utils/id.utils'
import type { Category, Habit } from '@/types'
import { DEFAULT_SETTINGS } from '@/types'

const DEFAULT_CATEGORIES: Omit<Category, 'id'>[] = [
  { name: 'Health & Fitness', icon: '🏃', color: '#a8d8a8', isDefault: true },
  { name: 'Mindfulness', icon: '🧘', color: '#c4b0d8', isDefault: true },
  { name: 'Work & Focus', icon: '💼', color: '#87ceeb', isDefault: true },
  { name: 'Nutrition', icon: '🥗', color: '#f9c784', isDefault: true },
  { name: 'Social', icon: '💬', color: '#f4a5b1', isDefault: true },
  { name: 'Learning', icon: '📚', color: '#f0b8a0', isDefault: true },
  { name: 'Sleep', icon: '🌙', color: '#b8d4e8', isDefault: true },
  { name: 'Self-care', icon: '✨', color: '#d4a5c9', isDefault: true }
]

const STARTER_HABITS: Omit<Habit, 'id' | 'createdAt' | 'sortOrder'>[] = [
  { title: 'Drink a glass of water', description: 'Start the day hydrated', category: 'Health & Fitness', timeBlock: 'morning', frequency: { type: 'daily' }, icon: '💧', color: '#87ceeb', archived: false, active: true },
  { title: '10-minute stretch', description: 'Gentle morning movement', category: 'Health & Fitness', timeBlock: 'morning', frequency: { type: 'daily' }, icon: '🤸', color: '#a8d8a8', archived: false, active: true },
  { title: 'Journal 3 gratitudes', description: 'Write what you are grateful for', category: 'Mindfulness', timeBlock: 'morning', frequency: { type: 'daily' }, icon: '📓', color: '#f9c784', archived: false, active: true },
  { title: '5-minute meditation', description: 'Quiet the mind', category: 'Mindfulness', timeBlock: 'morning', frequency: { type: 'daily' }, icon: '🧘', color: '#c4b0d8', archived: false, active: true },
  { title: 'Read for 15 minutes', description: 'Morning reading habit', category: 'Learning', timeBlock: 'morning', frequency: { type: 'daily' }, icon: '📖', color: '#f0b8a0', archived: false, active: true },
  { title: 'Plan today\'s top 3 tasks', description: 'Focus the workday', category: 'Work & Focus', timeBlock: 'work', frequency: { type: 'weekdays' }, icon: '📋', color: '#87ceeb', archived: false, active: true },
  { title: 'No phone first 30 min', description: 'Deep focus start', category: 'Work & Focus', timeBlock: 'work', frequency: { type: 'weekdays' }, icon: '📵', color: '#f4a5b1', archived: false, active: true },
  { title: 'Healthy lunch', description: 'No skipping meals', category: 'Nutrition', timeBlock: 'afternoon', frequency: { type: 'daily' }, icon: '🥗', color: '#a8d8a8', archived: false, active: true },
  { title: 'Posture check', description: 'Roll shoulders, sit tall', category: 'Self-care', timeBlock: 'afternoon', frequency: { type: 'daily' }, icon: '🪑', color: '#d4a5c9', archived: false, active: true },
  { title: '30-minute walk or exercise', description: 'Move your body', category: 'Health & Fitness', timeBlock: 'evening', frequency: { type: 'daily' }, icon: '🚶', color: '#a8d8a8', archived: false, active: true },
  { title: 'Call or text a friend', description: 'Stay connected', category: 'Social', timeBlock: 'evening', frequency: { type: 'custom', days: [1, 3, 5] }, icon: '💬', color: '#f4a5b1', archived: false, active: true },
  { title: 'Screen-free wind-down', description: 'No screens 1 hour before bed', category: 'Sleep', timeBlock: 'evening', frequency: { type: 'daily' }, icon: '🌅', color: '#b8d4e8', archived: false, active: true },
  { title: 'Skincare routine', description: 'Evening self-care', category: 'Self-care', timeBlock: 'night', frequency: { type: 'daily' }, icon: '✨', color: '#d4a5c9', archived: false, active: true },
  { title: 'Write tomorrow\'s top 3', description: 'Plan ahead for tomorrow', category: 'Work & Focus', timeBlock: 'night', frequency: { type: 'daily' }, icon: '✏️', color: '#c4b0d8', archived: false, active: true },
  { title: 'Lights out by target time', description: 'Protect your sleep schedule', category: 'Sleep', timeBlock: 'night', targetTime: '23:00', frequency: { type: 'daily' }, icon: '🛏️', color: '#b8d4e8', archived: false, active: true }
]

export async function seedDatabase(): Promise<void> {
  await db.transaction('rw', db.settings, db.habits, db.categories, async () => {
    const existingSettings = await db.settings.get('settings')
    if (existingSettings?.seeded) return

    // Mark as seeded immediately inside the transaction to prevent double-seeding
    await db.settings.put({ ...DEFAULT_SETTINGS, seeded: true })

    const categoryMap = new Map<string, string>()
    for (const cat of DEFAULT_CATEGORIES) {
      const id = generateId()
      categoryMap.set(cat.name, id)
      await db.categories.add({ ...cat, id })
    }

    for (let i = 0; i < STARTER_HABITS.length; i++) {
      const habit = STARTER_HABITS[i]
      const categoryId = categoryMap.get(habit.category) ?? generateId()
      await db.habits.add({
        ...habit,
        id: generateId(),
        category: categoryId,
        createdAt: new Date(),
        sortOrder: i
      })
    }
  })
}
