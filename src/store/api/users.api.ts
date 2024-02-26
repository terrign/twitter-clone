// import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
// import { tweetService, userService } from '@services'

// export const tweetsApi = createApi({
//   reducerPath: 'usersapi',
//   baseQuery: fakeBaseQuery(),
//   tagTypes: ['tweetsCreatedByUsers'],
//   endpoints: (builder) => ({
//     fetchTweetCreatedByUsers: builder.query({
//       async queryFn(userIds: string[]) {
//         const users = await userService.getUsersByIds(userIds)

//         return { data: users }
//       },
//       providesTags: ['userTweets'],
//     }),
//   }),
// })

// export const { useFetchTweetsByUserIdQuery, useAddTweetMutation, useLikeTweetMutation, useUnlikeTweetMutation } =
//   tweetsApi
