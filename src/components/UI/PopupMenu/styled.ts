import styled from 'styled-components'

export const StyledPopupMenu = styled.div`
  position: relative;

  width: min-content;
`

export const Menu = styled.div<{ $position: 'left' | 'right'; $visible: boolean }>`
  background: ${({ theme }) => theme.bgColor};

  position: absolute;
  flex-direction: column;
  z-index: 201;
  width: 4rem;
  overflow: hidden;

  border-radius: 6px;

  top: 100%;
  left: ${({ $position }) => ($position === 'left' ? '-4rem' : '100%')};
`
