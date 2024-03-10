import { MouseEventHandler, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Like, LikeFilled } from '@assets/index'
import { Avatar, AvatarSize } from '@components/UI/Avatar'
import { UserName } from '@components/UI/UserName'
import { useBooleanState } from '@hooks/useBooleanState'
import { useDebounceCallback } from '@hooks/useDebounceCallback'
import { Tweet, UserInfo } from '@models/index'
import { Route } from '@router/types'
import { useLikeTweetMutation, useUnlikeTweetMutation } from '@store/api/tweets'
import { useAppSelector } from '@store/index'
import { selectUser } from '@store/slices/user'
import { getHumanMonthDayFromTimeStamp } from '@utils/date'
import { Menu } from './Menu'
import { CardHeader, Likes, StyledTweetCard, TweetAvatar, TweetContent } from './styled'

interface Props {
  tweet: Tweet
  createdByInfo: UserInfo
  compact?: boolean
}

export const TweetCard = (props: Props) => {
  const {
    tweet: { text, imageURL, likedUserIds, timestamp, id },
    createdByInfo,
    compact,
  } = props

  const userId = useAppSelector(selectUser).uid
  const { photoURL, name, email, uid } = createdByInfo

  const navigate = useNavigate()

  const [likeTrigger] = useLikeTweetMutation()
  const [unlikeTrigger] = useUnlikeTweetMutation()

  const isReallyLiked = likedUserIds.includes(userId)

  const [liked, , like, unlike] = useBooleanState(isReallyLiked)
  const [likesCount, setLikesCount] = useState(likedUserIds.length)

  const date = getHumanMonthDayFromTimeStamp(timestamp)

  const toggleLike = (like: boolean) => {
    if (like && !isReallyLiked) {
      likeTrigger({ tweetId: id, uid: userId, tweetCreatedById: uid })
    } else if (!like && isReallyLiked) {
      unlikeTrigger({ tweetId: id, uid: userId, tweetCreatedById: uid })
    }
  }

  const [toggleLikeDebounced] = useDebounceCallback(toggleLike, 500)

  const likeClickHandler: MouseEventHandler<HTMLElement> = async () => {
    if (liked) {
      unlike()
      setLikesCount((prevCount) => prevCount - 1)
    } else {
      like()
      setLikesCount((prevCount) => prevCount + 1)
    }

    toggleLikeDebounced(!liked)
  }

  const toPostPageClickHandler = () => {
    navigate(`${Route.POST}/${id}`)
  }

  return (
    <StyledTweetCard $compact={compact}>
      <TweetAvatar $compact={compact}>
        <Avatar photoURL={photoURL} size={AvatarSize.SMALL} />
      </TweetAvatar>
      <CardHeader>
        <UserName name={name} email={email} uid={uid} col date={date} link />
      </CardHeader>
      {userId === createdByInfo.uid && !compact && <Menu tweetId={id} />}
      <TweetContent onClick={toPostPageClickHandler} $compact={compact}>
        <span>{text}</span>
        {imageURL && <img src={imageURL} loading="lazy" alt="image" />}
      </TweetContent>
      <Likes $compact={compact}>
        <button onClick={likeClickHandler} name="likeButton">
          {liked ? <LikeFilled /> : <Like />}
          {likesCount}
        </button>
      </Likes>
    </StyledTweetCard>
  )
}
