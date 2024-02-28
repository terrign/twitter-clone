import styled from 'styled-components'

export const StyledUserName = styled.div<{ $col?: boolean }>`
  flex-direction: ${({ $col }) => ($col ? 'column' : 'row')};

  display: flex;
  justify-content: flex-start;

  p {
    font-size: ${({ theme }) => theme.fontS};
    flex: 0 2 auto;
    word-wrap: nowrap;
    text-overflow: ellipsis;
    max-width: 150px;
    overflow: hidden;
  }

  p:first-child {
    font-weight: 700;
  }

  p:last-child {
    color: ${({ theme }) => theme.fontColorTertiary};
  }
`
