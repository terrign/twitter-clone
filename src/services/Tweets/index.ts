import { store } from '@store'
import { Tweet } from '@types'
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'

import { Collection } from '../constants'
import { db } from '../init'

class TweetService {
  public db: Firestore = db
  private collection = Collection.TWEETS

  public createTweet = async ({ text, imageURL }: Pick<Tweet, 'imageURL' | 'text'>) => {
    const { uid } = store.getState().user.user
    const tweetId = crypto.randomUUID()

    const tweet: Tweet = {
      id: tweetId,
      createdById: uid,
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
      where('createdById', '==', userId),
      orderBy('timestamp', 'desc'),
    )

    const querySnap = await getDocs(tweetQuery)

    return querySnap.docs.map((tweet) => tweet.data()) as Tweet[]
  }

  public deleteTweet = async (tweetId: string) => {
    return deleteDoc(doc(this.db, this.collection, tweetId))
  }

  public likeTweet = async (tweetId: string, uid: string) => {
    return await updateDoc(doc(this.db, this.collection, tweetId), {
      likedUserIds: arrayUnion(uid),
    })
  }

  public unlikeTweet = async (tweetId: string, uid: string) => {
    return await updateDoc(doc(this.db, this.collection, tweetId), {
      likedUserIds: arrayRemove(uid),
    })
  }

  public getTweetByid = async (tweetId: string) => {
    return (await getDoc(doc(this.db, this.collection, tweetId))).data() as Tweet | undefined
  }

  public getSuggestedTweets = async (userId: string) => {
    const tweetQuery = query(
      collection(this.db, this.collection),
      where('imageURL', '!=', ''),
      orderBy('timestamp', 'desc'),
      limit(20),
    )

    const querySnap = await getDocs(tweetQuery)

    return (querySnap.docs.map((tweet) => tweet.data()) as Tweet[])
      .filter((tweet) => tweet.createdById !== userId)
      .slice(0, 6)
  }
}

export const tweetService = new TweetService()
