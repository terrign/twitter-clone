import { PropsWithChildren } from 'react'
import { darkTheme, GlobalStyles, lightTheme } from '@constants'
import { useAppSelector } from '@store'
import { Theme } from '@types'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const theme = useAppSelector((state) => state.user.theme)
  const currentThemeObject = theme === Theme.LIGHT ? lightTheme : darkTheme

  return (
    <StyledThemeProvider theme={currentThemeObject}>
      <GlobalStyles $isLight={theme === Theme.LIGHT} />
      {children}
    </StyledThemeProvider>
  )
}
