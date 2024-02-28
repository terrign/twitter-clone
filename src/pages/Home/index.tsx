import { switchTheme, useAppDispatch, useAppSelector } from '@store'
import { Theme } from '@types'
import { Toggler } from '@ui'

import { Header, HomeWrapper } from './styled'

export const Home = () => {
  const theme = useAppSelector((state) => state.user.theme)

  const dispatch = useAppDispatch()

  const toggleTheme = () => {
    dispatch(switchTheme())
  }

  return (
    <HomeWrapper>
      <Header>
        <Toggler onChange={toggleTheme} checked={theme === Theme.LIGHT} />
      </Header>
    </HomeWrapper>
  )
}
