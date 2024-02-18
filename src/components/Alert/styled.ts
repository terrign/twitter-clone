import { Color } from '@constants'
import styled, { css, keyframes } from 'styled-components'

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

export const StyledAlert = styled.div<{ $type: 'error' | 'success' }>`
  ${appearAnimation}

  font-size: ${({ theme }) => theme.fontS};
  background: ${({ $type }) => ($type === 'success' ? Color.BLUE : Color.RED)};
  color: ${Color.WHITE};

  position: absolute;
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
  height: 1rem;
  width: 1rem;
  top: 0.5rem;
  left: calc(100% - 1.5rem);
`
