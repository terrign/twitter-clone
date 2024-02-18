import type { RefObject } from 'react'
import { useEffect } from 'react'

function useEventListener<K extends keyof HTMLElementEventMap, T extends HTMLElement = HTMLDivElement>(
  element: RefObject<T> | T,
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
): void

function useEventListener<K extends keyof DocumentEventMap>(
  element: RefObject<Document> | Document,
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
): void

function useEventListener<K extends keyof HTMLElementEventMap, T extends HTMLElement>(
  element: RefObject<T> | T | Document,
  eventName: K,
  handler: (event: HTMLElementEventMap[K] | Event) => void,
) {
  useEffect(() => {
    let targetElement: T | null = null

    if (element instanceof HTMLElement) {
      targetElement = element
    } else if ('current' in element && element.current) {
      targetElement = element.current
    } else {
      return
    }

    const eventHandler: typeof handler = (event) => {
      handler(event)
    }

    targetElement.addEventListener(eventName, eventHandler)

    return () => {
      targetElement && targetElement.removeEventListener(eventName, eventHandler)
    }
  }, [eventName, element, handler])
}

export { useEventListener }
