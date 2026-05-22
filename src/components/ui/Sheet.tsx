import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface SheetProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  footer?: ReactNode
}

export function Sheet({ isOpen, onClose, title, children, footer }: SheetProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          {/* Outer: handles ONLY the slide animation — no overflow, no scroll */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50"
          >
            {/* Inner: owns scroll — no transform applied here */}
            <div
              className="bg-surface rounded-t-3xl overflow-y-auto overscroll-contain"
              style={{
                maxHeight: '92dvh',
                paddingBottom: 'env(safe-area-inset-bottom, 0px)',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {/* Handle + Header — sticky */}
              <div className="sticky top-0 z-10 bg-surface">
                <div className="flex justify-center pt-3 pb-1">
                  <div className="w-10 h-1 rounded-full bg-border" />
                </div>
                {title && (
                  <div className="flex items-center justify-between px-5 py-3 border-b border-border/60">
                    <h2 className="text-lg font-semibold text-text">{title}</h2>
                    <button
                      onClick={onClose}
                      className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-surface-2 text-text-muted transition-colors"
                      aria-label="Close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Content */}
              {children}

              {/* Footer — sticky */}
              {footer && (
                <div className="sticky bottom-0 bg-surface px-5 pb-4 pt-3 border-t border-border/60">
                  {footer}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
