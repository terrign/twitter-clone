import { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { DefaultProfileBackGround } from '@assets'
import { Header, ProfileInfo, TweetForm, TweetList } from '@components'
import { useAppSelector, useFetchTweetsByUserIdQuery, useGetUserByIdQuery } from '@store'
import { Loader } from '@ui'
import { ProfileBackground, UserName } from './styled'

export const Profile = () => {
  const { userId } = useParams<{ userId: string }>()
  const [skip, setSkip] = useState(true)
  const { uid } = useAppSelector((state) => state.user.user)
  const user = useGetUserByIdQuery(userId, { skip })
  const tweets = useFetchTweetsByUserIdQuery(userId as string, { skip })

  if (skip && userId) {
    setSkip(false)
  }

  if (tweets.isFetching || user.isFetching) {
    return <Loader h="200px" />
  }

  return (
    <>
      <Header>
        {user.data && (
          <UserName>
            <p>{user.data?.name}</p>
            <p>{tweets.data?.length ?? 0} tweets</p>
          </UserName>
        )}
      </Header>
      {!user.data && <h3>Profile has been removed or never existed</h3>}
      {user.data && (
        <>
          <ProfileBackground $url={DefaultProfileBackGround} />
          {user.data && <ProfileInfo user={user.data} />}
          {uid === userId && <TweetForm />}
          {tweets.data && <TweetList tweets={tweets.data} />}
          <Outlet />
        </>
      )}
    </>
  )
}
