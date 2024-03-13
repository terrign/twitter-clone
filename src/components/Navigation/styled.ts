import styled from 'styled-components'
import { Button } from '@components/UI/Button'
import { Color, columnFlex, hoverTitle, mediaHover, screen } from '@constants/styles'

export const StyledAsideNavigation = styled.aside`
  ${columnFlex};

  position: sticky;
  top: 1rem;
  left: 0;
  margin: 0 auto;
  height: 100%;
  max-height: calc(100vh - 1rem);
  width: 100%;
  max-width: 230px;

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

  nav > ul {
    margin: 0;
    padding: 0;
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

  svg {
    display: none;
  }

  @media ${screen.l} {
    height: 40px;
    width: 40px;

    border: none;
    background: none;

    svg {
      display: block;
      width: 40px;
      height: 40px;
      border: none;
    }

    span {
      display: none;
    }
  }

  @media ${screen.l} and (${mediaHover}) {
    ${hoverTitle}

    &:hover {
      background: none;
    }
  }
`
