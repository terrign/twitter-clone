import styled from 'styled-components'
import { Color, mediaHover } from '@constants/styles'

export const StyledTogggler = styled.button`
  display: flex;
  align-items: center;
  border-radius: 24px;
  background-color: ${Color.BLUE};

  justify-content: initial;

  padding: 2px;
  width: 50px;
  height: 24px !important;
  box-sizing: border-box;
  border: none;
  transition-property: padding-left;
  transition-duration: 0.1s;
  transition-timing-function: ease-in;

  input {
    display: none;
  }

  &:has(input[type='checkbox']:checked) {
    justify-content: flex-start;
    padding-left: 26px;
    background-color: ${Color.ALERT_TEAL};
  }

  @media ${mediaHover} {
    &:hover {
      cursor: pointer;
    }
  }
`

export const TogglerBar = styled.div`
  border-radius: 100%;
  height: 22px;
  width: 22px;

  background-color: ${Color.WHITE};
`
