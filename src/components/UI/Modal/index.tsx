import { PropsWithChildren, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useEventListener } from '@hooks/useEventListener'
import { useOuterClickHandler } from '@hooks/useOuterClickHandler'
import { Background, CloseButton, Container, ModalHeader } from './styled'

interface Props extends PropsWithChildren {
  open: boolean
  onClose: () => void
  header?: JSX.Element | string
}

export const Modal = (props: Props) => {
  const { open, onClose, children, header } = props
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
