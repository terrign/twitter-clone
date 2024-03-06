import { PropsWithChildren } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { darkTheme, GlobalStyles, lightTheme } from '@constants/styles'
import { Theme } from '@models/index'
import { useAppSelector } from '@store/index'

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
