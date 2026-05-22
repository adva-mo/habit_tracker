import { useCategoryStore } from '@/store/useCategoryStore'

interface CategoryTagProps {
  categoryId: string
}

export function CategoryTag({ categoryId }: CategoryTagProps) {
  const category = useCategoryStore((s) => s.getCategoryById(categoryId))
  if (!category) return null

  return (
    <span
      className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium"
      style={{ backgroundColor: `${category.color}20`, color: category.color }}
    >
      {category.icon} {category.name}
    </span>
  )
}
