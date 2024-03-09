import { useState } from 'react'

interface UseBooleanState {
  (
    initialValue: boolean,
  ): [value: boolean, toggle: (value?: boolean) => void, setTrue: () => void, setFalse: () => void]
}

export const useBooleanState: UseBooleanState = (initial: boolean) => {
  const [isTrue, setIsTrue] = useState(() => initial)

  const toggle = (value?: boolean) => {
    if (typeof value === 'boolean') {
      setIsTrue(value)

      return
    }

    setIsTrue((prev) => !prev)
  }

  const setTrue = () => {
    if (!isTrue) {
      setIsTrue(true)
    }
  }

  const setFalse = () => {
    if (isTrue) {
      setIsTrue(false)
    }
  }

  return [isTrue, toggle, setTrue, setFalse]
}
