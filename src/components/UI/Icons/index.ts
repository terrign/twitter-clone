import { GoogleLogo, TwitterLogo } from '@assets'
import styled from 'styled-components'

const TwitterIconMap = {
  big: {
    width: '50px',
    height: '41px',
  },
  default: {
    width: '40px',
    height: '33px',
  },
}

export const TwitterIcon = styled(TwitterLogo)<{ $size: keyof typeof TwitterIconMap }>`
  height: ${({ $size }) => TwitterIconMap[$size].height};
  width: ${({ $size }) => TwitterIconMap[$size].width};
`

export const GoogleIcon = styled(GoogleLogo)`
  height: 24px;
  width: 24px;
`
