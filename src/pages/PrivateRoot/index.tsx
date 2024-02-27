import { Navigation, YouMightLike } from '@components'
import { useAppSelector, useGetUserSuggestionsQuery } from '@store'
import { Outlet } from 'react-router-dom'

import { PrivateRootWrapper } from './styled'

export const PrivateRoot = () => {
  const { uid } = useAppSelector((state) => state.user.user)
  const { data } = useGetUserSuggestionsQuery(uid)

  const tweets = data?.tweets
  const users = data?.users

  console.log(tweets, users)

  return (
    <PrivateRootWrapper>
      <Navigation />
      <Outlet />
      <aside>
        <YouMightLike tweets={tweets} users={users} />
      </aside>
    </PrivateRootWrapper>
  )
}
