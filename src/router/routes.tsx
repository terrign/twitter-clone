import { lazy, Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import { EditProfile, NotFound, Post, PrivateRoot, Root, TempRoute } from '@pages'
import { Loader } from '@ui'
import { guards } from './loaders/guards'
import { postLoader } from './loaders/post'
import { profileLoader } from './loaders/profile'
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
      <Suspense fallback={<Loader h="100vh" w="100%" />}>
        <Root />
      </Suspense>
    ),
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
            path: `${Route.PROFILE}/:userId`,
            element: <Profile />,
            loader: profileLoader,
            children: [{ path: `${Route.PROFILE}/:userId/edit`, element: <EditProfile /> }],
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
            path: `${Route.POST}/:tweetId`,
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
