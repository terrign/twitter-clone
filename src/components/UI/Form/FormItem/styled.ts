import { Color, font } from '@constants'
import styled, { css, keyframes } from 'styled-components'

const ANIMATION_DURATION = '0.3s'

const appearFrames = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const appearAnimation = css`
  animation-name: ${appearFrames};
  animation-duration: ${ANIMATION_DURATION};
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
`

const nextElemMargin = css`
  + * {
    margin-top: 1rem;
  }
`

export const StyledFormItem = styled.div<{ $hasError?: boolean }>`
  position: relative;
  transition: margin-top ${ANIMATION_DURATION} ease-in-out;

  ${({ $hasError }) => $hasError && nextElemMargin}

  span {
    ${font}
    ${appearAnimation}

    font-size: ${({ theme }) => theme.fontXS};
    color: ${Color.RED};

    display: block;
    position: absolute;
    top: 50px;
    line-height: 1rem;
    font-weight: 500;
    box-sizing: border-box;
  }

  input {
    width: 100%;
    ${({ $hasError }) => $hasError && `border-color: ${Color.RED}`}
  }
`
