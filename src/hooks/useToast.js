import { useState, useCallback, useEffect } from 'react'

export function useToast() {
  const [toast, setToast] = useState({ message: '', type: 'info', visible: false })

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type, visible: true })
  }, [])

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }))
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toast.visible, toast.message, toast.type])

  return { toast, showToast }
}
