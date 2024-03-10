import styled from 'styled-components'
import { screen } from '@constants/styles'

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0rem;
  z-index: 10;
  padding: 1rem 0 0.5rem;
  margin-top: -1rem;
  margin-bottom: 1rem;

  background: ${({ theme }) => theme.bgColor};
`

export const HeaderBlock = styled.div`
  display: flex;
  align-items: center;

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
