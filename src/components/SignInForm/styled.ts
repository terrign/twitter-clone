import styled from 'styled-components'
import { Centered } from '@components/UI/Centered'
import { breakpoints } from '@constants/styles'

export const Wrapper = styled(Centered)`
  max-width: ${breakpoints.xs};
  width: 100%;
  display: flex;
  flex-direction: column;

  h2 {
    width: 100%;
    margin-top: 2rem;
  }
`
