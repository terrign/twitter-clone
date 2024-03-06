import styled from 'styled-components'
import { font } from '@constants/styles'

export const Input = styled.input`
  ${font}

  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  font-size: ${({ theme }) => theme.fontM};

  border-radius: 6px;
  height: 50px;
  padding: 1rem;
`
