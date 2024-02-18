import { firebase } from '@services'
import { LoaderFunction, redirect } from 'react-router-dom'

import { Route } from '../types'

const isPrivateRoute = (route: Route | string) => {
  if (route === Route.PROFILE || route === Route.FEED) {
    return true
  }

  return false
}

const isAuthRoute = (route: Route | string) => {
  if (route === Route.SIGN_IN || route === Route.SIGN_UP || route === Route.HOME) {
    return true
  }

  return false
}

export const guards: LoaderFunction = async ({ request }) => {
  const { pathname } = new URL(request.url)

  await firebase.auth.authStateReady()
  const user = firebase.auth.currentUser

  if (!user && isPrivateRoute(pathname)) {
    return redirect(Route.HOME)
  }

  if (user && isAuthRoute(pathname)) {
    return redirect(Route.PROFILE)
  }

  return null
}
