import styled from 'styled-components'
import { centerFlex, Color, mediaHover } from '@constants/styles'

export const StyledImageInput = styled.div<{ $image: string }>`
  ${centerFlex}

  height: 130px;
  width: 130px;

  border-radius: 50%;

  background-image: url(${({ $image }) => $image});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  label {
    ${centerFlex}
    height: 40px;
    width: 40px;
    background-color: ${Color.BLACK};
    opacity: 0.6;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.1s linear;

    @media ${mediaHover} {
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
