import { Color } from '@constants'
import { Button } from '@ui'
import styled from 'styled-components'

export const MenuButton = styled.button`
  height: 2rem;
  width: 2rem;
  border-radius: 100%;
  padding-top: 0;

  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.simpleButtonBgHover};
  }
`

export const MenuOptionButton = styled(Button)`
  background: ${Color.ALERT_RED};
  border-radius: 0;
  height: 1.5rem;

  border: none;
`
