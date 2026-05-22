import { useState } from 'react'
import { Switch } from '@/components/ui/Switch'
import { Sheet } from '@/components/ui/Sheet'
import { PinEntry } from './PinEntry'
import { usePinLock } from '@/hooks/usePinLock'
import { useUIStore } from '@/store/useUIStore'

export function PinLockSection() {
  const { isPinEnabled, changePin, disablePin } = usePinLock()
  const [setupOpen, setSetupOpen] = useState(false)
  const [confirmPin, setConfirmPin] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { pushToast } = useUIStore()

  async function handleToggle(enabled: boolean) {
    if (enabled) {
      setSetupOpen(true)
    } else {
      await disablePin()
      pushToast('PIN lock disabled')
    }
  }

  async function handlePinEntry(pin: string) {
    if (!confirmPin) {
      setConfirmPin(pin)
      setError(null)
      return
    }
    if (pin !== confirmPin) {
      setError('PINs do not match. Try again.')
      setConfirmPin(null)
      return
    }
    await changePin(pin)
    pushToast('PIN lock enabled!')
    setSetupOpen(false)
    setConfirmPin(null)
    setError(null)
  }

  return (
    <div>
      <Switch
        checked={isPinEnabled}
        onChange={handleToggle}
        label="PIN lock"
      />
      {isPinEnabled && (
        <button
          onClick={() => { setConfirmPin(null); setError(null); setSetupOpen(true) }}
          className="mt-2 text-xs text-primary font-medium"
        >
          Change PIN
        </button>
      )}

      <Sheet isOpen={setupOpen} onClose={() => { setSetupOpen(false); setConfirmPin(null) }}>
        <PinEntry
          title={confirmPin ? 'Confirm PIN' : 'Choose a 4-digit PIN'}
          onSubmit={handlePinEntry}
          onCancel={() => { setSetupOpen(false); setConfirmPin(null) }}
          error={error}
        />
      </Sheet>
    </div>
  )
}
