import { font } from '@constants'
import styled from 'styled-components'

export const StyledSelect = styled.div`
  position: relative;
`

export const Option = styled.button`
  ${font}
  ${({ theme }) => theme.fontS}

  z-index: 5;

  background: none;
  outline: none;
  border: none;
  height: 50px;
  width: 100%;
  display: block;
  word-wrap: nowrap;
  padding: 0.2rem;

  &:focus-visible {
    background: ${({ theme }) => theme.outlinedButtonHover};
  }

  @media (hover: hover) {
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
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  border-bottom: none;
  overflow-y: scroll;
  background: ${({ theme }) => theme.bgColor};
  z-index: 100;
`

export const IconWrapper = styled.button`
  position: absolute;
  top: 19px;
  height: 1rem;
  width: 1rem;
  left: calc(100% - 1rem - 15px);
`
