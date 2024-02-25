import { useAppSelector } from '@store'
import { Tweet } from '@types'
import { Avatar, UserName } from '@ui'

import { CardHeader, Likes, StyledTweetCard, TweetAvatar, TweetContent } from './styled'

interface TweetCardProps {
  tweet: Tweet
}

export const TweetCard = ({ tweet: { createdBy, text, likedUserIds, imageURL, timestamp } }: TweetCardProps) => {
  const { uid } = useAppSelector((state) => state.user.user)
  const { photoURL, name, email } = createdBy
  const date = new Date(timestamp).toLocaleString('en-US', { month: 'long', day: 'numeric' })

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
      {uid === createdBy.uid && (
        <button>
          <span>...</span>
        </button>
      )}
      <TweetContent>
        <span>{text}</span>
        {imageURL && <img src={imageURL} />}
      </TweetContent>
      <Likes>{likedUserIds.length}</Likes>
    </StyledTweetCard>
  )
}
