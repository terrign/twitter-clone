import { DEFAULT_CACHE_TIME_S } from '@constants'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { tweetService, userService } from '@services'

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
        const users = await userService.getUsersByIds(userIds)

        return { data: users }
      },
      providesTags: ['userList'],
    }),
  }),
})

export const { useGetUserSuggestionsQuery, useGetUserByIdQuery, useGetUsersByIdsQuery } = usersApi
