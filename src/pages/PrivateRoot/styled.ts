import { screen } from '@constants'
import styled from 'styled-components'

export const PrivateRootWrapper = styled.section`
  display: grid;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
  grid-template-columns: minmax(150px, 230px) minmax(500px, 900px) minmax(150px, 230px);
  grid-column-gap: 1rem;

  @media ${screen.xl} {
    padding: 0;
  }

  @media ${screen.l} {
    grid-template-columns: 50px 1fr minmax(150px, 230px);
  }

  @media ${screen.s} {
    grid-column-gap: 0;
  }
`
