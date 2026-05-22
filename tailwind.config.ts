import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--color-primary) / <alpha-value>)',
          foreground: 'hsl(var(--color-primary-foreground) / <alpha-value>)'
        },
        surface: {
          DEFAULT: 'hsl(var(--color-surface) / <alpha-value>)',
          2: 'hsl(var(--color-surface-2) / <alpha-value>)',
          3: 'hsl(var(--color-surface-3) / <alpha-value>)'
        },
        text: {
          DEFAULT: 'hsl(var(--color-text) / <alpha-value>)',
          muted: 'hsl(var(--color-text-muted) / <alpha-value>)',
          subtle: 'hsl(var(--color-text-subtle) / <alpha-value>)'
        },
        border: 'hsl(var(--color-border) / <alpha-value>)',
        success: 'hsl(var(--color-success) / <alpha-value>)',
        warning: 'hsl(var(--color-warning) / <alpha-value>)',
        danger: 'hsl(var(--color-danger) / <alpha-value>)'
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem'
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
        'scale-in': 'scaleIn 0.15s ease-out'
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        slideUp: {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' }
        },
        scaleIn: {
          from: { transform: 'scale(0.9)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' }
        }
      },
      boxShadow: {
        soft: '0 2px 12px rgb(0 0 0 / 0.06)',
        card: '0 1px 3px rgb(0 0 0 / 0.08), 0 4px 12px rgb(0 0 0 / 0.04)',
        'card-hover': '0 2px 8px rgb(0 0 0 / 0.12), 0 8px 24px rgb(0 0 0 / 0.08)'
      }
    }
  },
  plugins: []
} satisfies Config
