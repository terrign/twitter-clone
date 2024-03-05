import { PropsWithChildren, ReactNode, useRef } from 'react'
import { useOuterClickHandler } from '@hooks/useOuterClickHandler'
import { Menu, StyledPopupMenu } from './styled'

export enum PopupMenuPosition {
  LEFT,
  RIGHT,
}

interface Props extends PropsWithChildren {
  position: PopupMenuPosition
  visible: boolean
  setVisible: (visible: boolean) => void
  controlButton: ReactNode
}

export const PopupMenu = (props: Props) => {
  const { children, position, visible, setVisible, controlButton } = props
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
