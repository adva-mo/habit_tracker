import { create } from 'zustand'
import type { Category, CategoryInput } from '@/types'
import * as categoryService from '@/services/category.service'

interface CategoryStore {
  categories: Category[]
  isLoading: boolean
  loadCategories: () => Promise<void>
  addCategory: (input: CategoryInput) => Promise<Category>
  updateCategory: (id: string, updates: Partial<Omit<Category, 'id'>>) => Promise<void>
  deleteCategory: (id: string) => Promise<void>
  getCategoryById: (id: string) => Category | undefined
  getCategoryName: (id: string) => string
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: [],
  isLoading: false,

  loadCategories: async () => {
    set({ isLoading: true })
    const categories = await categoryService.getAllCategories()
    set({ categories, isLoading: false })
  },

  addCategory: async (input) => {
    const category = await categoryService.createCategory(input)
    await get().loadCategories()
    return category
  },

  updateCategory: async (id, updates) => {
    await categoryService.updateCategory(id, updates)
    await get().loadCategories()
  },

  deleteCategory: async (id) => {
    await categoryService.deleteCategory(id)
    await get().loadCategories()
  },

  getCategoryById: (id) => {
    return get().categories.find((c) => c.id === id)
  },

  getCategoryName: (id) => {
    return get().categories.find((c) => c.id === id)?.name ?? 'Unknown'
  }
}))
