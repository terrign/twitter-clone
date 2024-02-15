import { NotFound, Root } from '@pages'
import { lazy, Suspense } from 'react'
import { RouteObject } from 'react-router-dom'

import { guards } from './loaders/guards'
import { Route } from './types'

const Home = lazy(() => import('../pages').then((module) => ({ default: module['Home'] })))
const Feed = lazy(() => import('../pages').then((module) => ({ default: module['Feed'] })))
const Profile = lazy(() => import('../pages').then((module) => ({ default: module['Profile'] })))
const SignIn = lazy(() => import('../pages').then((module) => ({ default: module['SignIn'] })))
const SignUp = lazy(() => import('../pages').then((module) => ({ default: module['SignUp'] })))

export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Root />
      </Suspense>
    ),
    loader: guards,
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
