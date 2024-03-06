import styled, { css, keyframes } from 'styled-components'
import { Color } from '@constants/styles'

const ANIMATION_DURATION = '0.5s'

const appearFrames = keyframes`
  from {
    top: -500px;
  }

  to {
    top: 2rem;
  }
`

const appearAnimation = css`
  animation-name: ${appearFrames};
  animation-duration: ${ANIMATION_DURATION};
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
`

export const StyledNotification = styled.div<{ $type: 'error' | 'success' }>`
  ${appearAnimation}

  font-size: ${({ theme }) => theme.fontS};
  background: ${({ $type }) => ($type === 'success' ? Color.BLUE : Color.RED)};
  color: ${Color.WHITE};

  position: fixed;
  z-index: 666;
  top: 2rem;
  left: calc(100% - 300px - 2rem);
  border-radius: 6px;
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
