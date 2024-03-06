import styled from 'styled-components'
import { screen } from '@constants/styles'

export const Main = styled.main`
  height: 100%;
  padding: 1rem;

  @media ${screen.l} {
    padding: 0;
  }
`
