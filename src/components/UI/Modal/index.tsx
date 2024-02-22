import { useEventListener, useOuterClickHandler } from '@hooks'
import { PropsWithChildren, useRef } from 'react'
import { createPortal } from 'react-dom'

import { Background, CloseButton, Container, ModalHeader } from './styled'

export interface ModalProps extends PropsWithChildren {
  open: boolean
  onClose: () => void
  header: JSX.Element | string
}

export const Modal = ({ open, onClose, children, header }: ModalProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEventListener(document.body, 'keydown', (event) => {
    if (event.key === 'Escape') {
      onClose()
    }
  })

  useOuterClickHandler(containerRef, onClose)

  return (
    open &&
    createPortal(
      <Background>
        <Container ref={containerRef}>
          <ModalHeader>
            {header}
            <CloseButton onClick={onClose}>✖</CloseButton>
          </ModalHeader>

          {children}
        </Container>
      </Background>,
      document.body,
    )
  )
}
