export interface HabitCompletion {
  id: string
  habitId: string
  date: string
  completedAt: Date
  note?: string
}

export type CompletionsByDate = Record<string, HabitCompletion[]>
