import { Sun, Moon, Monitor } from 'lucide-react'
import { motion } from 'framer-motion'
import type { ThemeOption } from '@/types'
import { useTheme } from '@/hooks/useTheme'

const THEMES: { value: ThemeOption; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor }
]

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      <p className="text-sm font-medium text-text mb-3">Appearance</p>
      <div className="flex gap-2">
        {THEMES.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className="relative flex-1 flex flex-col items-center gap-1.5 py-3 rounded-2xl transition-colors touch-manipulation"
            style={{
              backgroundColor: theme === value ? 'hsl(var(--color-primary) / 0.15)' : 'hsl(var(--color-surface-2))'
            }}
          >
            {theme === value && (
              <motion.div
                layoutId="theme-bg"
                className="absolute inset-0 rounded-2xl ring-2 ring-primary"
              />
            )}
            <Icon
              className={['h-5 w-5 relative z-10', theme === value ? 'text-primary' : 'text-text-muted'].join(' ')}
            />
            <span className={['text-xs font-medium relative z-10', theme === value ? 'text-primary' : 'text-text-muted'].join(' ')}>
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
