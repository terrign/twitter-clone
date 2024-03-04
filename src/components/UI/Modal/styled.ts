import { screen } from '@constants'
import { Centered } from '@ui'
import styled from 'styled-components'

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
  position: relative;
  padding: 1rem;
  background-color: ${({ theme }) => theme.bgColor};
  border-radius: 6px;
  flex-grow: 1;
  max-width: 600px;
  max-height: 90vh;
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

  @media (hover: hover) {
    &:hover {
      transform: scale(1.4);
    }
  }
`

export const ModalHeader = styled.h3`
  display: flex;
  width: 100%;
  height: 1rem;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
  margin: 0 0 1rem 0;

  font-size: ${({ theme }) => theme.fontM};
`
