import { screen } from '@constants'
import styled from 'styled-components'

export const Form = styled.form`
  font-size: ${({ theme }) => theme.fontS};

  max-width: 600px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  div:has(a):last-child {
    place-self: end;
  }

  @media ${screen.m} {
    padding: 1rem;
  }
`
