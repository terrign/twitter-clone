import { screen } from '@constants'
import styled from 'styled-components'

export const Main = styled.main`
  height: 1px;
  min-height: 100vh;
  padding: 1rem;

  @media ${screen.l} {
    padding: 0;
  }
`
