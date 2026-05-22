import { db } from '@/db/database'
import type { Category, CategoryInput } from '@/types'
import { generateId } from '@/utils/id.utils'

export async function getAllCategories(): Promise<Category[]> {
  return db.categories.toArray()
}

export async function createCategory(input: CategoryInput): Promise<Category> {
  const category: Category = {
    ...input,
    id: generateId(),
    isDefault: false
  }
  await db.categories.add(category)
  return category
}

export async function updateCategory(id: string, updates: Partial<Omit<Category, 'id'>>): Promise<void> {
  await db.categories.update(id, updates)
}

export async function deleteCategory(id: string): Promise<void> {
  const habitsUsingCategory = await db.habits
    .where('category')
    .equals(id)
    .and((h) => !h.archived)
    .count()

  if (habitsUsingCategory > 0) {
    throw new Error('Cannot delete a category that has active habits')
  }
  await db.categories.delete(id)
}

export async function getCategoryById(id: string): Promise<Category | undefined> {
  return db.categories.get(id)
}
