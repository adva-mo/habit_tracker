import { Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export function QuickAddHabit() {
  const navigate = useNavigate()

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => navigate('/habits')}
      className="fixed bottom-24 right-5 h-14 w-14 bg-primary text-primary-foreground rounded-full shadow-card flex items-center justify-center z-20 touch-manipulation"
      aria-label="Add habit"
      style={{ boxShadow: '0 4px 20px rgba(212,165,201,0.4)' }}
    >
      <Plus className="h-6 w-6" strokeWidth={2.5} />
    </motion.button>
  )
}
