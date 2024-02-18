// import { User } from '@types'
// import { initializeApp } from 'firebase/app'
// import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
// import { addDoc, collection, getFirestore } from 'firebase/firestore'

// const firebaseConfig = {
//   apiKey: import.meta.env.APP_API_KEY,
//   authDomain: import.meta.env.APP_AUTH_DOMAIN,
//   projectId: import.meta.env.APP_PROJECT_ID,
//   storageBucket: import.meta.env.APP_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.APP_MESSAGING_SENDER_ID,
//   appId: import.meta.env.APP_ID,
//   measurementId: import.meta.env.APP_MEASUREMENT_ID,
// }

// const app = initializeApp(firebaseConfig)

// const auth = getAuth(app)

// const db = getFirestore(app)

// const googleProvider = new GoogleAuthProvider()

// googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly')

// const login = async () => {
//   const res = await signInWithRedirect(auth, googleProvider)
//     .then((result) => {
//       const credential = GoogleAuthProvider.credentialFromResult(result)
//       console.log(result, credential)
//     })
//     .catch((error) => {
//       error
//     })

//   console.log(res)

//   return res
// }

// const saveUserToDb = async (user: User) => {
//   addDoc(collection(db, 'users'), {
//     uid: user.uid,
//     name: user.name,
//     authProvider: 'google',
//     email: user.email,
//   })
// }

// export { app, auth, db, googleProvider, login, saveUserToDb }

// // connectAuthEmulator(getAuth(app), 'http://127.0.0.1:9099', { disableWarnings: true })

// // connectFirestoreEmulator(db, 'http://127.0.0.1', 9000)

import { firebase } from './Firebase.service'

export { firebase }
