import { DefaultProfileBackGround, LeftArrow } from '@assets'
import { ProfileInfo, TweetForm, TweetList } from '@components'
import { useAppSelector, useFetchTweetsByUserIdQuery } from '@store'
import { Outlet, useOutletContext } from 'react-router-dom'

import { AsideButton, ProfileBackground, ProfileHeader, ProfileWrapper } from './styled'

export const Profile = () => {
  const { name, uid } = useAppSelector((state) => state.user.user)

  const toggleAside = useOutletContext<() => void>()

  const { data } = useFetchTweetsByUserIdQuery(uid)

  return (
    <ProfileWrapper>
      <ProfileHeader>
        <div>
          <p>{name}</p>
          <p>{data?.length ?? 0} tweets</p>
        </div>
        <AsideButton onClick={toggleAside}>
          <LeftArrow />
        </AsideButton>
      </ProfileHeader>
      <ProfileBackground $url={DefaultProfileBackGround} />
      <ProfileInfo />
      <TweetForm />
      {data && <TweetList tweets={data} />}
      <Outlet />
    </ProfileWrapper>
  )
}
