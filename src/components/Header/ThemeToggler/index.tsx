import { Toggler } from '@components/UI/Toggler'
import { Theme } from '@models/index'
import { useAppDispatch, useAppSelector } from '@store/index'
import { switchTheme } from '@store/slices/user'

export const ThemeToggler = () => {
  const theme = useAppSelector((state) => state.user.theme)

  const dispatch = useAppDispatch()

  const toggleTheme = () => {
    dispatch(switchTheme())
  }

  return <Toggler onChange={toggleTheme} checked={theme === Theme.LIGHT} />
}
