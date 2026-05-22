import { db } from '@/db/database'
import type { ExportData } from '@/utils/validation.utils'
import { isValidExportData } from '@/utils/validation.utils'

export async function exportData(): Promise<void> {
  const [habits, completions, categories, settings] = await Promise.all([
    db.habits.toArray(),
    db.completions.toArray(),
    db.categories.toArray(),
    db.settings.get('settings')
  ])

  const data: ExportData = {
    version: 1,
    exportedAt: new Date().toISOString(),
    habits,
    completions,
    categories,
    settings: settings ?? { id: 'settings', theme: 'system', pinEnabled: false, seeded: true }
  }

  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = `habit-tracker-backup-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export async function importData(file: File): Promise<{ imported: number }> {
  const text = await file.text()
  let data: unknown

  try {
    data = JSON.parse(text)
  } catch {
    throw new Error('Invalid JSON file')
  }

  if (!isValidExportData(data)) {
    throw new Error('File format is not recognized as a valid Habit Tracker backup')
  }

  await db.transaction('rw', db.habits, db.completions, db.categories, db.settings, async () => {
    await db.habits.clear()
    await db.completions.clear()
    await db.categories.clear()

    if (data.categories.length > 0) await db.categories.bulkAdd(data.categories)
    if (data.habits.length > 0) await db.habits.bulkAdd(data.habits)
    if (data.completions.length > 0) await db.completions.bulkAdd(data.completions)
    await db.settings.put({ ...data.settings, id: 'settings' })
  })

  return { imported: data.habits.length }
}

export async function resetAllData(): Promise<void> {
  await db.transaction('rw', db.habits, db.completions, db.categories, db.settings, async () => {
    await db.habits.clear()
    await db.completions.clear()
    await db.categories.clear()
    await db.settings.clear()
  })
}
