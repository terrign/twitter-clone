import styled from 'styled-components'

export const StyledUserName = styled.div<{ $col?: boolean }>`
  display: flex;

  flex-direction: ${({ $col }) => ($col ? 'column' : 'row')};
  justify-content: ${({ $col }) => ($col ? 'space-evenly' : 'flex-start')};

  p:first-child,
  a {
    font-weight: 700;
  }

  a,
  p {
    font-size: ${({ theme }) => theme.fontS};

    color: ${({ theme }) => theme.fontColor};
    flex: 0 2 auto;
    word-wrap: nowrap;
    text-overflow: ellipsis;
    max-width: 150px;
    overflow: hidden;
  }

  p:last-child {
    color: ${({ theme }) => theme.fontColorTertiary};
    white-space: pre;
  }
`
