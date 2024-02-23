import { Color } from '@constants'
import styled from 'styled-components'

export const StyledUserName = styled.div<{ $col?: boolean }>`
  flex-direction: ${({ $col }) => ($col ? 'column' : 'row')};

  display: flex;
  justify-content: flex-start;

  p {
    word-wrap: nowrap;
    text-overflow: ellipsis;
    max-width: 150px;
    overflow: hidden;
  }

  p:first-child {
    font-weight: 700;
  }

  p:last-child {
    color: ${Color.GRAY};
    font-size: ${({ theme }) => theme.fontS};
  }
`
