import styled from 'styled-components'
import { appearAnimation, breakpoints, defaultBorderRadius } from '@constants/styles'

export const StyledSearch = styled.div`
  position: relative;
  width: 100%;
`

export const SearchResults = styled.div<{ $visible?: boolean }>`
  ${appearAnimation}
  ${defaultBorderRadius}

  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
  background: ${({ theme }) => theme.bgColor};

  position: absolute;
  left: 0;
  top: calc(50px + 1rem);
  width: 100%;
  flex-direction: column;
  max-height: 400px;
  overflow-y: auto;
  padding: 0.5rem;
  max-width: ${breakpoints.s};

  box-shadow:
    ${({ theme }) => theme.fontColor} 0px 0px 15px,
    ${({ theme }) => theme.fontColor} 0px 0px 3px 1px;
`
