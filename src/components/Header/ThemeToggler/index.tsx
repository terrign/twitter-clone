import { switchTheme, useAppDispatch, useAppSelector } from '@store'
import { Theme } from '@types'
import { Toggler } from '@ui'

export const ThemeToggler = () => {
  const theme = useAppSelector((state) => state.user.theme)

  const dispatch = useAppDispatch()

  const toggleTheme = () => {
    dispatch(switchTheme())
  }

  return <Toggler onChange={toggleTheme} checked={theme === Theme.LIGHT} />
}
