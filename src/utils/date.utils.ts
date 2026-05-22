import {
  format,
  parseISO,
  isToday,
  isYesterday,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  startOfWeek,
  endOfWeek,
  subDays,
  addDays,
  isSameDay,
  isBefore,
  differenceInCalendarDays
} from 'date-fns'

export function toDateString(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

export function fromDateString(dateStr: string): Date {
  return parseISO(dateStr)
}

export function todayString(): string {
  return toDateString(new Date())
}

export function formatDisplayDate(dateStr: string): string {
  const date = fromDateString(dateStr)
  if (isToday(date)) return 'Today'
  if (isYesterday(date)) return 'Yesterday'
  return format(date, 'MMMM d, yyyy')
}

export function formatShortDate(dateStr: string): string {
  return format(fromDateString(dateStr), 'MMM d')
}

export function formatDayLabel(dateStr: string): string {
  return format(fromDateString(dateStr), 'EEE')
}

export function getMonthDays(year: number, month: number): Date[] {
  const start = startOfMonth(new Date(year, month, 1))
  const end = endOfMonth(start)
  return eachDayOfInterval({ start, end })
}

export function getMonthGridDays(year: number, month: number): (Date | null)[] {
  const days = getMonthDays(year, month)
  const firstDay = getDay(days[0])
  const prefix = Array(firstDay).fill(null) as null[]
  const suffix = Array((7 - ((prefix.length + days.length) % 7)) % 7).fill(null) as null[]
  return [...prefix, ...days, ...suffix]
}

export function getCurrentWeekRange(): { start: Date; end: Date } {
  const now = new Date()
  return {
    start: startOfWeek(now, { weekStartsOn: 1 }),
    end: endOfWeek(now, { weekStartsOn: 1 })
  }
}

export function getLast7Days(): string[] {
  const today = new Date()
  return Array.from({ length: 7 }, (_, i) => toDateString(subDays(today, 6 - i)))
}

export function getLast30Days(): string[] {
  const today = new Date()
  return Array.from({ length: 30 }, (_, i) => toDateString(subDays(today, 29 - i)))
}

export function getLast90Days(): string[] {
  const today = new Date()
  return Array.from({ length: 90 }, (_, i) => toDateString(subDays(today, 89 - i)))
}

export function getDaysBetween(start: string, end: string): string[] {
  const startDate = fromDateString(start)
  const endDate = fromDateString(end)
  const days = differenceInCalendarDays(endDate, startDate)
  return Array.from({ length: days + 1 }, (_, i) => toDateString(addDays(startDate, i)))
}

export function isDateToday(dateStr: string): boolean {
  return isToday(fromDateString(dateStr))
}

export function isDateBefore(dateStr: string, compareStr: string): boolean {
  return isBefore(fromDateString(dateStr), fromDateString(compareStr))
}

export function isSameDayStr(a: string, b: string): boolean {
  return isSameDay(fromDateString(a), fromDateString(b))
}

export function getDayOfWeek(dateStr: string): number {
  return getDay(fromDateString(dateStr))
}

export function formatMonthYear(year: number, month: number): string {
  return format(new Date(year, month, 1), 'MMMM yyyy')
}

export function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  if (hour < 21) return 'Good evening'
  return 'Good night'
}

export {
  isToday,
  subDays,
  addDays,
  format,
  parseISO,
  getDay,
  startOfMonth,
  endOfMonth,
  differenceInCalendarDays
}
