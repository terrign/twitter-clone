import { useState } from 'react'
import { TweetCard } from '@components'
import { useGetUsersByIdsQuery } from '@store'
import { Tweet } from '@types'
import { Loader } from '@ui'
import { StyledTweetList } from './styled'

export interface TweetListProps {
  tweets: Tweet[]
}

export const TweetList = ({ tweets }: TweetListProps) => {
  const [skip, setSkip] = useState(true)

  const { data, isFetching } = useGetUsersByIdsQuery([...new Set(tweets.map((tweet) => tweet.createdById))], { skip })

  if (tweets.length >= 0 && skip) {
    setSkip(false)
  }

  if (isFetching) {
    return <Loader />
  }

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
