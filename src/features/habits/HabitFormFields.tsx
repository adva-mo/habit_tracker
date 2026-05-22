import type { HabitInput, TimeBlock, FrequencySpec } from '@/types'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { ColorPicker } from '@/components/ui/ColorPicker'
import { useCategoryStore } from '@/store/useCategoryStore'
import { TIME_BLOCKS } from '@/types'

const EMOJI_OPTIONS = ['💧', '🏃', '🧘', '📖', '📓', '✨', '🥗', '💪', '🚶', '💬', '🌙', '🛏️', '✏️', '📋', '🤸', '🎯', '💊', '🌅', '🎨', '🎵', '📵', '🚴', '🧠', '💡', '🍎', '🫖', '🌿', '🏋️', '🧹', '💰']

const FREQUENCY_OPTIONS = [
  { value: 'daily', label: 'Every day' },
  { value: 'weekdays', label: 'Weekdays only' },
  { value: 'weekends', label: 'Weekends only' },
  { value: 'mon-wed-fri', label: 'Mon, Wed, Fri' },
  { value: 'tue-thu', label: 'Tue, Thu' }
]

function frequencyToSpec(value: string): FrequencySpec {
  switch (value) {
    case 'daily': return { type: 'daily' }
    case 'weekdays': return { type: 'weekdays' }
    case 'weekends': return { type: 'weekends' }
    case 'mon-wed-fri': return { type: 'custom', days: [1, 3, 5] }
    case 'tue-thu': return { type: 'custom', days: [2, 4] }
    default: return { type: 'daily' }
  }
}

function specToFrequencyValue(spec: FrequencySpec): string {
  if (spec.type === 'daily') return 'daily'
  if (spec.type === 'weekdays') return 'weekdays'
  if (spec.type === 'weekends') return 'weekends'
  if (spec.type === 'custom') {
    const d = [...spec.days].sort().join(',')
    if (d === '1,3,5') return 'mon-wed-fri'
    if (d === '2,4') return 'tue-thu'
  }
  return 'daily'
}

interface HabitFormFieldsProps {
  data: Partial<HabitInput>
  onChange: (updates: Partial<HabitInput>) => void
}

export function HabitFormFields({ data, onChange }: HabitFormFieldsProps) {
  const { categories } = useCategoryStore()

  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: `${c.icon} ${c.name}`
  }))

  const timeBlockOptions = TIME_BLOCKS.map((tb) => ({
    value: tb.value,
    label: `${tb.emoji} ${tb.label}`
  }))

  return (
    <div className="space-y-4 px-5 py-4">
      <Input
        label="Habit name"
        placeholder="e.g. Morning walk"
        value={data.title ?? ''}
        onChange={(e) => onChange({ title: e.target.value })}
        required
      />

      <Textarea
        label="Description (optional)"
        placeholder="What's the goal?"
        value={data.description ?? ''}
        onChange={(e) => onChange({ description: e.target.value })}
      />

      <div>
        <label className="text-sm font-medium text-text block mb-2">Icon</label>
        <div className="flex flex-wrap gap-2">
          {EMOJI_OPTIONS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => onChange({ icon: emoji })}
              className={[
                'h-10 w-10 rounded-xl text-xl flex items-center justify-center transition-colors',
                data.icon === emoji ? 'bg-primary/20 ring-2 ring-primary' : 'bg-surface-2 hover:bg-surface-3'
              ].join(' ')}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      <ColorPicker
        label="Color"
        value={data.color ?? '#d4a5c9'}
        onChange={(color) => onChange({ color })}
      />

      <Select
        label="Category"
        options={categoryOptions}
        value={data.category ?? ''}
        onChange={(e) => onChange({ category: e.target.value })}
      />

      <Select
        label="Time of day"
        options={timeBlockOptions}
        value={data.timeBlock ?? 'morning'}
        onChange={(e) => onChange({ timeBlock: e.target.value as TimeBlock })}
      />

      <Select
        label="Frequency"
        options={FREQUENCY_OPTIONS}
        value={specToFrequencyValue(data.frequency ?? { type: 'daily' })}
        onChange={(e) => onChange({ frequency: frequencyToSpec(e.target.value) })}
      />

      <Input
        label="Target time (optional)"
        type="time"
        value={data.targetTime ?? ''}
        onChange={(e) => onChange({ targetTime: e.target.value })}
        hint="e.g. 07:00 for a morning alarm feel"
      />
    </div>
  )
}
