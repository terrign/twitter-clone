import { FirebaseStorage, getDownloadURL, list, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../init'

const ERROR_MESSAGE = 'Upload failed, please try again'

class StorageService {
  public storage: FirebaseStorage = storage
  public storageRef = ref(this.storage)

  public addFile = async (file: File) => {
    try {
      const uploadTask = await uploadBytesResumable(ref(this.storageRef, crypto.randomUUID()), file)

      const url = await getDownloadURL(uploadTask.ref)

      return url
    } catch (e) {
      return new Error(ERROR_MESSAGE)
    }
  }

  public addUserAvatar = async (file: File, uid: string) => {
    try {
      const uploadTask = await uploadBytesResumable(ref(this.storageRef, uid), file)

      const url = await getDownloadURL(uploadTask.ref)

      return url
    } catch (e) {
      return new Error(ERROR_MESSAGE)
    }
  }

  public getSuggestedImages = async () => {
    const fileList = await list(this.storageRef, { maxResults: 6 })

    return fileList.items.map((item) => item.toString().replace(/^gs/gi, 'https'))
  }
}

export const storageService = new StorageService()
