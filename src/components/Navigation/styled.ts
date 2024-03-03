import { Color, hoverTitle, screen } from '@constants'
import { Button } from '@ui'
import styled from 'styled-components'

export const StyledAsideNavigation = styled.aside`
  position: sticky;
  top: 1rem;
  left: 0;
  margin: 0 auto;

  height: calc(100vh - 2rem);
  width: 100%;
  max-width: 230px;
  display: flex;
  flex-direction: column;

  @media ${screen.l} {
    align-items: center;
  }

  @media ${screen.l} {
    padding-top: 1rem;
    top: 0;

    a {
      margin: 0 auto;
    }
  }

  nav {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    align-items: end;
    justify-items: end;

    @media ${screen.l} {
      justify-items: center;
    }
  }

  & > *:not(:first-child) {
    margin-top: 1rem;
  }

  & > div {
    max-width: 100%;
    overflow: hidden;

    @media ${screen.l} {
      div:first-child {
        display: none;
      }
    }
  }
`

export const LogoutButton = styled(Button)<{ $title: string }>`
  background: ${({ theme }) => theme.disabledButtonBgColor};
  color: ${Color.WHITE};

  position: relative;

  padding: 0;

  div {
    display: none;
  }

  @media ${screen.l} {
    height: 40px;
    width: 40px;

    border: none;
    background: none;

    div {
      display: block;
      width: 40px;
      height: 40px;
      border: none;
    }

    span {
      display: none;
    }
  }

  @media ${screen.l} and (hover: hover) {
    ${hoverTitle}
  }
`
