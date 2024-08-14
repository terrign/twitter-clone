import styled from 'styled-components'
import { screen } from '@constants/styles'

export const StyledDatePicker = styled.div`
  display: grid;
  grid-template-columns: minmax(150px, 2fr) minmax(100px, 1fr) minmax(100px, 1fr);
  grid-column-gap: 0.5rem;

  @media ${screen.m} {
    grid-template-columns: minmax(70px, 2fr) minmax(70px, 1fr) minmax(80px, 1fr);
  }
`
