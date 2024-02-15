import { ThemeObject } from '@types'
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

`

const defaultTheme: ThemeObject = {}

const darkTheme: ThemeObject = {
  ...defaultTheme,
}

const lightTheme: ThemeObject = {
  ...defaultTheme,
}

export { darkTheme, defaultTheme, GlobalStyles, lightTheme }
