import styled from 'styled-components'

export const StyledFooter = styled.footer`
  font-size: ${({ theme }) => theme.fontXS};
  padding: 0px 1rem;
  display: flex;
  justify-content: center;
  width: 100%;
  word-wrap: nowrap;
  flex-wrap: wrap;

  * {
    margin-top: 0.3rem;
  }

  *:not(:first-child) {
    display: block;
    margin-left: 1rem;
  }
`
