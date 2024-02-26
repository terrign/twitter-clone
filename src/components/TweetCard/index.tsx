import { Like, LikeFilled } from '@assets'
import { useAppSelector, useLikeTweetMutation, useUnlikeTweetMutation } from '@store'
import { Tweet, UserInfo } from '@types'
import { Avatar, UserName } from '@ui'

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

  const { photoURL, name, email } = createdByInfo
  const date = new Date(timestamp).toLocaleString('en-US', { month: 'long', day: 'numeric' })

  const likedByCurrentUser = likedUserIds.includes(uid)

  const likeClickHandler = async () => {
    if (likeTriggerState.status === 'pending' || unlikeTriggerState.status === 'pending') {
      return
    }

    if (likedUserIds.includes(uid)) {
      unlikeTrigger({ tweetId: id, uid })
    } else {
      likeTrigger({ tweetId: id, uid })
    }
  }

  return (
    <StyledTweetCard>
      <TweetAvatar>
        <Avatar photoURL={photoURL} size="s" />
      </TweetAvatar>
      <CardHeader>
        <div>
          <UserName name={name} email={email} />
          <span>&bull;</span>
          <span>{date}</span>
        </div>
      </CardHeader>
      {uid === createdByInfo.uid && (
        <button>
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
