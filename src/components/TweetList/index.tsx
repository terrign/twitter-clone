import { TweetCard } from '@components'
import { useGetUsersByIdsQuery } from '@store'
import { Tweet } from '@types'

import { StyledTweetList } from './styled'

export interface TweetListProps {
  tweets: Tweet[]
}

export const TweetList = ({ tweets }: TweetListProps) => {
  const { data } = useGetUsersByIdsQuery(tweets.map((tweet) => tweet.createdById))

  return (
    data && (
      <StyledTweetList>
        {tweets.map((tweet) => {
          const userInfo = data.find(({ uid }) => uid === tweet.createdById)

          return userInfo && <TweetCard tweet={tweet} key={tweet.id} createdByInfo={userInfo} />
        })}
      </StyledTweetList>
    )
  )
}
