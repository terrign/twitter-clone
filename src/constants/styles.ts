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
    letter-spacing: -3px;
  }

  h1 {
    font-size: ${({ theme }) => theme.fontXXL};
  }

  h2 {
    font-size: ${({ theme }) => theme.fontXL};
  }

  button {
    ${font}
    font-size: 1rem;
    font-weight: 500;
  }
`

const enum Color {
  BLUE = '#1D9BF0',
  PALE_GRAY = '#E4EAED',
}

const defaultTheme: ThemeObject = {
  fontXXL: '3rem', //84
  fontXL: '1.5rem', //42
  fontL: '1rem', //20
  fontM: '0.9rem', //18
  fontS: '0.8rem', //16
  fontXS: '0.7rem', //14
  buttonBgColorBlue: Color.BLUE,
  buttonBorderColor: Color.PALE_GRAY,
}

const darkTheme: ThemeObject = {
  ...defaultTheme,
}

const lightTheme: ThemeObject = {
  ...defaultTheme,
}

export { darkTheme, defaultTheme, GlobalStyles, lightTheme, screen }
