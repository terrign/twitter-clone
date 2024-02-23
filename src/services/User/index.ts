import { UserInfo } from '@types'
import { doc, Firestore, getDoc, getFirestore, setDoc } from 'firebase/firestore'

import { Collection } from '../constants'
import { app } from '../init'

class UserService {
  public db: Firestore = getFirestore(app)
  private collection = Collection.USERS

  public createUser = async (user: UserInfo) => await setDoc(doc(this.db, this.collection, user.uid), user)

  public getUserById = async (uid: string) => (await getDoc(doc(this.db, this.collection, uid))).data()

  public updateUser = async (uid: string, userInfo: Partial<UserInfo>) =>
    await setDoc(doc(this.db, this.collection, uid), userInfo, { merge: true })
}

export const userService = new UserService()
