import { create } from 'zustand'
import type { HabitCompletion, CompletionsByDate } from '@/types'
import * as completionService from '@/services/completion.service'

interface CompletionStore {
  completionsByDate: CompletionsByDate
  loadCompletionsForDate: (date: string) => Promise<void>
  loadCompletionsForRange: (startDate: string, endDate: string) => Promise<void>
  toggleCompletion: (habitId: string, date: string) => Promise<'completed' | 'removed'>
  addNote: (completionId: string, note: string) => Promise<void>
  getCompletionsForDate: (date: string) => HabitCompletion[]
  isHabitCompletedOnDate: (habitId: string, date: string) => boolean
}

export const useCompletionStore = create<CompletionStore>((set, get) => ({
  completionsByDate: {},

  loadCompletionsForDate: async (date) => {
    const completions = await completionService.getCompletionsForDate(date)
    set((state) => ({
      completionsByDate: { ...state.completionsByDate, [date]: completions }
    }))
  },

  loadCompletionsForRange: async (startDate, endDate) => {
    const completions = await completionService.getCompletionsForRange(startDate, endDate)
    const byDate: CompletionsByDate = {}
    for (const c of completions) {
      if (!byDate[c.date]) byDate[c.date] = []
      byDate[c.date].push(c)
    }
    set((state) => ({
      completionsByDate: { ...state.completionsByDate, ...byDate }
    }))
  },

  toggleCompletion: async (habitId, date) => {
    const existing = (get().completionsByDate[date] ?? []).find((c) => c.habitId === habitId)

    if (existing) {
      set((state) => ({
        completionsByDate: {
          ...state.completionsByDate,
          [date]: (state.completionsByDate[date] ?? []).filter((c) => c.habitId !== habitId)
        }
      }))
    } else {
      const optimistic: HabitCompletion = { id: `tmp-${habitId}`, habitId, date, completedAt: new Date() }
      set((state) => ({
        completionsByDate: {
          ...state.completionsByDate,
          [date]: [...(state.completionsByDate[date] ?? []), optimistic]
        }
      }))
    }

    const result = await completionService.toggleCompletion(habitId, date)
    // Reload to replace the optimistic entry with the real DB record (needed for note IDs)
    await get().loadCompletionsForDate(date)
    return result
  },

  addNote: async (completionId, note) => {
    await completionService.addNote(completionId, note)
    set((state) => {
      const newByDate: CompletionsByDate = {}
      for (const [date, completions] of Object.entries(state.completionsByDate)) {
        newByDate[date] = completions.map((c) => (c.id === completionId ? { ...c, note } : c))
      }
      return { completionsByDate: newByDate }
    })
  },

  getCompletionsForDate: (date) => {
    return get().completionsByDate[date] ?? []
  },

  isHabitCompletedOnDate: (habitId, date) => {
    const completions = get().completionsByDate[date] ?? []
    return completions.some((c) => c.habitId === habitId)
  }
}))
