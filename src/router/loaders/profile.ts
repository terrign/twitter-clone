import { store, usersApi } from '@store'
import { UserInfo } from '@types'
import { LoaderFunction, redirect } from 'react-router-dom'

import { Route } from '../types'

export const profileLoader: LoaderFunction = async ({ request }) => {
  const { pathname } = new URL(request.url)

  const userId = pathname.split('/')[2]

  let user: UserInfo | '' | undefined = store.getState().user.user

  if (userId !== user.uid) {
    const userPromise = store.dispatch(usersApi.endpoints.getUserById.initiate(userId))
    const { data } = await userPromise
    userPromise.unsubscribe()

    if (!data) {
      return redirect(Route.HOME)
    }

    user = data
  }

  return { userId }
}
