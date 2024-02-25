import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { tweetService } from '@services'
import { Tweet } from '@types'

export const tweetsApi = createApi({
  reducerPath: 'tweets',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['userTweets'],
  keepUnusedDataFor: 60,
  endpoints: (builder) => ({
    fetchTweetsByUserId: builder.query({
      async queryFn(uid: string) {
        const tweets = await tweetService.getTweetsByUserId(uid)

        return { data: tweets }
      },
      providesTags: ['userTweets'],
    }),
    addTweet: builder.mutation({
      async queryFn(tweet: Pick<Tweet, 'text' | 'imageURL'>) {
        await tweetService.createTweet(tweet)

        return { data: null }
      },
      invalidatesTags: ['userTweets'],
    }),
  }),
})

export const { useFetchTweetsByUserIdQuery, useAddTweetMutation } = tweetsApi
