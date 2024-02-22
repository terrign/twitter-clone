import { Color } from '@constants'
import styled from 'styled-components'

export const StyledUserName = styled.div<{ $col?: boolean }>`
  flex-direction: ${({ $col }) => ($col ? 'column' : 'row')};

  display: flex;
  justify-content: flex-start;

  p:first-child {
    font-weight: 700;
  }

  p:last-child {
    color: ${Color.GRAY};
    font-size: ${({ theme }) => theme.fontS};
  }
`
