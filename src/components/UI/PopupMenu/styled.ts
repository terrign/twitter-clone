import styled from 'styled-components'

export const StyledPopupMenu = styled.div`
  position: relative;

  width: min-content;
`

export const Menu = styled.div<{ $position: 'left' | 'right'; $visible: boolean }>`
  background: ${({ theme }) => theme.bgColor};

  box-shadow:
    ${({ theme }) => theme.fontColor} 0px 0px 15px,
    ${({ theme }) => theme.fontColor} 0px 0px 3px 1px;

  position: absolute;
  flex-direction: column;
  z-index: 201;
  width: 150px;
  overflow: hidden;

  border-radius: 6px;

  top: 100%;
  left: ${({ $position }) => ($position === 'left' ? '-150px' : '100%')};
`
