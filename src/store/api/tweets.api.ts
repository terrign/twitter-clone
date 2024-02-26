import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { tweetService } from '@services'
import { Tweet } from '@types'

export const tweetsApi = createApi({
  reducerPath: 'tweets',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['userTweets'],
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

    likeTweet: builder.mutation({
      async queryFn({ tweetId, uid }: { tweetId: string; uid: string }) {
        await tweetService.likeTweet(tweetId, uid)

        return { data: null }
      },
      async onQueryStarted({ tweetId, uid }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tweetsApi.util.updateQueryData('fetchTweetsByUserId', uid, (draft) => {
            draft.find((tweet) => tweet.id === tweetId)?.likedUserIds.push(uid)
          }),
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),

    unlikeTweet: builder.mutation({
      async queryFn({ tweetId, uid }: { tweetId: string; uid: string }) {
        await tweetService.unlikeTweet(tweetId, uid)

        return { data: null }
      },
      async onQueryStarted({ tweetId, uid }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tweetsApi.util.updateQueryData('fetchTweetsByUserId', uid, (draft) => {
            const tweetIndex = draft.findIndex((tweet) => tweet.id === tweetId)

            if (tweetIndex === -1) {
              return
            }

            const likedUserIdIndex = draft[tweetIndex].likedUserIds.findIndex((id) => id === uid)

            if (likedUserIdIndex === -1) {
              return
            }

            draft[tweetIndex].likedUserIds.splice(likedUserIdIndex, 1)
          }),
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),

    fetchTweet: builder.query({
      async queryFn(tweetId: string) {
        const tweet = await tweetService.getTweetByid(tweetId)

        return { data: tweet }
      },
    }),
  }),
})

export const { useFetchTweetsByUserIdQuery, useAddTweetMutation, useLikeTweetMutation, useUnlikeTweetMutation } =
  tweetsApi
