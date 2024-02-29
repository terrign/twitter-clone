import { DefaultProfileBackGround } from '@assets'
import { Header, ProfileInfo, TweetForm, TweetList } from '@components'
import { useAppSelector, useFetchTweetsByUserIdQuery } from '@store'
import { Outlet } from 'react-router-dom'

import { ProfileBackground, UserName } from './styled'

export const Profile = () => {
  const { name, uid } = useAppSelector((state) => state.user.user)

  const { data } = useFetchTweetsByUserIdQuery(uid)

  return (
    <>
      <Header>
        <UserName>
          <p>{name}</p>
          <p>{data?.length ?? 0} tweets</p>
        </UserName>
      </Header>
      <ProfileBackground $url={DefaultProfileBackGround} />
      <ProfileInfo />
      <TweetForm />
      {data && <TweetList tweets={data} />}
      <Outlet />
    </>
  )
}
