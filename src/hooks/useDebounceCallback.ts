import { useEffect, useRef } from 'react'

type DebouncedFunction<T extends unknown[]> = (...args: T) => void

export const useDebounceCallback = <T extends unknown[]>(
  callback: DebouncedFunction<T>,
  delay: number = 500,
): DebouncedFunction<T> => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const debouncedCallback = (...args: T) => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }

  return debouncedCallback
}
