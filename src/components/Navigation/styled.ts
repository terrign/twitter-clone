import { Color } from '@constants'
import { Button } from '@ui'
import styled from 'styled-components'

export const StyledAsideNavigation = styled.aside`
  margin: 0 auto;
  max-width: 230px;
  width: 100%;

  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  nav {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    align-items: end;
    justify-items: end;
  }

  & > div {
    margin-top: 2rem;
  }
`

export const LogoutButton = styled(Button)`
  background-color: ${Color.GRAY};
`
