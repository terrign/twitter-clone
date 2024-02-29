import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { tweetService, userService } from '@services'

export const usersApi = createApi({
  reducerPath: 'usersapi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['userSuggestions', 'userById'],
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
      keepUnusedDataFor: 0.001,
    }),

    getUserById: builder.query({
      async queryFn(userId: string) {
        const user = userService.getUserById(userId)

        return { data: user }
      },
      providesTags: ['userById'],
      keepUnusedDataFor: 60,
    }),
  }),
})

export const { useGetUserSuggestionsQuery, useGetUserByIdQuery } = usersApi
