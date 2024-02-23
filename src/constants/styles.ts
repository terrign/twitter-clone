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
  xxs: `(max-width: ${breakpoints.xxs})`,
  xs: `(max-width: ${breakpoints.xs})`,
  s: `(max-width: ${breakpoints.s})`,
  m: `(max-width: ${breakpoints.m})`,
  l: `(max-width: ${breakpoints.l})`,
  xl: `(max-width: ${breakpoints.xl})`,
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
}

const darkTheme: ThemeObject = {
  ...defaultTheme,
}

const lightTheme: ThemeObject = {
  ...defaultTheme,
}

const GlobalStyles = createGlobalStyle`
  :root {
    font-size: 20px;
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

  button {
    ${font}
    font-size: ${({ theme }) => theme.fontM};
    font-weight: 500;
    background: none;
    outline: none;
    border: none;
    cursor: pointer;
    user-select: none;
  }

  @media (hover: hover) {
    a:hover {
      text-decoration: underline;
    }
  }

`

export { Color, darkTheme, defaultTheme, font, GlobalStyles, lightTheme, screen }
