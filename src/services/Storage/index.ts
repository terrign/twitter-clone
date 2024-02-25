import { FirebaseStorage, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

import { app } from '../init'

class StorageService {
  public storage: FirebaseStorage = getStorage(app)
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
}

export const storageService = new StorageService()
