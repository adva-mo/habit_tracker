import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'
import { useUIStore, type Toast as ToastType } from '@/store/useUIStore'

function ToastIcon({ type }: { type: ToastType['type'] }) {
  if (type === 'success') return <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
  if (type === 'error') return <AlertCircle className="h-4 w-4 text-danger flex-shrink-0" />
  return <Info className="h-4 w-4 text-primary flex-shrink-0" />
}

export function ToastContainer() {
  const { toasts, dismissToast } = useUIStore()

  return (
    <div className="fixed bottom-24 inset-x-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="pointer-events-auto flex items-center gap-3 bg-surface border border-border shadow-card rounded-2xl px-4 py-3"
          >
            <ToastIcon type={toast.type} />
            <p className="flex-1 text-sm text-text">{toast.message}</p>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-text-subtle hover:text-text-muted"
              aria-label="Dismiss"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
