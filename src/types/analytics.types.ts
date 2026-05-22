export interface DailyRate {
  date: string
  completed: number
  total: number
  rate: number
}

export interface StreakData {
  habitId: string
  title: string
  icon: string
  color: string
  current: number
  longest: number
}

export interface CategoryConsistency {
  category: string
  rate: number
  completions: number
  total: number
}

export interface AnalyticsSummary {
  totalCompletions: number
  bestStreak: number
  currentStreaks: number
  activeHabits: number
  weeklyRates: DailyRate[]
  streaks: StreakData[]
  categoryConsistency: CategoryConsistency[]
  mostMissed: { habitId: string; title: string; icon: string; missedDays: number }[]
}

export type AnalyticsPeriod = '7d' | '30d' | '90d'
