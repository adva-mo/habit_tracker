import { useRef, useState } from 'react'
import { Download, Upload, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/shared/ConfirmDialog'
import { exportData, importData, resetAllData } from '@/services/export.service'
import { useHabitStore } from '@/store/useHabitStore'
import { useCategoryStore } from '@/store/useCategoryStore'
import { useUIStore } from '@/store/useUIStore'

export function DataManagementSection() {
  const fileRef = useRef<HTMLInputElement>(null)
  const [resetOpen, setResetOpen] = useState(false)
  const [isResetting, setIsResetting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const { loadHabits } = useHabitStore()
  const { loadCategories } = useCategoryStore()
  const { pushToast } = useUIStore()

  async function handleExport() {
    try {
      await exportData()
      pushToast('Backup exported!')
    } catch {
      pushToast('Export failed', 'error')
    }
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setIsImporting(true)
    try {
      const result = await importData(file)
      await loadCategories()
      await loadHabits()
      pushToast(`Imported ${result.imported} habits!`)
    } catch (err) {
      pushToast(err instanceof Error ? err.message : 'Import failed', 'error')
    } finally {
      setIsImporting(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  async function handleReset() {
    setIsResetting(true)
    try {
      await resetAllData()
      await loadCategories()
      await loadHabits()
      pushToast('All data cleared')
    } catch {
      pushToast('Reset failed', 'error')
    } finally {
      setIsResetting(false)
      setResetOpen(false)
    }
  }

  return (
    <div className="space-y-2">
      <Button variant="secondary" fullWidth onClick={handleExport}>
        <Download className="h-4 w-4" />
        Export backup
      </Button>

      <Button
        variant="secondary"
        fullWidth
        onClick={() => fileRef.current?.click()}
        isLoading={isImporting}
      >
        <Upload className="h-4 w-4" />
        Import backup
      </Button>
      <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleImport} />

      <Button variant="danger" fullWidth onClick={() => setResetOpen(true)}>
        <Trash2 className="h-4 w-4" />
        Reset all data
      </Button>

      <ConfirmDialog
        isOpen={resetOpen}
        onClose={() => setResetOpen(false)}
        onConfirm={handleReset}
        title="Reset all data?"
        message="This will permanently delete all your habits, completions, and settings. This cannot be undone."
        confirmLabel="Reset everything"
        isDestructive
        isLoading={isResetting}
      />
    </div>
  )
}
