import { Like, LikeFilled } from '@assets'
import { Route } from '@router'
import { useAppSelector, useLikeTweetMutation, useUnlikeTweetMutation } from '@store'
import { Tweet, UserInfo } from '@types'
import { Avatar, UserName } from '@ui'
import { MouseEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'

import { CardHeader, Likes, StyledTweetCard, TweetAvatar, TweetContent } from './styled'

interface TweetCardProps {
  tweet: Tweet
  createdByInfo: UserInfo
}

export const TweetCard = ({
  tweet: { text, imageURL, likedUserIds, timestamp, id },
  createdByInfo,
}: TweetCardProps) => {
  const { uid } = useAppSelector((state) => state.user.user)
  const [likeTrigger, likeTriggerState] = useLikeTweetMutation()
  const [unlikeTrigger, unlikeTriggerState] = useUnlikeTweetMutation()
  const nav = useNavigate()

  const { photoURL, name, email } = createdByInfo
  const date = new Date(timestamp).toLocaleString('en-US', { month: 'long', day: 'numeric' })

  const likedByCurrentUser = likedUserIds.includes(uid)

  const likeClickHandler: MouseEventHandler<HTMLElement> = async (event) => {
    event.stopPropagation()

    if (likeTriggerState.status === 'pending' || unlikeTriggerState.status === 'pending') {
      return
    }

    if (likedUserIds.includes(uid)) {
      unlikeTrigger({ tweetId: id, uid })
    } else {
      likeTrigger({ tweetId: id, uid })
    }
  }

  const tweetClickHandler = () => {
    nav(`${Route.POST}/${id}`)
  }

  const showMoreClickHandler: MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation()
  }

  return (
    <StyledTweetCard onClick={tweetClickHandler}>
      <TweetAvatar>
        <Avatar photoURL={photoURL} size="s" />
      </TweetAvatar>
      <CardHeader>
        <div>
          <UserName name={name} email={email} col />
          <span>&bull;{date}</span>
        </div>
      </CardHeader>
      {uid === createdByInfo.uid && (
        <button onClick={showMoreClickHandler}>
          <span>...</span>
        </button>
      )}
      <TweetContent>
        <span>{text}</span>
        {imageURL && <img src={imageURL} />}
      </TweetContent>
      <Likes>
        <button onClick={likeClickHandler}>
          {likedByCurrentUser ? <LikeFilled /> : <Like />}
          {likedUserIds.length}
        </button>
      </Likes>
    </StyledTweetCard>
  )
}
