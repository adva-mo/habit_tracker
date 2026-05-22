import { useState } from 'react'
import { Delete } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface PinEntryProps {
  title?: string
  onSubmit: (pin: string) => void
  onCancel?: () => void
  error?: string | null
}

const PAD = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫']

export function PinEntry({ title = 'Enter PIN', onSubmit, onCancel, error }: PinEntryProps) {
  const [pin, setPin] = useState('')

  function handleKey(key: string) {
    if (key === '⌫') {
      setPin((p) => p.slice(0, -1))
      return
    }
    if (key === '') return
    if (pin.length >= 4) return
    const next = pin + key
    setPin(next)
    if (next.length === 4) {
      setTimeout(() => { onSubmit(next); setPin('') }, 100)
    }
  }

  return (
    <div className="flex flex-col items-center px-8 py-6 gap-6">
      <p className="text-lg font-semibold text-text">{title}</p>

      {/* Dots */}
      <div className="flex gap-3">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: pin.length > i ? 1.2 : 1 }}
            className={['h-4 w-4 rounded-full border-2 transition-colors', pin.length > i ? 'bg-primary border-primary' : 'border-border'].join(' ')}
          />
        ))}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-danger">
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Number pad */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
        {PAD.map((key, i) => (
          <button
            key={i}
            onClick={() => handleKey(key)}
            disabled={key === ''}
            className={[
              'h-16 rounded-2xl text-xl font-semibold flex items-center justify-center touch-manipulation transition-colors',
              key === '' ? 'invisible' : 'bg-surface-2 hover:bg-surface-3 active:bg-surface-3 text-text'
            ].join(' ')}
          >
            {key === '⌫' ? <Delete className="h-5 w-5" /> : key}
          </button>
        ))}
      </div>

      {onCancel && (
        <button onClick={onCancel} className="text-sm text-text-muted hover:text-text">
          Cancel
        </button>
      )}
    </div>
  )
}
