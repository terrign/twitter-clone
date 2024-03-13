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
  const userQuery = useGetUserByIdQuery(userId, { skip: skipUserQuery })
  const tweetsQuery = useFetchTweetsByUserIdQuery(userId as string, { skip: skipTweetsQuery })

  const user = userQuery.data
  const tweets = tweetsQuery.data

  if (skipUserQuery && userId) {
    initUserQuery()
  }

  if (skipTweetsQuery && user?.uid) {
    initTweetsQuery()
  }

  if (tweetsQuery.isFetching || userQuery.isFetching) {
    return <Loader h="200px" />
  }

  return (
    <>
      <Header>
        {user && (
          <UserName>
            <p>{user.name}</p>
            <p>{tweets?.length ?? 0} tweets</p>
          </UserName>
        )}
      </Header>
      {!user && <h3>Profile has been removed or never existed</h3>}
      {user && (
        <>
          <ProfileBackground $url={DefaultProfileBackGround} />
          {user && <ProfileInfo user={user} />}
          {uid === userId && <TweetForm />}
          {tweets && <TweetList tweets={tweets} />}
          <Outlet />
        </>
      )}
    </>
  )
}
