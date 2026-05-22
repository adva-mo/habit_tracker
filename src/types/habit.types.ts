export type TimeBlock = 'morning' | 'work' | 'afternoon' | 'evening' | 'night'

export type FrequencySpec =
  | { type: 'daily' }
  | { type: 'weekdays' }
  | { type: 'weekends' }
  | { type: 'custom'; days: number[] }

export interface Habit {
  id: string
  title: string
  description?: string
  category: string
  timeBlock: TimeBlock
  targetTime?: string
  frequency: FrequencySpec
  timesPerDay?: number
  icon: string
  color: string
  createdAt: Date
  archived: boolean
  active: boolean
  sortOrder: number
}

export type HabitInput = Omit<Habit, 'id' | 'createdAt' | 'sortOrder' | 'archived'>

export const TIME_BLOCKS: { value: TimeBlock; label: string; emoji: string; range: string }[] = [
  { value: 'morning', label: 'Morning', emoji: '🌅', range: '5am – 10am' },
  { value: 'work', label: 'Work / Focus', emoji: '💼', range: '10am – 1pm' },
  { value: 'afternoon', label: 'Afternoon', emoji: '☀️', range: '1pm – 5pm' },
  { value: 'evening', label: 'Evening', emoji: '🌆', range: '5pm – 9pm' },
  { value: 'night', label: 'Night', emoji: '🌙', range: '9pm – 12am' }
]
