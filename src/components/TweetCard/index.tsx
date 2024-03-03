import { MouseEventHandler, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Like, LikeFilled } from '@assets'
import { useDebounceCallback } from '@hooks'
import { Route } from '@router'
import { useAppSelector, useLikeTweetMutation, useUnlikeTweetMutation } from '@store'
import { Tweet, UserInfo } from '@types'
import { Avatar, UserName } from '@ui'
import { getHumanMonthDayFromTimeStamp } from '@utils'
import { Menu } from './Menu'
import { CardHeader, Likes, StyledTweetCard, TweetAvatar, TweetContent } from './styled'

interface TweetCardProps {
  tweet: Tweet
  createdByInfo: UserInfo
}

export const TweetCard = ({
  tweet: { text, imageURL, likedUserIds, timestamp, id },
  createdByInfo,
}: TweetCardProps) => {
  const userId = useAppSelector((state) => state.user.user.uid)
  const { photoURL, name, email, uid } = createdByInfo

  const nav = useNavigate()

  const [likeTrigger] = useLikeTweetMutation()
  const [unlikeTrigger] = useUnlikeTweetMutation()

  const isReallyLiked = likedUserIds.includes(userId)

  const [liked, setLiked] = useState(isReallyLiked)
  const [likesCount, setLikesCount] = useState(likedUserIds.length)

  const date = getHumanMonthDayFromTimeStamp(timestamp)

  const toggleLike = (like: boolean) => {
    if (like && !isReallyLiked) {
      likeTrigger({ tweetId: id, uid: userId, tweetCreatedById: uid })
    } else if (!like && isReallyLiked) {
      unlikeTrigger({ tweetId: id, uid: userId, tweetCreatedById: uid })
    }
  }

  const toggleLikeDebounced = useDebounceCallback(toggleLike, 500)

  const likeClickHandler: MouseEventHandler<HTMLElement> = async () => {
    if (liked) {
      setLiked(false)
      setLikesCount((prevCount) => prevCount - 1)
    } else {
      setLiked(true)
      setLikesCount((prevCount) => prevCount + 1)
    }

    toggleLikeDebounced(!liked)
  }

  const toPostPageClickHandler = () => {
    nav(`${Route.POST}/${id}`)
  }

  return (
    <StyledTweetCard>
      <TweetAvatar>
        <Avatar photoURL={photoURL} size="s" />
      </TweetAvatar>
      <CardHeader>
        <UserName name={name} email={email} uid={uid} col date={date} link />
      </CardHeader>
      {userId === createdByInfo.uid && <Menu tweetId={id} />}
      <TweetContent onClick={toPostPageClickHandler}>
        <span>{text}</span>
        {imageURL && <img src={imageURL} />}
      </TweetContent>
      <Likes>
        <button onClick={likeClickHandler}>
          {liked ? <LikeFilled /> : <Like />}
          {likesCount}
        </button>
      </Likes>
    </StyledTweetCard>
  )
}
