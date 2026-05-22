import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { motion } from 'framer-motion'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'ghost' | 'surface'
  label: string
}

const sizes = { sm: 'h-8 w-8', md: 'h-10 w-10', lg: 'h-12 w-12' }
const iconSizes = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-6 w-6' }

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ size = 'md', variant = 'ghost', label, className = '', children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.9 }}
        aria-label={label}
        className={[
          'inline-flex items-center justify-center rounded-full transition-colors duration-150 touch-manipulation',
          variant === 'ghost' ? 'hover:bg-surface-2 active:bg-surface-3 text-text-muted' : 'bg-surface-2 hover:bg-surface-3 text-text',
          sizes[size],
          className
        ]
          .filter(Boolean)
          .join(' ')}
        {...(props as object)}
      >
        <span className={iconSizes[size]}>{children}</span>
      </motion.button>
    )
  }
)

IconButton.displayName = 'IconButton'
