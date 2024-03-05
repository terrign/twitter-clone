import { screen } from '@constants/styles'
import styled from 'styled-components'

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
  margin-bottom: 0.5rem;
  min-height: 2rem;

  background: ${({ theme }) => theme.bgColor};
`

export const HeaderBlock = styled.div`
  display: flex;

  & > *:last-child {
    margin-left: 0.5rem;
  }

  a {
    display: block;
  }
`

export const AsideButton = styled.button`
  display: none;

  @media ${screen.m} {
    display: block;
  }
`
