interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={['rounded-2xl bg-surface-3 animate-pulse', className].filter(Boolean).join(' ')}
    />
  )
}

export function HabitCardSkeleton() {
  return (
    <div className="flex items-center gap-3 p-4 rounded-3xl bg-surface-2">
      <Skeleton className="h-11 w-11 rounded-2xl" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-7 w-7 rounded-full" />
    </div>
  )
}
