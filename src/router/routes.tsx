import { ErrorBoundary } from '@components'
import { EditProfile, NotFound, Post, PrivateRoot, Root, TempRoute } from '@pages'
import { lazy, Suspense } from 'react'
import { RouteObject } from 'react-router-dom'

import { guards } from './loaders/guards'
import { postLoader } from './loaders/post'
import { Route } from './types'

const Welcome = lazy(() => import('../pages').then((module) => ({ default: module['Welcome'] })))
const Home = lazy(() => import('../pages').then((module) => ({ default: module['Home'] })))
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
    errorElement: <ErrorBoundary />,
    loader: guards,
    children: [
      {
        path: Route.WELCOME,
        element: <Welcome />,
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
        path: '',
        element: <PrivateRoot />,
        children: [
          {
            path: Route.PROFILE,
            element: <Profile />,
            children: [{ path: Route.EDIT, element: <EditProfile /> }],
          },
          {
            path: Route.HOME,
            element: <Home />,
          },
          {
            path: Route.TODO,
            element: <TempRoute />,
          },
          {
            path: `${Route.POST}/:id`,
            element: <Post />,
            loader: postLoader,
          },
        ],
      },
    ],
  },
  {
    path: '/*',
    element: <NotFound />,
  },
]
