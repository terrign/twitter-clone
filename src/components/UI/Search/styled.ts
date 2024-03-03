import styled, { css, keyframes } from 'styled-components'

export const StyledSearch = styled.div`
  position: relative;
  width: 100%;
`

const appearFrames = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const appearAnimation = css`
  animation-name: ${appearFrames};
  animation-duration: 0.2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
`

export const SearchResults = styled.div<{ $visible?: boolean }>`
  ${appearAnimation}
  position: absolute;
  left: 0;
  top: calc(50px + 1rem);
  width: 100%;
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
  flex-direction: column;
  max-height: 400px;
  overflow-y: auto;
  padding: 0.5rem;

  max-width: 475px;

  background: ${({ theme }) => theme.bgColor};

  border-radius: 6px;

  box-shadow:
    ${({ theme }) => theme.fontColor} 0px 0px 15px,
    ${({ theme }) => theme.fontColor} 0px 0px 3px 1px;
`
