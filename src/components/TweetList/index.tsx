import { TweetCard } from '@components'
import { useAppSelector } from '@store'
import { Tweet } from '@types'

import { StyledTweetList } from './styled'

export interface TweetListProps {
  tweets: Tweet[]
}

export const TweetList = ({ tweets }: TweetListProps) => {
  const user = useAppSelector((state) => state.user.user)

  return (
    <StyledTweetList>
      {tweets.map((tweet) => {
        return <TweetCard tweet={tweet} key={tweet.id} createdByInfo={user} />
      })}
    </StyledTweetList>
  )
}
