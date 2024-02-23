import { authService } from '@services'
import { LoaderFunction, redirect } from 'react-router-dom'

import { Route } from '../types'

const PRIVATE_ROUTES: (Route | string)[] = [Route.PROFILE, Route.HOME, Route.EDIT, Route.TODO]

const PUBLIC_ROUTES: (Route | string)[] = [Route.SIGN_IN, Route.SIGN_UP, Route.WELCOME]

const isPrivateRoute = (path: Route | string) => PRIVATE_ROUTES.includes(path)

const isPublicRoute = (path: Route | string) => PUBLIC_ROUTES.includes(path)

export const guards: LoaderFunction = async ({ request }) => {
  const { pathname } = new URL(request.url)

  await authService.auth.authStateReady()
  const user = authService.auth.currentUser

  if (!user && isPrivateRoute(pathname)) {
    return redirect(Route.WELCOME)
  }

  if (user && isPublicRoute(pathname)) {
    return redirect(Route.PROFILE)
  }

  return null
}
