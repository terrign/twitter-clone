import { Outlet, useParams } from 'react-router-dom'
import { DefaultProfileBackGround } from '@assets/index'
import { Header } from '@components/Header'
import { ProfileInfo } from '@components/ProfileInfo'
import { TweetForm } from '@components/TweetForm'
import { TweetList } from '@components/TweetList'
import { Loader } from '@components/UI/Loader'
import { useBooleanState } from '@hooks/useBooleanState'
import { useFetchTweetsByUserIdQuery } from '@store/api/tweets'
import { useGetUserByIdQuery } from '@store/api/users'
import { useAppSelector } from '@store/index'
import { selectUser } from '@store/slices/user'
import { ProfileBackground, UserName } from './styled'

export const Profile = () => {
  const { userId } = useParams<{ userId: string }>()

  const [skipTweetsQuery, , , initTweetsQuery] = useBooleanState(true)
  const [skipUserQuery, , , initUserQuery] = useBooleanState(true)
  const { uid } = useAppSelector(selectUser)
  const user = useGetUserByIdQuery(userId, { skip: skipUserQuery })
  const tweets = useFetchTweetsByUserIdQuery(userId as string, { skip: skipTweetsQuery })

  if (skipUserQuery && userId) {
    initUserQuery()
  }

  if (skipTweetsQuery && user.data?.uid) {
    initTweetsQuery()
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
