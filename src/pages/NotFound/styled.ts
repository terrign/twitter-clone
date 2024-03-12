import styled from 'styled-components'
import { Button } from '@components/UI/Button'
import { Centered } from '@components/UI/Centered'
import { columnFlex, screen } from '@constants/styles'

export const StyledNotFound = styled.section`
  height: 100%;
  width: 100%;
  padding: 2rem;

  @media ${screen.m} {
    padding: 1rem;
  }
`

export const BackHomeButton = styled(Button)`
  margin: 0 auto;
  width: 100%;
  margin-top: 1rem;
`

export const Container = styled(Centered)`
  max-height: 500px;
  max-width: ${screen.l};

  div {
    ${columnFlex};
    justify-content: space-between;
    max-height: 500px;
    padding: 2rem;
    height: 100%;

    @media ${screen.m} {
      padding: 0;
    }
  }

  @media ${screen.m} {
    flex-direction: column;
    height: auto;

    width: 100%;

    svg {
      max-width: 100%;
    }
  }

  h1 {
    text-align: center;
    margin-bottom: 1rem;
  }
`
