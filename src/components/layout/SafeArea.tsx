interface SafeAreaProps {
  top?: boolean
  bottom?: boolean
  children?: React.ReactNode
  className?: string
}

export function SafeArea({ top, bottom, children, className = '' }: SafeAreaProps) {
  return (
    <div
      className={className}
      style={{
        paddingTop: top ? 'env(safe-area-inset-top, 0px)' : undefined,
        paddingBottom: bottom ? 'env(safe-area-inset-bottom, 0px)' : undefined
      }}
    >
      {children}
    </div>
  )
}
