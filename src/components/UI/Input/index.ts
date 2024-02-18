import { font } from '@constants'
import styled from 'styled-components'

export const Input = styled.input`
  ${font}

  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  font-size: ${({ theme }) => theme.fontM};

  background: none;
  outline: none;
  border-radius: 6px;
  height: 50px;
  padding: 1rem;
`
