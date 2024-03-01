import { Color } from '@constants'
import { Centered } from '@ui'
import styled, { keyframes } from 'styled-components'

const animation = keyframes`
 0% {
      top: 0;
      color: white;
    }
    50% {
      top: 30px;
      color: rgba(255, 255, 255, 0.2);
    }
    100% {
      top: 0;
      color: white;
    }
`

export const LoaderCenter = styled(Centered)<{ $h?: string; $w?: string }>`
  height: ${({ $h }) => $h};
  width: ${({ $w }) => $w};
`

export const StyledLoader = styled.span`
  width: 16px;
  height: 16px;
  box-shadow:
    0 30px,
    0 -30px;
  border-radius: 4px;
  background: currentColor;
  display: block;
  margin: -50px auto 0;
  position: relative;
  color: ${({ theme }) => theme.fontColor};
  transform: translateY(30px);
  box-sizing: border-box;
  animation: ${animation} 2s ease infinite;

  &::after,
  &::before {
    content: '';
    box-sizing: border-box;
    width: 16px;
    height: 16px;
    box-shadow:
      0 30px,
      0 -30px;
    border-radius: 4px;
    background: currentColor;
    color: ${Color.BLUE};
    position: absolute;
    left: 30px;
    top: 0;
    animation: ${animation} 2s 0.2s ease infinite;
  }

  &::before {
    animation-delay: 0.4s;
    left: 60px;
  }
`
