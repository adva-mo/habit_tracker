import { useState } from 'react'
import { Sheet } from '@/components/ui/Sheet'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useCategoryStore } from '@/store/useCategoryStore'
import { useUIStore } from '@/store/useUIStore'
import { CATEGORY_COLORS } from '@/utils/color.utils'

const CATEGORY_EMOJIS = ['🏃', '🧘', '💼', '🥗', '💬', '📚', '🌙', '✨', '💰', '🏠', '🎨', '🎵', '🌿', '💪', '🎯']

interface CategoryFormSheetProps {
  isOpen: boolean
  onClose: () => void
}

export function CategoryFormSheet({ isOpen, onClose }: CategoryFormSheetProps) {
  const [name, setName] = useState('')
  const [icon, setIcon] = useState('✨')
  const [color, setColor] = useState(CATEGORY_COLORS[0])
  const [isLoading, setIsLoading] = useState(false)
  const { addCategory } = useCategoryStore()
  const { pushToast } = useUIStore()

  async function handleSubmit() {
    if (!name.trim()) { pushToast('Enter a category name', 'error'); return }
    setIsLoading(true)
    try {
      await addCategory({ name: name.trim(), icon, color })
      pushToast(`${icon} ${name} category added!`)
      setName(''); setIcon('✨'); setColor(CATEGORY_COLORS[0])
      onClose()
    } catch {
      pushToast('Something went wrong', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Sheet isOpen={isOpen} onClose={onClose} title="New Category"
      footer={<Button fullWidth onClick={handleSubmit} isLoading={isLoading}>Create category</Button>}
    >
      <div className="px-5 py-4 space-y-4">
        <Input label="Category name" placeholder="e.g. Creativity" value={name} onChange={(e) => setName(e.target.value)} />

        <div>
          <label className="text-sm font-medium text-text block mb-2">Icon</label>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_EMOJIS.map((e) => (
              <button key={e} type="button" onClick={() => setIcon(e)}
                className={['h-10 w-10 rounded-xl text-xl flex items-center justify-center', icon === e ? 'bg-primary/20 ring-2 ring-primary' : 'bg-surface-2'].join(' ')}>
                {e}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-text block mb-2">Color</label>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_COLORS.map((c) => (
              <button key={c} type="button" onClick={() => setColor(c)}
                className="h-8 w-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: c }}>
                {color === c && <span className="h-2.5 w-2.5 rounded-full bg-white shadow-sm" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Sheet>
  )
}
