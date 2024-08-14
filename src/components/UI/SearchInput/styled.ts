import styled from 'styled-components'
import { font } from '@constants/styles'

export const StyledSearchInput = styled.div`
  ${font}
  display: flex;
  align-items: center;

  background: ${({ theme }) => theme.buttonBorderColor};
  padding: 1rem;

  border-radius: 31px;
  height: 50px;

  input,
  svg {
    height: 1rem;
    width: 1rem;
    color: ${({ theme }) => theme.fontColorSecondary};
  }

  input {
    width: 100%;
    margin-left: 0.5rem;
  }
`
