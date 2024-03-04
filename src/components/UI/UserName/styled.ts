import styled from 'styled-components'

export const StyledUserName = styled.div<{ $col?: boolean }>`
  flex-direction: ${({ $col }) => ($col ? 'column' : 'row')};

  display: flex;
  justify-content: ${({ $col }) => ($col ? 'space-evenly' : 'flex-start')};

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

  a {
    font-weight: 700;
  }

  p:last-child {
    color: ${({ theme }) => theme.fontColorTertiary};
    white-space: pre;
  }
`
