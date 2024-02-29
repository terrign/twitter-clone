import { store, tweetsApi, usersApi } from '@store'
import { LoaderFunction, redirect } from 'react-router-dom'

import { Route } from '../types'

export const postLoader: LoaderFunction = async ({ request }) => {
  const { pathname } = new URL(request.url)
  const tweetPromise = store.dispatch(tweetsApi.endpoints.fetchTweet.initiate(pathname.replace(/^\/post\//, '')))
  const tweetRes = await tweetPromise

  if (!tweetRes.data) {
    redirect(Route.HOME)
    tweetPromise.unsubscribe()

    return null
  }

  const userPromise = store.dispatch(usersApi.endpoints.getUserById.initiate(tweetRes.data.createdById))
  const userRes = await userPromise
  userPromise.unsubscribe()

  return { tweet: tweetRes.data, user: userRes.data }
}
