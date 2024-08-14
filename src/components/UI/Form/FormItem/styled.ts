import styled, { css } from 'styled-components'
import { APPEAR_ANIMATION_DURATION, appearAnimation, Color, font } from '@constants/styles'

const nextElemMargin = css`
  + * {
    margin-top: 1rem;
  }
`

export const StyledFormItem = styled.div<{ $hasError?: boolean; $labeled?: boolean }>`
  position: relative;
  transition: margin-top ${APPEAR_ANIMATION_DURATION} ease-in-out;

  ${({ $hasError }) => $hasError && nextElemMargin}

  span {
    ${font}
    ${appearAnimation}

    font-size: ${({ theme }) => theme.fontXS};
    color: ${Color.RED};

    display: block;
    position: absolute;
    top: ${({ $labeled }) => ($labeled ? 'calc(50px + 1rem)' : '50px')};
    line-height: 1rem;
    font-weight: 500;
    box-sizing: border-box;
  }

  input {
    width: 100%;
    ${({ $hasError }) => $hasError && `border-color: ${Color.RED}`}
  }

  label {
    line-height: 1rem;
  }
`
