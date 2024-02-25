import { Color } from '@constants'
import { Button } from '@ui'
import styled from 'styled-components'

export const StyledAsideNavigation = styled.aside`
  position: sticky;
  top: 1rem;
  left: 0;
  margin: 0 auto;

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

    p {
      max-width: 150px;
    }
  }
`

export const LogoutButton = styled(Button)`
  background-color: ${Color.GRAY};
`
