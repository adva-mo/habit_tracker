export interface Category {
  id: string
  name: string
  icon: string
  color: string
  isDefault: boolean
}

export type CategoryInput = Omit<Category, 'id' | 'isDefault'>
