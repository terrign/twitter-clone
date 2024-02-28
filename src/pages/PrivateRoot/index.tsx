import { Navigation, YouMightLike } from '@components'
import { useAppSelector, useGetUserSuggestionsQuery } from '@store'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { PrivateRootWrapper, RightAside } from './styled'

export const PrivateRoot = () => {
  const [asideVisible, setAsideVisible] = useState<boolean>(false)
  const { uid } = useAppSelector((state) => state.user.user)
  const { data } = useGetUserSuggestionsQuery(uid)

  const toggleAside = () => {
    setAsideVisible((prev) => !prev)
  }

  const tweets = data?.tweets
  const users = data?.users

  return (
    <PrivateRootWrapper>
      <Navigation />
      <Outlet context={toggleAside} />
      <RightAside $visible={asideVisible}>
        <YouMightLike tweets={tweets} users={users} toggleAside={toggleAside} />
      </RightAside>
    </PrivateRootWrapper>
  )
}
