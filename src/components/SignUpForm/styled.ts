import { Centered } from '@components/UI/Centered'
import styled from 'styled-components'

export const Wrapper = styled(Centered)`
  svg {
    display: block;
    margin: 0 auto;
  }
`

export const DateOfBirth = styled.p`
  font-weight: 700;
`

export const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.fontXS};
`
