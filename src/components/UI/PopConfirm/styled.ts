import styled from 'styled-components'
import { Button } from '@components/UI/Button'
import { Color } from '@constants/styles'

export const ConfirmButton = styled(Button)`
  background: ${Color.ALERT_RED};
`

export const Footer = styled.footer`
  display: flex;
  justify-content: space-evenly;
  margin-top: 1rem;

  button {
    max-width: 120px;
  }
`

export const Text = styled.p`
  font-weight: 700;
`
