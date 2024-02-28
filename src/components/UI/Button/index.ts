import { Color, screen } from '@constants'
import styled, { css } from 'styled-components'

const outlinedButtonBorder = css`
  border: 1px solid ${({ theme }) => theme.buttonBorderColor};
`

export const Button = styled.button<{ $type: 'filled' | 'outlined' }>`
  display: block;
  background: ${({ theme, $type }) => ($type === 'filled' ? theme.buttonBgColor : 'none')};
  ${({ $type }) => ($type === 'filled' ? 'border: none' : outlinedButtonBorder)};
  border-radius: 42px;
  height: 50px;
  width: 100%;

  color: ${({ $type }) => $type === 'filled' && Color.WHITE};

  @media (hover: hover) {
    &:hover {
      background: ${({ theme, $type }) => ($type === 'filled' ? theme.filledButtonHover : theme.outlinedButtonHover)};
    }
  }

  &:disabled {
    background: ${({ $type, theme }) => ($type === 'filled' ? theme.disabledButtonBgColor : 'none')};

    color: ${({ $type, theme }) => $type === 'outlined' && theme.fontColorSecondary};
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
