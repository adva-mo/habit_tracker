export const HABIT_COLORS = [
  '#d4a5c9',
  '#f4a5b1',
  '#f9c784',
  '#a8d8a8',
  '#87ceeb',
  '#9b89c4',
  '#f0b8a0',
  '#b8d4e8',
  '#e8b4d0',
  '#a8d4c8',
  '#f4c8a0',
  '#c4b0d8'
]

export const CATEGORY_COLORS = [
  '#d4a5c9',
  '#f4a5b1',
  '#f9c784',
  '#a8d8a8',
  '#87ceeb',
  '#9b89c4',
  '#f0b8a0',
  '#b8d4e8',
  '#e8b4d0',
  '#a8d4c8'
]

export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function getCompletionColor(rate: number): string {
  if (rate === 0) return 'transparent'
  if (rate < 0.25) return 'hsl(330 60% 90%)'
  if (rate < 0.5) return 'hsl(330 60% 80%)'
  if (rate < 0.75) return 'hsl(330 60% 70%)'
  return 'hsl(330 60% 60%)'
}

export function getStreakColor(streak: number): string {
  if (streak === 0) return '#94a3b8'
  if (streak < 3) return '#f9c784'
  if (streak < 7) return '#f0b8a0'
  if (streak < 14) return '#f4a5b1'
  return '#d4a5c9'
}

export const TIME_BLOCK_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  morning: { bg: 'hsl(45 90% 95%)', text: 'hsl(45 70% 40%)', border: 'hsl(45 70% 85%)' },
  work: { bg: 'hsl(210 70% 95%)', text: 'hsl(210 70% 40%)', border: 'hsl(210 60% 85%)' },
  afternoon: { bg: 'hsl(30 90% 95%)', text: 'hsl(30 70% 40%)', border: 'hsl(30 70% 85%)' },
  evening: { bg: 'hsl(270 60% 95%)', text: 'hsl(270 50% 40%)', border: 'hsl(270 50% 85%)' },
  night: { bg: 'hsl(230 50% 95%)', text: 'hsl(230 50% 40%)', border: 'hsl(230 50% 85%)' }
}
