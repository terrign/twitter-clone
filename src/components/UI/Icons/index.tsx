import { DropDownArrow, GoogleLogo, TwitterLogo } from '@assets/index'
import styled from 'styled-components'

const TwitterIconSizeMap = {
  big: {
    width: '50px',
    height: '41px',
  },
  default: {
    width: '40px',
    height: '33px',
  },
}

export const TwitterIcon = styled(TwitterLogo)<{ $size: keyof typeof TwitterIconSizeMap }>`
  height: ${({ $size }) => TwitterIconSizeMap[$size].height};
  width: ${({ $size }) => TwitterIconSizeMap[$size].width};
`

export const GoogleIcon = styled(GoogleLogo)`
  height: 24px;
  width: 24px;
`

export const DropDownIcon = styled(DropDownArrow)<{ $down: boolean }>`
  height: 15px;
  width: 15px;

  color: ${({ theme }) => theme.fontColor};

  transition: transform 0.1s linear;
  ${({ $down }) => $down && 'transform: rotate(180deg)'}
`
