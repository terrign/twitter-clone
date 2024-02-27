import { Color, font } from '@constants'
import styled from 'styled-components'

export const StyledSearchInput = styled.div`
  ${font}
  display: flex;
  align-items: center;

  background: ${Color.PALE_GRAY};
  padding: 1rem;

  border-radius: 31px;
  height: 50px;

  input,
  svg {
    height: 1rem;
    width: 1rem;
    color: ${Color.DARK_GRAY};
  }

  input {
    width: 100%;
    margin-left: 0.5rem;
  }
`
