import { useEffect, useRef, useState } from 'react'

export const useDebouncedValue = <T>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<T>()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedValue(value), delay)

    return () => {
      timerRef.current && clearTimeout(timerRef.current)
    }
  }, [value, delay])

  return debouncedValue
}
