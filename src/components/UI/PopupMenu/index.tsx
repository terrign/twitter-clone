import { useOuterClickHandler } from '@hooks'
import { PropsWithChildren, ReactNode, useRef } from 'react'

import { Menu, StyledPopupMenu } from './styled'

interface Props extends PropsWithChildren {
  position: 'left' | 'right'
  visible: boolean
  setVisible: (visible: boolean) => void
  controlButton: ReactNode
}

export const PopupMenu = ({ children, position, visible, setVisible, controlButton }: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  useOuterClickHandler(ref, () => setVisible(false))

  return (
    <StyledPopupMenu ref={ref}>
      {controlButton}
      {visible && (
        <Menu $position={position} $visible={visible}>
          {children}
        </Menu>
      )}
    </StyledPopupMenu>
  )
}
