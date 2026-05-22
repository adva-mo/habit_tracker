import { useState, useEffect } from 'react'
import { useSettingsStore } from '@/store/useSettingsStore'

export function usePinLock() {
  const { settings, verifyPin, setPin, clearPin } = useSettingsStore()
  const [isUnlocked, setIsUnlocked] = useState(!settings.pinEnabled)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsUnlocked(!settings.pinEnabled)
  }, [settings.pinEnabled])

  async function unlock(pin: string): Promise<boolean> {
    const valid = await verifyPin(pin)
    if (valid) {
      setIsUnlocked(true)
      setError(null)
    } else {
      setError('Incorrect PIN')
    }
    return valid
  }

  async function changePin(newPin: string): Promise<void> {
    await setPin(newPin)
  }

  async function disablePin(): Promise<void> {
    await clearPin()
    setIsUnlocked(true)
  }

  function lock(): void {
    if (settings.pinEnabled) {
      setIsUnlocked(false)
    }
  }

  return {
    isPinEnabled: settings.pinEnabled,
    isUnlocked,
    error,
    unlock,
    changePin,
    disablePin,
    lock
  }
}
