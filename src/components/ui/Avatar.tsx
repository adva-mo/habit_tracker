interface AvatarProps {
  icon: string
  color: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'h-9 w-9 text-lg',
  md: 'h-11 w-11 text-xl',
  lg: 'h-14 w-14 text-2xl'
}

export function Avatar({ icon, color, size = 'md' }: AvatarProps) {
  return (
    <div
      className={['flex items-center justify-center rounded-2xl flex-shrink-0', sizes[size]].join(' ')}
      style={{ backgroundColor: `${color}25` }}
    >
      <span role="img">{icon}</span>
    </div>
  )
}
