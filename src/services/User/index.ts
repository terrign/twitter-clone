import { UserInfo } from '@types'
import { collection, doc, Firestore, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore'

import { Collection } from '../constants'
import { db } from '../init'

class UserService {
  public db: Firestore = db
  private collection = Collection.USERS

  public createUser = async (user: UserInfo) => await setDoc(doc(this.db, this.collection, user.uid), user)

  public getUserById = async (uid: string) => (await getDoc(doc(this.db, this.collection, uid))).data()

  public getUsersByIds = async (userIds: string[]) => {
    const userQuery = query(collection(this.db, this.collection), where('uid', 'in', userIds))
    const querySnap = await getDocs(userQuery)

    return querySnap.docs.map((tweet) => tweet.data()) as UserInfo[]
  }

  public updateUser = async (uid: string, userInfo: Partial<UserInfo>) =>
    await setDoc(doc(this.db, this.collection, uid), userInfo, { merge: true })
}

export const userService = new UserService()
