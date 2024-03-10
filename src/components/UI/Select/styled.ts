import styled from 'styled-components'
import { font, mediaHover, screen } from '@constants/styles'

export const StyledSelect = styled.div`
  position: relative;

  @media ${screen.m} {
    input {
      padding: 0.5rem;
    }
  }
`

export const Option = styled.button`
  ${font}
  ${({ theme }) => theme.fontS}

  z-index: 5;

  height: 50px;
  width: 100%;
  display: block;
  word-wrap: nowrap;
  padding: 0.2rem;

  &:focus-visible {
    background: ${({ theme }) => theme.outlinedButtonHover};
  }

  @media ${mediaHover} {
    &:hover {
      background: ${({ theme }) => theme.outlinedButtonHover};
    }
  }
`

export const Options = styled.div<{ $show?: boolean }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 200px;
  top: -195px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-bottom: none;
  overflow-y: scroll;
  background: ${({ theme }) => theme.bgColor};
  z-index: 6;
`

export const IconWrapper = styled.button`
  position: absolute;
  top: 18px;

  left: calc(100% - 1rem - 15px);
`
