import { Color } from '@constants/styles'
import styled from 'styled-components'

export const StyledImageInput = styled.div<{ $image: string }>`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 130px;
  width: 130px;

  border-radius: 50%;

  background-image: url(${({ $image }) => $image});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    background-color: ${Color.BLACK};
    opacity: 0.6;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.1s linear;

    @media (hover: hover) {
      &:hover {
        transform: scale(1.2);
      }
    }

    svg {
      height: 25px;
      width: 25px;
      color: ${Color.WHITE};
      z-index: 2;
    }
  }
`
