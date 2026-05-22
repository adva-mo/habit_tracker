import { create } from 'zustand'
import type { Habit, HabitInput } from '@/types'
import * as habitService from '@/services/habit.service'

interface HabitStore {
  habits: Habit[]
  isLoading: boolean
  loadHabits: () => Promise<void>
  addHabit: (input: HabitInput) => Promise<Habit>
  updateHabit: (id: string, updates: Partial<Omit<Habit, 'id' | 'createdAt'>>) => Promise<void>
  deleteHabit: (id: string) => Promise<void>
  archiveHabit: (id: string) => Promise<void>
  unarchiveHabit: (id: string) => Promise<void>
  duplicateHabit: (id: string) => Promise<void>
  reorderHabits: (orderedIds: string[]) => Promise<void>
  toggleActive: (id: string) => Promise<void>
}

export const useHabitStore = create<HabitStore>((set, get) => ({
  habits: [],
  isLoading: false,

  loadHabits: async () => {
    set({ isLoading: true })
    const habits = await habitService.getAllHabits()
    set({ habits, isLoading: false })
  },

  addHabit: async (input) => {
    const habit = await habitService.createHabit(input)
    await get().loadHabits()
    return habit
  },

  updateHabit: async (id, updates) => {
    await habitService.updateHabit(id, updates)
    await get().loadHabits()
  },

  deleteHabit: async (id) => {
    await habitService.deleteHabit(id)
    await get().loadHabits()
  },

  archiveHabit: async (id) => {
    await habitService.archiveHabit(id)
    await get().loadHabits()
  },

  unarchiveHabit: async (id) => {
    await habitService.unarchiveHabit(id)
    await get().loadHabits()
  },

  duplicateHabit: async (id) => {
    await habitService.duplicateHabit(id)
    await get().loadHabits()
  },

  reorderHabits: async (orderedIds) => {
    // Optimistic update
    const habits = get().habits
    const reordered = orderedIds
      .map((id, i) => {
        const habit = habits.find((h) => h.id === id)
        return habit ? { ...habit, sortOrder: i } : null
      })
      .filter(Boolean) as Habit[]
    set({ habits: reordered })
    await habitService.reorderHabits(orderedIds)
  },

  toggleActive: async (id) => {
    await habitService.toggleHabitActive(id)
    await get().loadHabits()
  }
}))
