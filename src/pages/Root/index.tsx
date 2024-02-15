import { Outlet } from 'react-router'

import { Main } from './styled'

export const Root = () => {
  return (
    <Main>
      <Outlet />
    </Main>
  )
}
