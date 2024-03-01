import { store, tweetsApi } from '@store'
import { LoaderFunction, redirect } from 'react-router-dom'

import { Route } from '../types'

export const postLoader: LoaderFunction = async ({ request }) => {
  const { pathname } = new URL(request.url)
  const tweetId = pathname.split('/')[2]

  const tweetPromise = store.dispatch(
    tweetsApi.endpoints.fetchTweet.initiate(tweetId, {
      subscribe: false,
      forceRefetch: true,
    }),
  )

  const tweetRes = await tweetPromise

  if (!tweetRes.data) {
    return redirect(Route.HOME)
  }

  return { tweetId, createdById: tweetRes.data.createdById }
}
