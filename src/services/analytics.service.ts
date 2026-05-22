import { db } from '@/db/database'
import type { Habit, AnalyticsSummary, DailyRate, StreakData, CategoryConsistency, AnalyticsPeriod } from '@/types'
import { isHabitDueOnDate } from '@/utils/frequency.utils'
import { todayString, subDays, toDateString, fromDateString } from '@/utils/date.utils'

export async function calculateStreak(habit: Habit): Promise<{ current: number; longest: number }> {
  const completions = await db.completions
    .where('habitId')
    .equals(habit.id)
    .sortBy('date')

  const completedDates = new Set(completions.map((c) => c.date))

  const today = new Date()
  let current = 0
  let longest = 0
  let run = 0

  // Walk backwards from today to compute current streak
  let d = today
  while (true) {
    const dateStr = toDateString(d)
    if (isHabitDueOnDate(habit, dateStr)) {
      if (completedDates.has(dateStr)) {
        current++
      } else if (dateStr !== todayString()) {
        break
      } else {
        // today not yet completed — don't break streak
      }
    }
    d = subDays(d, 1)
    if (fromDateString(dateStr) < fromDateString(completions[0]?.date ?? toDateString(subDays(today, 365)))) break
  }

  // Walk all history to find longest streak
  const allDates = completions.map((c) => c.date)
  if (allDates.length > 0) {
    const start = fromDateString(allDates[0])
    const end = today
    let cursor = start
    run = 0

    while (cursor <= end) {
      const dateStr = toDateString(cursor)
      if (isHabitDueOnDate(habit, dateStr)) {
        if (completedDates.has(dateStr)) {
          run++
          longest = Math.max(longest, run)
        } else {
          run = 0
        }
      }
      cursor = new Date(cursor.getTime() + 86400000)
    }
  }

  return { current, longest }
}

export async function getAnalytics(period: AnalyticsPeriod): Promise<AnalyticsSummary> {
  const days = period === '7d' ? 7 : period === '30d' ? 30 : 90
  const today = new Date()
  const startDate = toDateString(subDays(today, days - 1))
  const endDate = todayString()

  const habits = await db.habits.where('archived').equals(0).and((h) => h.active).toArray()
  const completions = await db.completions
    .where('date')
    .between(startDate, endDate, true, true)
    .toArray()

  const completionsByDate = new Map<string, Set<string>>()
  for (const c of completions) {
    if (!completionsByDate.has(c.date)) completionsByDate.set(c.date, new Set())
    completionsByDate.get(c.date)!.add(c.habitId)
  }

  // Daily rates
  const weeklyRates: DailyRate[] = []
  let d = new Date(subDays(today, days - 1))
  while (d <= today) {
    const dateStr = toDateString(d)
    const dueHabits = habits.filter((h) => isHabitDueOnDate(h, dateStr))
    const completedSet = completionsByDate.get(dateStr) ?? new Set()
    const completed = dueHabits.filter((h) => completedSet.has(h.id)).length
    const total = dueHabits.length
    weeklyRates.push({ date: dateStr, completed, total, rate: total > 0 ? completed / total : 0 })
    d = new Date(d.getTime() + 86400000)
  }

  // Streaks
  const streaks: StreakData[] = await Promise.all(
    habits.map(async (h) => {
      const s = await calculateStreak(h)
      return { habitId: h.id, title: h.title, icon: h.icon, color: h.color, ...s }
    })
  )

  // Category consistency
  const categories = await db.categories.toArray()
  const categoryConsistency: CategoryConsistency[] = categories.map((cat) => {
    const catHabits = habits.filter((h) => h.category === cat.id)
    let total = 0, completed = 0
    for (const rate of weeklyRates) {
      const due = catHabits.filter((h) => isHabitDueOnDate(h, rate.date))
      const completedSet = completionsByDate.get(rate.date) ?? new Set()
      total += due.length
      completed += due.filter((h) => completedSet.has(h.id)).length
    }
    return { category: cat.name, rate: total > 0 ? completed / total : 0, completions: completed, total }
  }).filter((c) => c.total > 0)

  // Most missed
  const mostMissed = habits
    .map((h) => {
      let missedDays = 0
      for (const rate of weeklyRates) {
        if (isHabitDueOnDate(h, rate.date)) {
          const completedSet = completionsByDate.get(rate.date) ?? new Set()
          if (!completedSet.has(h.id)) missedDays++
        }
      }
      return { habitId: h.id, title: h.title, icon: h.icon, missedDays }
    })
    .filter((h) => h.missedDays > 0)
    .sort((a, b) => b.missedDays - a.missedDays)
    .slice(0, 5)

  const bestStreak = streaks.length > 0 ? Math.max(...streaks.map((s) => s.longest)) : 0
  const currentStreakCount = streaks.filter((s) => s.current > 0).length

  return {
    totalCompletions: completions.length,
    bestStreak,
    currentStreaks: currentStreakCount,
    activeHabits: habits.length,
    weeklyRates,
    streaks: streaks.sort((a, b) => b.current - a.current),
    categoryConsistency,
    mostMissed
  }
}
