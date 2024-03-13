import styled from 'styled-components'
import { PopupMenuPosition } from '@components/UI/PopupMenu'
import { defaultBorderRadius } from '@constants/styles'

export const StyledPopupMenu = styled.div`
  position: relative;
  width: min-content;
`

interface Props {
  $position: PopupMenuPosition
  $visible: boolean
}

export const Menu = styled.div<Props>`
  ${defaultBorderRadius}
  background: ${({ theme }) => theme.bgColor};
  left: ${({ $position }) => ($position === PopupMenuPosition.LEFT ? '-150px' : '100%')};

  box-shadow:
    ${({ theme }) => theme.fontColor} 0px 0px 15px,
    ${({ theme }) => theme.fontColor} 0px 0px 3px 1px;

  position: absolute;
  flex-direction: column;
  z-index: 201;
  width: 150px;
  overflow: hidden;

  top: 100%;
`
