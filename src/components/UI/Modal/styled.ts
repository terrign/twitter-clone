import styled from 'styled-components'
import { Centered } from '@components/UI/Centered'
import { breakpoints, defaultBorderRadius, mediaHover, screen, spaceFlex } from '@constants/styles'

export const Background = styled(Centered)`
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  background-color: ${({ theme }) => theme.modalBgColor};
  z-index: 200;
`

export const Container = styled.div`
  ${defaultBorderRadius}

  max-width: ${breakpoints.s};
  background-color: ${({ theme }) => theme.bgColor};

  position: relative;
  padding: 1rem;
  flex-grow: 1;
  max-height: 90%;
  overflow-y: auto;

  @media ${screen.s} {
    max-width: 100%;
    max-height: 100%;
    height: 100%;
    width: 100%;

    & > form {
      padding: 0;
    }
  }
`

export const CloseButton = styled.button.attrs({ type: 'button' })`
  height: 25px;
  width: 25px;
  padding: 0;

  transition: transform 0.1s linear;

  @media ${mediaHover} {
    &:hover {
      transform: scale(1.4);
    }
  }
`

export const ModalHeader = styled.h3`
  ${spaceFlex};
  align-items: center;

  width: 100%;
  height: 1rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
`
