import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  left?: ReactNode
  right?: ReactNode
}

export function PageHeader({ title, subtitle, left, right }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between px-5 pb-2" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 1rem)' }}>
      <div className="flex items-center gap-3">
        {left}
        <div>
          <h1 className="text-xl font-bold text-text leading-tight">{title}</h1>
          {subtitle && <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {right && <div className="flex items-center gap-1">{right}</div>}
    </div>
  )
}
