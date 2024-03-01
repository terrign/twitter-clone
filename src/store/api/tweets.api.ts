import { DEFAULT_CACHE_TIME_S } from '@constants'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { tweetService } from '@services'
import { Tweet } from '@types'

export const tweetsApi = createApi({
  reducerPath: 'tweets',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['userTweets', 'fetchTweet', 'fetchAllTweets'],
  keepUnusedDataFor: DEFAULT_CACHE_TIME_S,
  endpoints: (builder) => ({
    fetchTweetsByUserId: builder.query({
      async queryFn(uid: string) {
        const tweets = await tweetService.getTweetsByUserId(uid)

        return { data: tweets }
      },
      providesTags: ['userTweets'],
    }),

    fetchAllTweets: builder.query({
      async queryFn() {
        const tweets = await tweetService.getAllTweets()

        return { data: tweets }
      },
      providesTags: ['fetchAllTweets'],
    }),

    fetchTweet: builder.query({
      async queryFn(tweetId: string | undefined) {
        if (!tweetId) {
          return { data: null }
        }

        const tweet = await tweetService.getTweetByid(tweetId)

        return { data: tweet }
      },
      providesTags: ['fetchTweet'],
    }),

    addTweet: builder.mutation({
      async queryFn(tweet: Pick<Tweet, 'text' | 'imageURL' | 'createdById'>) {
        await tweetService.createTweet(tweet)

        return { data: null }
      },

      invalidatesTags: ['userTweets', 'fetchAllTweets'],
    }),

    deleteTweet: builder.mutation({
      async queryFn(tweetId: string) {
        await tweetService.deleteTweet(tweetId)

        return { data: null }
      },
      invalidatesTags: ['userTweets', 'fetchAllTweets'],
    }),

    likeTweet: builder.mutation({
      async queryFn({ tweetId, uid }: { tweetId: string; uid: string; tweetCreatedById: string }) {
        await tweetService.likeTweet(tweetId, uid)

        return { data: null }
      },
      async onQueryStarted({ tweetId, uid, tweetCreatedById }, { dispatch, queryFulfilled }) {
        const patchFetchTweetsByUserId = dispatch(
          tweetsApi.util.updateQueryData('fetchTweetsByUserId', tweetCreatedById, (draft) => {
            draft.find((tweet) => tweet.id === tweetId)?.likedUserIds.push(uid)
          }),
        )

        const patchFetchTweet = dispatch(
          tweetsApi.util.updateQueryData('fetchTweet', tweetId, (draft) => {
            draft?.likedUserIds.push(uid)
          }),
        )

        const patchfetchAllTweets = dispatch(
          tweetsApi.util.updateQueryData('fetchAllTweets', undefined, (draft) => {
            draft.find((tweet) => tweet.id === tweetId)?.likedUserIds.push(uid)
          }),
        )

        try {
          await queryFulfilled
        } catch {
          patchFetchTweetsByUserId.undo()
          patchFetchTweet.undo()
          patchfetchAllTweets.undo()
        }
      },
    }),

    unlikeTweet: builder.mutation({
      async queryFn({ tweetId, uid }: { tweetId: string; uid: string; tweetCreatedById: string }) {
        await tweetService.unlikeTweet(tweetId, uid)

        return { data: null }
      },
      async onQueryStarted({ tweetId, uid, tweetCreatedById }, { dispatch, queryFulfilled }) {
        const patchFetchTweetsByUserId = dispatch(
          tweetsApi.util.updateQueryData('fetchTweetsByUserId', tweetCreatedById, (draft) => {
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

        const patchFetchTweet = dispatch(
          tweetsApi.util.updateQueryData('fetchTweet', tweetId, (draft) => {
            const likedUserIdIndex = draft?.likedUserIds.findIndex((id) => id === uid)

            if (likedUserIdIndex === -1 || !likedUserIdIndex) {
              return
            }

            draft?.likedUserIds.splice(likedUserIdIndex, 1)
          }),
        )

        const patchFetchAllTweets = dispatch(
          tweetsApi.util.updateQueryData('fetchAllTweets', undefined, (draft) => {
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
          patchFetchTweetsByUserId.undo()
          patchFetchTweet.undo()
          patchFetchAllTweets.undo()
        }
      },
    }),

    searchTweet: builder.query({
      async queryFn(searchQuery: string) {
        const res = await tweetService.searchTweet(searchQuery)

        return { data: res }
      },
    }),
  }),
})

export const {
  useFetchTweetsByUserIdQuery,
  useAddTweetMutation,
  useLikeTweetMutation,
  useUnlikeTweetMutation,
  useFetchTweetQuery,
  useDeleteTweetMutation,
  useFetchAllTweetsQuery,
  useSearchTweetQuery,
} = tweetsApi
