import {
  tweetsApi,
  useAddTweetMutation,
  useDeleteTweetMutation,
  useFetchAllTweetsQuery,
  useFetchTweetQuery,
  useFetchTweetsByUserIdQuery,
  useLikeTweetMutation,
  useSearchTweetQuery,
  useUnlikeTweetMutation,
} from './api/tweets.api'
import { useGetUserByIdQuery, useGetUsersByIdsQuery, useGetUserSuggestionsQuery, usersApi } from './api/users.api'
import { removeAlert, setAlert } from './slices/alert'
import { signInWithEmail, signOut, signUpWithEmail, signUpWithGoogle, updatePassword } from './slices/auth'
import { setUser, switchTheme, updateUser } from './slices/user'
import { type AppDispatch, persistor, type RootState, store, useAppDispatch, useAppSelector } from './store'

export {
  type AppDispatch,
  persistor,
  removeAlert,
  type RootState,
  setAlert,
  setUser,
  signInWithEmail,
  signOut,
  signUpWithEmail,
  signUpWithGoogle,
  store,
  switchTheme,
  tweetsApi,
  updatePassword,
  updateUser,
  useAddTweetMutation,
  useAppDispatch,
  useAppSelector,
  useDeleteTweetMutation,
  useFetchAllTweetsQuery,
  useFetchTweetQuery,
  useFetchTweetsByUserIdQuery,
  useGetUserByIdQuery,
  useGetUsersByIdsQuery,
  useGetUserSuggestionsQuery,
  useLikeTweetMutation,
  usersApi,
  useSearchTweetQuery,
  useUnlikeTweetMutation,
}
