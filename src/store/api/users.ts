import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { DEFAULT_CACHE_TIME_S } from '@constants/index'
import { tweetService } from '@services/Tweets'
import { userService } from '@services/User'

export const usersApi = createApi({
  reducerPath: 'usersapi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['userSuggestions', 'user', 'userList'],
  keepUnusedDataFor: DEFAULT_CACHE_TIME_S,
  endpoints: (builder) => ({
    getUserSuggestions: builder.query({
      async queryFn(userId: string) {
        const [users, tweets] = await Promise.all([
          userService.getSuggestedUsers(userId),
          tweetService.getSuggestedTweets(userId),
        ])

        return { data: { users, tweets } }
      },
      providesTags: ['userSuggestions'],
    }),

    getUserById: builder.query({
      async queryFn(userId: string | undefined) {
        if (!userId) {
          return { data: null }
        }

        const user = await userService.getUserById(userId)

        return { data: user }
      },
      providesTags: ['user'],
    }),

    getUsersByIds: builder.query({
      async queryFn(userIds: string[]) {
        if (userIds.length === 0) {
          return { data: [] }
        }

        const users = await userService.getUsersByIds(userIds)

        return { data: users }
      },
      providesTags: ['userList'],
    }),

    searchUsers: builder.query({
      async queryFn(searchQuery: string) {
        const res = await userService.searchUsers(searchQuery)

        return { data: res }
      },
    }),
  }),
})

export const { useGetUserSuggestionsQuery, useGetUserByIdQuery, useGetUsersByIdsQuery, useLazySearchUsersQuery } =
  usersApi
