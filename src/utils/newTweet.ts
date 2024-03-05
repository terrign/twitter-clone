import { Tweet } from '@models/index'

type NewTweet = Pick<Tweet, 'createdById' | 'imageURL' | 'text'>

export const newTweet = (newTweet: NewTweet): Tweet => {
  return {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    likedUserIds: [],
    ...newTweet,
  }
}
