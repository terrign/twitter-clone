import { TweetCard } from '@components'
import { Tweet } from '@types'

import { StyledTweetList } from './styled'

export interface TweetListProps {
  tweets: Tweet[]
}

export const TweetList = ({ tweets }: TweetListProps) => {
  return (
    <StyledTweetList>
      {tweets.map((tweet) => {
        return <TweetCard tweet={tweet} key={tweet.id} />
      })}
    </StyledTweetList>
  )
}
