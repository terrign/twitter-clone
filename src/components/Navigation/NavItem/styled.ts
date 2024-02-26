import { font, screen } from '@constants'
import styled from 'styled-components'

export const StyledNavItem = styled.li`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: center;

  font-size: ${({ theme }) => theme.fontS};
  width: 100%;

  margin-left: 1rem;

  a {
    display: flex;
    width: 100%;
    align-items: center;
    ${font};
  }

  span {
    display: inline-block;
    margin-left: 0.5rem;

    @media ${screen.l} {
      display: none;
    }
  }

  div {
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
