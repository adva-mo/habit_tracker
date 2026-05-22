import { motion } from 'framer-motion'

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
}

export function Switch({ checked, onChange, label, disabled }: SwitchProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <button
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={[
          'relative w-12 h-7 rounded-full transition-colors duration-200 touch-manipulation flex-shrink-0',
          checked ? 'bg-primary' : 'bg-surface-3',
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <motion.span
          layout
          transition={{ type: 'spring', stiffness: 700, damping: 35 }}
          className="absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm"
          style={{ left: checked ? 'calc(100% - 1.25rem - 0.25rem)' : '0.25rem' }}
        />
      </button>
      {label && <span className="text-sm text-text">{label}</span>}
    </label>
  )
}
