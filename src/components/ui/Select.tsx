import { useState, useRef, useEffect, forwardRef } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown } from 'lucide-react'

interface SelectProps {
  label?: string
  error?: string
  options: { value: string; label: string }[]
  value?: string
  onChange?: (e: { target: { value: string } }) => void
  className?: string
  id?: string
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  ({ label, error, options, value, onChange, className = '', id }, _ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({})
    const triggerRef = useRef<HTMLButtonElement>(null)
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    const selectedOption = options.find((opt) => opt.value === value)

    function openDropdown() {
      if (!triggerRef.current) return
      const rect = triggerRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      const spaceAbove = rect.top
      const maxH = Math.min(240, spaceBelow >= spaceAbove ? spaceBelow - 8 : spaceAbove - 8)

      if (spaceBelow >= spaceAbove) {
        setDropdownStyle({ top: rect.bottom + 4, left: rect.left, width: rect.width, maxHeight: maxH })
      } else {
        setDropdownStyle({ top: rect.top - 4 - maxH, left: rect.left, width: rect.width, maxHeight: maxH })
      }
      setIsOpen(true)
    }

    function selectOption(optValue: string) {
      onChange?.({ target: { value: optValue } })
      setIsOpen(false)
    }

    useEffect(() => {
      if (!isOpen) return
      const close = () => setIsOpen(false)
      document.addEventListener('scroll', close, true)
      window.addEventListener('resize', close)
      return () => {
        document.removeEventListener('scroll', close, true)
        window.removeEventListener('resize', close)
      }
    }, [isOpen])

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-text">
            {label}
          </label>
        )}
        <div className="relative">
          <button
            ref={triggerRef}
            id={selectId}
            type="button"
            onClick={openDropdown}
            className={[
              'w-full h-11 px-4 pr-10 rounded-2xl border bg-surface-2 text-text text-left text-sm',
              'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50',
              'transition-colors duration-150',
              error ? 'border-danger/50' : 'border-border',
              className
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {selectedOption?.label ?? ''}
          </button>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-subtle pointer-events-none" />
        </div>
        {error && <p className="text-xs text-danger">{error}</p>}

        {isOpen &&
          createPortal(
            <>
              <div className="fixed inset-0 z-[998]" onClick={() => setIsOpen(false)} />
              <div
                style={{ ...dropdownStyle, position: 'fixed', zIndex: 999 }}
                className="bg-surface border border-border rounded-2xl shadow-xl overflow-y-auto"
              >
                {options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => selectOption(opt.value)}
                    className={[
                      'w-full px-4 py-3 text-left text-sm transition-colors first:rounded-t-2xl last:rounded-b-2xl',
                      'hover:bg-surface-2',
                      opt.value === value ? 'text-primary font-medium bg-primary/5' : 'text-text'
                    ].join(' ')}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </>,
            document.body
          )}
      </div>
    )
  }
)

Select.displayName = 'Select'
