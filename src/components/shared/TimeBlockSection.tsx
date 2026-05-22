import type { ReactNode } from 'react'
import { TIME_BLOCKS, type TimeBlock } from '@/types'
import { TIME_BLOCK_COLORS } from '@/utils/color.utils'

interface TimeBlockSectionProps {
  timeBlock: TimeBlock
  children: ReactNode
  completedCount?: number
  totalCount?: number
}

export function TimeBlockSection({ timeBlock, children, completedCount, totalCount }: TimeBlockSectionProps) {
  const meta = TIME_BLOCKS.find((b) => b.value === timeBlock)!
  const colors = TIME_BLOCK_COLORS[timeBlock]

  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 px-5 mb-2">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ backgroundColor: colors.bg, color: colors.text }}
        >
          {meta.emoji} {meta.label}
        </span>
        {totalCount !== undefined && (
          <span className="text-xs text-text-subtle">
            {completedCount}/{totalCount}
          </span>
        )}
      </div>
      <div className="px-4 space-y-1">{children}</div>
    </div>
  )
}
