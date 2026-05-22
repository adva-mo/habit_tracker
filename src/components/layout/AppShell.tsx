import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { BottomNav } from './BottomNav'
import { ToastContainer } from '@/components/ui/Toast'
import { useHabitStore } from '@/store/useHabitStore'
import { useCategoryStore } from '@/store/useCategoryStore'
import { useSettingsStore } from '@/store/useSettingsStore'
import { useCompletionStore } from '@/store/useCompletionStore'
import { useTheme } from '@/hooks/useTheme'
import { seedDatabase } from '@/db/seeds'
import { todayString } from '@/utils/date.utils'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const loadHabits = useHabitStore((s) => s.loadHabits)
  const loadCategories = useCategoryStore((s) => s.loadCategories)
  const loadSettings = useSettingsStore((s) => s.loadSettings)
  const loadCompletions = useCompletionStore((s) => s.loadCompletionsForDate)

  useTheme()

  useEffect(() => {
    async function init() {
      await loadSettings()
      await seedDatabase()
      await loadCategories()
      await loadHabits()
      await loadCompletions(todayString())
    }
    init().catch(console.error)
  }, [loadSettings, loadHabits, loadCategories, loadCompletions])

  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1 overflow-y-auto pb-20">{children}</main>
      <BottomNav />
      <ToastContainer />
    </div>
  )
}
