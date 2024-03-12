import styled from 'styled-components'
import { columnFlex, screen } from '@constants/styles'

export const Form = styled.form`
  ${columnFlex};

  font-size: ${({ theme }) => theme.fontS};

  max-width: 600px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;
  margin: 0 auto;

  div:has(a):last-child {
    place-self: end;
  }

  @media ${screen.m} {
    padding: 1rem;
  }
`
