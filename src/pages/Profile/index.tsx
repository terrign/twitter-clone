import { DefaultProfileBackGround } from '@assets'
import { ProfileInfo, TweetForm } from '@components'
import { useAppSelector, useFetchTweetsByUserIdQuery } from '@store'
import { Outlet } from 'react-router-dom'

import { ProfileBackground, ProfileHeader, ProfileWrapper } from './styled'

export const Profile = () => {
  const { name, uid } = useAppSelector((state) => state.user.user)

  const { data } = useFetchTweetsByUserIdQuery(uid)

  return (
    <ProfileWrapper>
      <ProfileHeader>
        <p>{name}</p>
        <p>{data?.length ?? 0} tweets</p>
      </ProfileHeader>
      <ProfileBackground $url={DefaultProfileBackGround} />
      <ProfileInfo />
      <TweetForm />
      <Outlet />
    </ProfileWrapper>
  )
}
