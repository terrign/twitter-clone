import styled, { css } from 'styled-components'

const outlinedButtonBorder = css`
  border: 1px solid ${({ theme }) => theme.buttonBorderColor};
`

export const Button = styled.button.attrs<{ $type: 'filled' | 'outlined' }>({ type: 'button' })`
  display: block;
  background: ${({ theme, $type }) => ($type === 'filled' ? theme.buttonBgColor : 'none')};
  ${({ $type }) => ($type === 'filled' ? 'none' : outlinedButtonBorder)};
  border-radius: 42px;
  height: 50px;
  width: 100%;
  cursor: pointer;
`
