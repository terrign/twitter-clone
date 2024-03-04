import {
  tweetsApi,
  useAddTweetMutation,
  useDeleteTweetMutation,
  useFetchAllTweetsQuery,
  useFetchTweetQuery,
  useFetchTweetsByUserIdQuery,
  useLazySearchTweetQuery,
  useLikeTweetMutation,
  useSearchTweetQuery,
  useUnlikeTweetMutation,
} from './api/tweets.api'
import {
  useGetUserByIdQuery,
  useGetUsersByIdsQuery,
  useGetUserSuggestionsQuery,
  useLazySearchUsersQuery,
  usersApi,
} from './api/users.api'
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
  useLazySearchTweetQuery,
  useLazySearchUsersQuery,
  useLikeTweetMutation,
  usersApi,
  useSearchTweetQuery,
  useUnlikeTweetMutation,
}
