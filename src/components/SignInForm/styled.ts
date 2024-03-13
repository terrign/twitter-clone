import styled from 'styled-components'
import { Centered } from '@components/UI/Centered'
import { breakpoints, columnFlex } from '@constants/styles'

export const Wrapper = styled(Centered)`
  ${columnFlex};
  max-width: ${breakpoints.xs};
  width: 100%;

  h2 {
    width: 100%;
    margin-top: 2rem;
  }
`
