import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { motion } from 'framer-motion'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  isLoading?: boolean
  fullWidth?: boolean
}

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80',
  secondary: 'bg-surface-2 text-text hover:bg-surface-3 active:bg-surface-3',
  ghost: 'text-text-muted hover:bg-surface-2 active:bg-surface-3',
  danger: 'bg-danger/10 text-danger hover:bg-danger/20 active:bg-danger/25'
}

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-11 px-4 text-sm gap-2',
  lg: 'h-13 px-6 text-base gap-2'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, fullWidth, className = '', children, disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.1 }}
        disabled={disabled || isLoading}
        className={[
          'inline-flex items-center justify-center font-medium rounded-2xl transition-colors duration-150 touch-manipulation select-none',
          variants[variant],
          sizes[size],
          fullWidth ? 'w-full' : '',
          disabled || isLoading ? 'opacity-50 pointer-events-none' : '',
          className
        ]
          .filter(Boolean)
          .join(' ')}
        {...(props as object)}
      >
        {isLoading ? (
          <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : null}
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
