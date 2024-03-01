import { DefaultProfileBackGround } from '@assets'
import { Header, ProfileInfo, TweetForm, TweetList } from '@components'
import { useAppSelector, useFetchTweetsByUserIdQuery, useGetUserByIdQuery } from '@store'
import { Outlet, useLoaderData } from 'react-router-dom'

import { ProfileBackground, UserName } from './styled'

export const Profile = () => {
  const { userId } = useLoaderData() as { userId: string }
  const { uid } = useAppSelector((state) => state.user.user)
  const user = useGetUserByIdQuery(userId)
  const tweets = useFetchTweetsByUserIdQuery(userId)

  return (
    <>
      <Header>
        <UserName>
          <p>{user.data?.name}</p>
          <p>{tweets.data?.length ?? 0} tweets</p>
        </UserName>
      </Header>
      <ProfileBackground $url={DefaultProfileBackGround} />
      {user.data && <ProfileInfo user={user.data} />}
      {uid === userId && <TweetForm />}
      {tweets.data && <TweetList tweets={tweets.data} />}
      <Outlet />
    </>
  )
}
