import { Alert } from '@components'
import { firebase } from '@services'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { Outlet } from 'react-router'
import { useRevalidator } from 'react-router-dom'

import { Main } from './styled'

export const Root = () => {
  const { revalidate } = useRevalidator()

  useEffect(() => {
    const listener = onAuthStateChanged(firebase.auth, async () => {
      revalidate()
    })

    return () => {
      listener()
    }
  }, [])

  return (
    <Main>
      <Alert />
      <Outlet />
    </Main>
  )
}
