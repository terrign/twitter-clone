import { ThemeObject } from '@types'
import { createGlobalStyle, css } from 'styled-components'

const breakpoints = {
  xxs: '320px',
  xs: '375px',
  s: '475px',
  m: '768px',
  l: '1024px',
  xl: '1440px',
}

const screen = {
  /**
   * 320px
   */
  xxs: `screen and (max-width: ${breakpoints.xxs})`,
  /**
   * 375px
   */
  xs: `screen and (max-width: ${breakpoints.xs})`,
  /**
   * 475px
   */
  s: `screen and (max-width: ${breakpoints.s})`,
  /**
   * 768px
   */
  m: `screen and (max-width: ${breakpoints.m})`,
  /**
   * 1024px
   */
  l: `screen and (max-width: ${breakpoints.l})`,
  /**
   * 1440px
   */
  xl: `screen and (max-width: ${breakpoints.xl})`,
}

const font = css`
  font-family: 'Roboto', sans-serif;
  color: ${({ theme }) => theme.fontColor};
`

enum Color {
  BLACK = '#000000',
  BLUE = '#1D9BF0',
  DARK_BLUE = '#005995de',
  PALE_BLUE = '#1d9bf040',
  PALE_GRAY = '#E4EAED',
  PALE_GRAY_2 = '#e4eaed45',
  DARK_GRAY = '#5C6C79',
  FONT_GRAY = 'rgb(83, 100, 113)',
  PALE_GRAY_3 = '#abb5bd33',

  GRAY = '#abb5bd',
  WHITE = '#FFFFFF',
  RED = '#ff0000',
  ALERT_TEAL = '#8df7c2',
  ALERT_RED = '#ff9292',
}

const defaultTheme: ThemeObject = {
  fontXXL: '3rem',
  fontXL: '1.5rem',
  fontL: '1rem',
  fontM: '0.9rem',
  fontS: '0.8rem',
  fontXS: '0.6rem',

  bgColor: Color.WHITE,
  reverseBgColor: Color.BLACK,

  fontColor: Color.BLACK,
  reverseFontColor: Color.WHITE,
  fontColorSecondary: Color.FONT_GRAY,
  fontColorTertiary: Color.GRAY,

  simpleButtonBgHover: Color.PALE_GRAY_3,

  modalBgColor: Color.PALE_BLUE,

  inputBorderColor: Color.GRAY,

  buttonBgColor: Color.BLUE,
  buttonBorderColor: Color.PALE_GRAY,
  disabledButtonBgColor: Color.PALE_GRAY,
  borderColor: Color.GRAY,

  outlinedButtonHover: Color.PALE_GRAY_2,
  filledButtonHover: Color.DARK_BLUE,
}

const darkTheme: ThemeObject = {
  ...defaultTheme,

  bgColor: Color.BLACK,
  reverseBgColor: Color.WHITE,

  fontColor: Color.WHITE,
  reverseFontColor: Color.BLACK,

  disabledButtonBgColor: Color.GRAY,
  borderColor: Color.PALE_GRAY_2,
}

const lightTheme: ThemeObject = {
  ...defaultTheme,
}

const GlobalStyles = createGlobalStyle<{ $isLight?: boolean }>`
  :root {
    font-size: 18px;
    ${font}
  }

  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    box-sizing: border-box;
    background: ${({ theme }) => theme.bgColor};
    scroll-behavior: smooth;

    color-scheme: ${({ $isLight }) => ($isLight ? 'light' : 'dark')}
  }

  body:has(#privateRoot) {
    overflow-y: scroll;
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: ${Color.BLUE}
  }

  h1,h2,h4,h5,h6,p {
    margin: 0;
    padding: 0;
  }

  h1,h2 {
    font-weight: 900;
    letter-spacing: -2px;
  }

  h1 {
    font-size: ${({ theme }) => theme.fontXXL};
  }

  h2 {
    font-size: ${({ theme }) => theme.fontXL};
  }

  button, textarea, input {
    ${font}
    font-size: ${({ theme }) => theme.fontM};
    font-weight: 500;
    background: none;
    outline: none;
    border: none;
    cursor: pointer;
    user-select: none;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (hover: hover) {
    a:hover {
      text-decoration: underline;
    }
  }

  @media ${screen.m} {
    body {
      overflow-x: hidden;
    }
  }

  @media ${screen.m} {
    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.5rem;
    }
  }

  @media ${screen.xs} {
    :root {
      font-size: 16px;
    }

    body {
      overflow-x: auto;
    }
  }

`

const hoverTitle = css<{ $title?: string }>`
  &:hover {
    &::after {
      content: ${({ $title }) => `'${$title}'`};
      display: block;
      position: absolute;
      top: 100%;
      left: 2rem;
      width: 100px;
      padding: 0.5rem;
      background: ${({ theme }) => theme.buttonBgColor};

      box-shadow:
        ${({ theme }) => theme.fontColor} 0px 0px 15px,
        ${({ theme }) => theme.fontColor} 0px 0px 3px 1px;

      border-radius: 6px;
      ${font}

      color: ${Color.WHITE};
      z-index: 25;
    }
  }
`

export { Color, darkTheme, defaultTheme, font, GlobalStyles, hoverTitle, lightTheme, screen }
