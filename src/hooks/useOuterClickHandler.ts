import { RefObject } from 'react'
import { useEventListener } from '@hooks'

export interface OuterClickHandlerHook {
  (target: RefObject<HTMLElement> | HTMLElement, handler: () => void): void
}

export const useOuterClickHandler: OuterClickHandlerHook = (target, handler) => {
  const outsideClickHandler = (event: MouseEvent) => {
    const elem = target instanceof HTMLElement ? target : target.current

    const clickTarget = event.target as Node

    if (elem && !elem.contains(clickTarget)) {
      handler()
    }
  }

  useEventListener(document.body, 'mousedown', outsideClickHandler)
}
