import { lazy, Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import { Loader } from '@components/UI/Loader'
import { NotFound } from '@pages/NotFound'
import { PrivateRoot } from '@pages/PrivateRoot'
import { EditProfile } from '@pages/PrivateRoot/EditProfile'
import { Post } from '@pages/PrivateRoot/Post'
import { TempRoute } from '@pages/TempRoute'
import { guards } from './loaders/guards'
import { postLoader } from './loaders/post'
import { profileLoader } from './loaders/profile'
import { Route } from './types'

const Welcome = lazy(() => import('../pages/Welcome').then((module) => ({ default: module['Welcome'] })))
const Home = lazy(() => import('../pages/PrivateRoot/Home').then((module) => ({ default: module['Home'] })))
const Profile = lazy(() => import('../pages/PrivateRoot/Profile').then((module) => ({ default: module['Profile'] })))
const SignIn = lazy(() => import('../pages/SignIn').then((module) => ({ default: module['SignIn'] })))
const SignUp = lazy(() => import('../pages/SignUp').then((module) => ({ default: module['SignUp'] })))
const Root = lazy(() => import('../pages/Root').then((module) => ({ default: module['Root'] })))

export const routes: RouteObject[] = [
  {
    path: Route.WELCOME,
    element: (
      <Suspense fallback={<Loader h="100%" w="100%" />}>
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
        path: Route.WELCOME,
        element: <PrivateRoot />,
        children: [
          {
            path: `${Route.PROFILE}/:userId`,
            element: <Profile />,
            loader: profileLoader,
            children: [{ path: `${Route.PROFILE}/:userId${Route.EDIT}`, element: <EditProfile /> }],
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
    path: Route.NOT_FOUND,
    element: <NotFound />,
  },
]
