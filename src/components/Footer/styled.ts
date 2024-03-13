import styled from 'styled-components'
import { centerFlex, font, mediaHover } from '@constants/styles'

export const StyledFooter = styled.footer`
  ${centerFlex}
  font-size: ${({ theme }) => theme.fontXS};

  width: 100%;
  white-space: nowrap;
  flex-wrap: wrap;

  * {
    margin-top: 0.3rem;
  }

  *:not(:first-child) {
    display: block;
    margin-left: 1rem;
  }

  a {
    ${font}
  }

  @media ${mediaHover} {
    a:hover {
      text-decoration: underline;
    }
  }
`
