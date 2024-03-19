import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { DEFAULT_CACHE_TIME_S } from '@constants/index'
import { Tweet } from '@models/index'
import { tweetService } from '@services/Tweets'

export const tweetsApi = createApi({
  reducerPath: 'tweetsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['tweetsByUserId', 'fetchTweet', 'fetchAllTweets'],
  keepUnusedDataFor: DEFAULT_CACHE_TIME_S,
  endpoints: (builder) => ({
    fetchTweetsByUserId: builder.query({
      async queryFn(uid: string) {
        const tweets = await tweetService.getTweetsByUserId(uid)

        return { data: tweets }
      },
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

        const tweet = await tweetService.getTweetById(tweetId)

        return { data: tweet }
      },
      providesTags: (result) => {
        return [{ type: 'fetchTweet', id: result?.id }]
      },
    }),

    addTweet: builder.mutation({
      async queryFn(tweet: Tweet) {
        await tweetService.createTweet(tweet)

        return { data: null }
      },

      async onQueryStarted(tweet, { dispatch, queryFulfilled }) {
        const patchFetchTweetsByUserId = dispatch(
          tweetsApi.util.updateQueryData('fetchTweetsByUserId', tweet.createdById, (draft) => {
            const index = draft.findIndex((existingTweet) => existingTweet.id === tweet.id)

            if (index === -1) {
              draft.unshift(tweet)
            }
          }),
        )

        const patchfetchAllTweets = dispatch(
          tweetsApi.util.updateQueryData('fetchAllTweets', {}, (draft) => {
            const index = draft.findIndex((existingTweet) => existingTweet.id === tweet.id)

            if (index === -1) {
              draft.unshift(tweet)
            }
          }),
        )

        try {
          await queryFulfilled
        } catch {
          patchFetchTweetsByUserId.undo()
          patchfetchAllTweets.undo()
        }
      },
    }),

    deleteTweet: builder.mutation({
      async queryFn({ tweetId }: { tweetId: string; userId: string }) {
        await tweetService.deleteTweet(tweetId)

        return { data: null }
      },

      async onQueryStarted({ tweetId, userId }, { dispatch, queryFulfilled }) {
        const patchFetchTweetsByUserId = dispatch(
          tweetsApi.util.updateQueryData('fetchTweetsByUserId', userId, (draft) => {
            const tweetIndex = draft.findIndex((tweet) => tweet.id === tweetId)

            if (tweetIndex !== -1) {
              draft.splice(tweetIndex, 1)
            }
          }),
        )

        const patchfetchAllTweets = dispatch(
          tweetsApi.util.updateQueryData('fetchAllTweets', {}, (draft) => {
            const tweetIndex = draft.findIndex((tweet) => tweet.id === tweetId)

            if (tweetIndex !== -1) {
              draft.splice(tweetIndex, 1)
            }
          }),
        )

        try {
          await queryFulfilled
          tweetsApi.util.invalidateTags([{ type: 'fetchTweet', id: tweetId }])
        } catch {
          patchFetchTweetsByUserId.undo()
          patchfetchAllTweets.undo()
        }
      },
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
          tweetsApi.util.updateQueryData('fetchAllTweets', {}, (draft) => {
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

            const likedUserIdIndex = draft[tweetIndex].likedUserIds.indexOf(uid)

            if (likedUserIdIndex === -1) {
              return
            }

            draft[tweetIndex].likedUserIds.splice(likedUserIdIndex, 1)
          }),
        )

        const patchFetchTweet = dispatch(
          tweetsApi.util.updateQueryData('fetchTweet', tweetId, (draft) => {
            const likedUserIdIndex = draft?.likedUserIds.indexOf(uid)

            if (likedUserIdIndex === -1 || likedUserIdIndex === undefined) {
              return
            }

            draft?.likedUserIds.splice(likedUserIdIndex, 1)
          }),
        )

        const patchFetchAllTweets = dispatch(
          tweetsApi.util.updateQueryData('fetchAllTweets', {}, (draft) => {
            const tweetIndex = draft.findIndex((tweet) => tweet.id === tweetId)

            if (tweetIndex === -1) {
              return
            }

            const likedUserIdIndex = draft[tweetIndex].likedUserIds.indexOf(uid)

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
  useLazySearchTweetQuery,
} = tweetsApi
