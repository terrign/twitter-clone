import { FirebaseStorage, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

import { storage } from '../init'

class StorageService {
  public storage: FirebaseStorage = storage
  public storageRef = ref(this.storage)

  public addFile = async (file: File) => {
    try {
      const uploadTask = await uploadBytesResumable(ref(this.storageRef, crypto.randomUUID()), file)

      const url = await getDownloadURL(uploadTask.ref)

      return url
    } catch (e) {
      return new Error('Upload failed, please try again')
    }
  }

  public addUserAvatar = async (file: File, uid: string) => {
    try {
      const uploadTask = await uploadBytesResumable(ref(this.storageRef, uid), file)

      const url = await getDownloadURL(uploadTask.ref)

      return url
    } catch (e) {
      return new Error('Upload failed, please try again')
    }
  }
}

export const storageService = new StorageService()
