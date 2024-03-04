import { LoaderFunction, redirect } from 'react-router-dom'
import { Route } from '../types'

export const profileLoader: LoaderFunction = async ({ params }) => {
  const { userId } = params

  if (!userId) {
    return redirect(Route.HOME)
  }

  return { userId }
}
