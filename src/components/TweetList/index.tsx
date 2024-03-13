import { TweetCard } from '@components/TweetCard'
import { Loader, LoaderSize } from '@components/UI/Loader'
import { useBooleanState } from '@hooks/useBooleanState'
import { Tweet } from '@models/index'
import { useGetUsersByIdsQuery } from '@store/api/users'
import { StyledTweetList } from './styled'

export interface TweetListProps {
  tweets: Tweet[]
  compact?: boolean
}

export const TweetList = ({ tweets, compact }: TweetListProps) => {
  const [skipUsersQuery, , , initUsersQuery] = useBooleanState(true)

  const { data, isFetching } = useGetUsersByIdsQuery([...new Set(tweets.map((tweet) => tweet.createdById))], {
    skip: skipUsersQuery,
  })

  if (tweets.length > 0 && skipUsersQuery) {
    initUsersQuery()
  }

  if (isFetching) {
    return <Loader size={compact ? LoaderSize.SMALL : LoaderSize.DEFAULT} />
  }

  return (
    data && (
      <StyledTweetList>
        {tweets.map((tweet) => {
          const userInfo = data.find(({ uid }) => uid === tweet.createdById)

          return userInfo && <TweetCard tweet={tweet} key={tweet.id} createdByInfo={userInfo} compact={compact} />
        })}
      </StyledTweetList>
    )
  )
}
