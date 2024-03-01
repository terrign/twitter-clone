import { UserInfo } from '@types'
import { collection, doc, Firestore, getDoc, getDocs, limit, query, setDoc, where } from 'firebase/firestore'

import { Collection } from '../constants'
import { db } from '../init'

class UserService {
  public db: Firestore = db
  private collection = Collection.USERS

  public createUser = async (user: UserInfo) => {
    await setDoc(doc(this.db, this.collection, user.uid), user)

    return null
  }

  public getUserById = async (uid: string) => {
    const user = await getDoc(doc(this.db, this.collection, uid))

    return user.data() as UserInfo | undefined
  }

  public getUsersByIds = async (userIds: string[]) => {
    const userQuery = query(collection(this.db, this.collection), where('uid', 'in', userIds))
    const querySnap = await getDocs(userQuery)

    return querySnap.docs.map((user) => user.data()) as UserInfo[]
  }

  public getSuggestedUsers = async (userId: string) => {
    const userQuery = query(collection(this.db, this.collection), where('uid', '!=', userId), limit(4))
    const querySnap = await getDocs(userQuery)

    return querySnap.docs.map((tweet) => tweet.data()) as UserInfo[]
  }

  public updateUser = async (uid: string, userInfo: Partial<UserInfo>) => {
    await setDoc(doc(this.db, this.collection, uid), userInfo, { merge: true })

    return null
  }
}

export const userService = new UserService()
