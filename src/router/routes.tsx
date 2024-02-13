import { ErrorBoundary } from '@components'
import { Feed, Home, NotFound, Profile, Root, SignIn, SignUp } from '@pages'
import { Suspense } from 'react'
import { RouteObject } from 'react-router-dom'

import { Route } from './types'

export const routes: RouteObject[] = [
  {
    path: Route.HOME,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary>
          <Root />
        </ErrorBoundary>
      </Suspense>
    ),
    children: [
      {
        path: Route.HOME,
        element: <Home />,
      },
      {
        path: Route.SIGN_IN,
        element: <SignIn />,
      },
      {
        path: Route.SIGN_UP,
        element: <SignUp />,
      },
      {
        path: Route.PROFILE,
        element: <Profile />,
      },
      {
        path: Route.FEED,
        element: <Feed />,
      },
    ],
  },
  {
    path: '/*',
    element: <NotFound />,
  },
]
