import { useState } from 'react'
import type { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

export function useDragReorder<T extends { id: string }>(
  items: T[],
  onReorder: (orderedIds: string[]) => Promise<void>
) {
  const [activeId, setActiveId] = useState<string | null>(null)

  function handleDragStart(event: { active: { id: string | number } }) {
    setActiveId(String(event.active.id))
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)
    if (!over || active.id === over.id) return

    const oldIndex = items.findIndex((item) => item.id === String(active.id))
    const newIndex = items.findIndex((item) => item.id === String(over.id))
    if (oldIndex === -1 || newIndex === -1) return

    const reordered = arrayMove(items, oldIndex, newIndex)
    onReorder(reordered.map((item) => item.id))
  }

  function handleDragCancel() {
    setActiveId(null)
  }

  return { activeId, handleDragStart, handleDragEnd, handleDragCancel }
}
