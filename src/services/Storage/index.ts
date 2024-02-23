import { setAlert, store } from '@store'
import { FirebaseStorage, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

import { app } from '../init'

class StorageService {
  public storage: FirebaseStorage = getStorage(app)
  public storageRef = ref(this.storage)

  public addBlob = (blob: Blob, onSuccess: (url: string) => void) => {
    const uploadTask = uploadBytesResumable(ref(this.storageRef, crypto.randomUUID()), blob)

    uploadTask.on(
      'state_changed',
      () => {},
      () => {
        store.dispatch(setAlert({ type: 'error', message: 'Upload failed. Please try again' }))
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          onSuccess(downloadURL)
        })
      },
    )
  }
}

export const storageService = new StorageService()
