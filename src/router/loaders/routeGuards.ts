import { auth } from '@auth'
import { LoaderFunction, redirect } from 'react-router-dom'

import { Route } from '../types'

export const routeGuards: LoaderFunction = async ({ request }) => {
  const { pathname } = new URL(request.url)
  await auth.authStateReady()
  const user = auth.currentUser
  console.log(pathname)

  if (user) {
    return redirect(Route.PROFILE)
  }

  if (!user && (pathname === Route.PROFILE || pathname === Route.FEED)) {
    return redirect(Route.HOME)
  }

  if (user && (pathname === Route.SIGN_IN || pathname === Route.SIGN_UP || pathname === Route.HOME)) {
    return redirect(Route.PROFILE)
  }

  return null
}
