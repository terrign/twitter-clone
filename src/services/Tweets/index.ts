import { Tweet } from '@models/index'
import {
  and,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  limit,
  or,
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

  public createTweet = async (tweet: Tweet) => {
    await setDoc(doc(this.db, this.collection, tweet.id), tweet)

    return tweet
  }

  public getAllTweets = async () => {
    const tweetQuery = query(collection(this.db, this.collection), orderBy('timestamp', 'desc'))
    const querySnap = await getDocs(tweetQuery)

    return querySnap.docs.map((tweet) => tweet.data()) as Tweet[]
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
    await deleteDoc(doc(this.db, this.collection, tweetId))

    return null
  }

  public likeTweet = async (tweetId: string, uid: string) => {
    await updateDoc(doc(this.db, this.collection, tweetId), {
      likedUserIds: arrayUnion(uid),
    })

    return null
  }

  public unlikeTweet = async (tweetId: string, uid: string) => {
    await updateDoc(doc(this.db, this.collection, tweetId), {
      likedUserIds: arrayRemove(uid),
    })

    return null
  }

  public getTweetByid = async (tweetId: string) => {
    return (await getDoc(doc(this.db, this.collection, tweetId))).data() as Tweet | undefined
  }

  public getSuggestedTweets = async (userId: string) => {
    const tweetQuery = query(collection(this.db, this.collection), where('imageURL', '!=', ''), limit(20))

    const querySnap = await getDocs(tweetQuery)

    return querySnap.docs
      .map((tweet) => tweet.data())
      .filter((tweet) => tweet.createdById !== userId)
      .slice(0, 6) as Tweet[]
  }

  public searchTweet = async (queryString: string) => {
    const tweetQuery = query(
      collection(this.db, this.collection),
      or(
        and(where('text', '>=', queryString), where('text', '<=', queryString + '\uf8ff')),
        and(
          where('text', '>=', queryString.charAt(0).toUpperCase() + queryString.slice(1)),
          where('text', '<=', queryString.charAt(0).toUpperCase() + queryString.slice(1) + '\uf8ff'),
        ),
        and(where('text', '>=', queryString.toLowerCase()), where('text', '<=', queryString.toLowerCase() + '\uf8ff')),
      ),
    )

    const querySnap = await getDocs(tweetQuery)

    return querySnap.docs.map((tweet) => tweet.data()) as Tweet[]
  }
}

export const tweetService = new TweetService()
