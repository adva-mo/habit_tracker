import { create } from 'zustand'
import { todayString } from '@/utils/date.utils'
import { generateId } from '@/utils/id.utils'

export type SheetType = 'habitForm' | 'completionNote' | 'dayDetail' | 'categoryForm' | 'confirmDelete' | 'pinEntry'

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

interface UIStore {
  selectedDate: string
  activeSheet: SheetType | null
  sheetPayload: unknown
  toasts: Toast[]
  setSelectedDate: (date: string) => void
  openSheet: (type: SheetType, payload?: unknown) => void
  closeSheet: () => void
  pushToast: (message: string, type?: Toast['type']) => void
  dismissToast: (id: string) => void
}

export const useUIStore = create<UIStore>((set) => ({
  selectedDate: todayString(),
  activeSheet: null,
  sheetPayload: undefined,
  toasts: [],

  setSelectedDate: (date) => set({ selectedDate: date }),

  openSheet: (type, payload) => set({ activeSheet: type, sheetPayload: payload }),

  closeSheet: () => set({ activeSheet: null, sheetPayload: undefined }),

  pushToast: (message, type = 'success') => {
    const id = generateId()
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }))
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
    }, 3000)
  },

  dismissToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
  }
}))
