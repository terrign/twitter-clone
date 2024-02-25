import { Color } from '@constants'
import { Button } from '@ui'
import styled from 'styled-components'

export const StyledAsideNavigation = styled.aside`
  position: sticky;
  margin: 0 auto;
  max-width: 230px;
  height: calc(100vh - 2rem);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-items: flex-start;

  nav {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    align-items: end;
    justify-items: end;
  }

  & > *:not(:first-child) {
    margin-top: 1rem;
  }

  & > div {
    margin-top: auto !important;
  }
`

export const LogoutButton = styled(Button)`
  background-color: ${Color.GRAY};
`
