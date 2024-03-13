import styled from 'styled-components'
import { appearAnimation, Color, defaultBorderRadius } from '@constants/styles'
import { NotificationType } from '@store/slices/notification'

export const StyledNotification = styled.div<{ $type: NotificationType }>`
  ${appearAnimation}
  ${defaultBorderRadius}

  font-size: ${({ theme }) => theme.fontS};
  background: ${({ $type }) => ($type === 'success' ? Color.BLUE : Color.RED)};
  color: ${Color.WHITE};

  position: fixed;
  z-index: 666;
  top: 2rem;
  left: calc(100% - 300px - 2rem);
  width: 300px;
  word-wrap: break-word;
  padding: 1rem 2rem 1rem 1rem;
`

export const CloseButton = styled.button.attrs({ type: 'button' })`
  position: absolute;
  color: inherit;
  height: 30px;
  width: 30px;
  top: 0.5rem;
  left: calc(100% - 30px - 0.5rem);
`
