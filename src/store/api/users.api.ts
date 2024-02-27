import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { tweetService, userService } from '@services'

export const usersApi = createApi({
  reducerPath: 'usersapi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['userSuggestions'],
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
      keepUnusedDataFor: 0.0001,
    }),
  }),
})

export const { useGetUserSuggestionsQuery } = usersApi
