import { HABIT_COLORS } from '@/utils/color.utils'

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
  label?: string
}

export function ColorPicker({ value, onChange, label }: ColorPickerProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium text-text">{label}</label>}
      <div className="flex flex-wrap gap-2">
        {HABIT_COLORS.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            className="h-8 w-8 rounded-full transition-transform duration-150 active:scale-90"
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
          >
            {value === color && (
              <span className="flex items-center justify-center h-full w-full">
                <span className="h-2.5 w-2.5 rounded-full bg-white shadow-sm" />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
