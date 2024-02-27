import { ThemeObject } from '@types'
import { createGlobalStyle, css } from 'styled-components'

const breakpoints = {
  xxs: '320px',
  xs: '375px',
  s: '425px',
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
   * 425px
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
  color: black;
`

const enum Color {
  BLACK = '#000000',
  BLUE = '#1D9BF0',
  DARK_BLUE = '#005995de',
  PALE_BLUE = '#1d9bf040',
  PALE_GRAY = '#E4EAED',
  PALE_GRAY_2 = '#e4eaed45',
  DARK_GRAY = '#5C6C79',
  FONT_GRAY = 'rgb(83, 100, 113)',
  GRAY = '#00000033',
  WHITE = '#FFFFFF',
  RED = '#ff0000',
  ALERT_TEAL = '#8df7c2',
  ALERT_RED = '#ff9292',
}

const defaultTheme: ThemeObject = {
  fontXXL: '3rem', //60
  fontXL: '1.5rem', //30
  fontL: '1rem', //20
  fontM: '0.9rem', //18
  fontS: '0.8rem', //16
  fontXS: '0.6rem', //12
  buttonBgColor: Color.BLUE,
  buttonBorderColor: Color.PALE_GRAY,
  inputBorderColor: Color.GRAY,
  bgColor: Color.WHITE,
  outlinedButtonHover: Color.PALE_GRAY_2,
  filledButtonHover: Color.DARK_BLUE,
  modalBgColor: Color.PALE_BLUE,
  fontSecondary: Color.FONT_GRAY,
}

const darkTheme: ThemeObject = {
  ...defaultTheme,
}

const lightTheme: ThemeObject = {
  ...defaultTheme,
}

const GlobalStyles = createGlobalStyle`
  :root {
    font-size: 18px;
    ${font}
  }

  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    box-sizing: border-box;
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

`

const hoverTitle = css<{ $title: string }>`
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
      border: 1px solid ${({ theme }) => theme.buttonBorderColor};
      border-radius: 6px;
      ${font}

      color: ${Color.WHITE};
      z-index: 10;
    }
  }
`

export { Color, darkTheme, defaultTheme, font, GlobalStyles, hoverTitle, lightTheme, screen }
