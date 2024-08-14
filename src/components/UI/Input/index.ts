import styled from 'styled-components'
import { defaultBorderRadius, font } from '@constants/styles'

export const Input = styled.input`
  ${font}
  ${defaultBorderRadius}

  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  font-size: ${({ theme }) => theme.fontM};

  height: 50px;
  padding: 1rem;
`
