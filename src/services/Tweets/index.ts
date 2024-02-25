import { store } from '@store'
import { Tweet } from '@types'
import { collection, deleteDoc, doc, Firestore, getDocs, orderBy, query, setDoc, where } from 'firebase/firestore'

import { Collection } from '../constants'
import { db } from '../init'

class TweetService {
  public db: Firestore = db
  private collection = Collection.TWEETS

  public createTweet = async ({ text, imageURL }: Pick<Tweet, 'imageURL' | 'text'>) => {
    const createdBy = store.getState().user.user
    const tweetId = crypto.randomUUID()

    const tweet: Tweet = {
      id: tweetId,
      createdBy,
      likedUserIds: [],
      imageURL,
      text,
      timestamp: Date.now(),
    }

    await setDoc(doc(this.db, this.collection, tweetId), tweet)
  }

  public getTweetsByUserId = async (userId: string) => {
    const tweetQuery = query(
      collection(this.db, this.collection),
      where('createdBy.uid', '==', userId),
      orderBy('timestamp', 'desc'),
    )

    const querySnap = await getDocs(tweetQuery)

    return querySnap.docs.map((tweet) => tweet.data()) as Tweet[]
  }

  public deleteTweet = async (tweetId: string) => {
    return deleteDoc(doc(this.db, this.collection, tweetId))
  }
}

export const tweetService = new TweetService()
