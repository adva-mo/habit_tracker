import { NavLink } from 'react-router-dom'
import { Sun, Calendar, ListChecks, BarChart2 } from 'lucide-react'
import { motion } from 'framer-motion'

const tabs = [
  { to: '/today', icon: Sun, label: 'Today' },
  { to: '/calendar', icon: Calendar, label: 'Calendar' },
  { to: '/habits', icon: ListChecks, label: 'Habits' },
  { to: '/insights', icon: BarChart2, label: 'Insights' }
]

export function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 inset-x-0 bg-surface/90 backdrop-blur-md border-t border-border z-30"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-center h-16">
        {tabs.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 h-full touch-manipulation"
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <Icon
                    className={[
                      'h-5 w-5 transition-colors duration-200',
                      isActive ? 'text-primary' : 'text-text-subtle'
                    ].join(' ')}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary"
                    />
                  )}
                </div>
                <span
                  className={[
                    'text-[10px] font-medium transition-colors duration-200',
                    isActive ? 'text-primary' : 'text-text-subtle'
                  ].join(' ')}
                >
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
