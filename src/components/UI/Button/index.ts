import styled, { css } from 'styled-components'
import { Color, mediaHover, screen } from '@constants/styles'

export enum ButtonType {
  FILLED,
  OUTLINED,
}

const outlinedButtonBorder = css`
  border: 1px solid ${({ theme }) => theme.buttonBorderColor};
`

export const Button = styled.button<{ $type: ButtonType }>`
  display: block;
  background: ${({ theme, $type }) => ($type === ButtonType.FILLED ? theme.buttonBgColor : 'none')};
  ${({ $type }) => ($type === ButtonType.FILLED ? 'border: none' : outlinedButtonBorder)};
  border-radius: 42px;
  height: 50px;
  width: 100%;

  color: ${({ $type }) => $type === ButtonType.FILLED && Color.WHITE};

  @media ${mediaHover} {
    &:hover {
      background: ${({ theme, $type }) =>
        $type === ButtonType.FILLED ? theme.filledButtonHover : theme.outlinedButtonHover};
    }
  }

  &:disabled {
    background: ${({ $type, theme }) => ($type === ButtonType.FILLED ? theme.disabledButtonBgColor : 'none')};

    color: ${({ $type, theme }) => $type === ButtonType.OUTLINED && theme.fontColorSecondary};
  }
`

export const TweetButton = styled(Button)`
  svg {
    display: none;
  }

  @media ${screen.l} {
    height: 40px;
    width: 40px;
    margin: 0 auto;

    svg {
      display: block;
      width: 25px;
      height: 25px;
    }

    span {
      display: none;
    }
  }
`
