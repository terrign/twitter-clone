import { LoaderFunction, redirect } from 'react-router-dom'
import { Route } from '../types'

export const postLoader: LoaderFunction = async ({ params }) => {
  const { tweetId } = params

  if (!tweetId) {
    return redirect(Route.HOME)
  }

  return null
}
