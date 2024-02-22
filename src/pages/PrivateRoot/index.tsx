import { Navigation } from '@components'
import { Outlet } from 'react-router-dom'

import { PrivateRootWrapper } from './styled'

export const PrivateRoot = () => {
  return (
    <PrivateRootWrapper>
      <Navigation />
      <Outlet />
      <aside></aside>
    </PrivateRootWrapper>
  )
}
