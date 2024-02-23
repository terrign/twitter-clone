import { Alert } from '@components'
import { authService } from '@services'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { Outlet } from 'react-router'
import { useLocation, useRevalidator } from 'react-router-dom'

import { Main } from './styled'

export const Root = () => {
  const { revalidate } = useRevalidator()
  const { pathname } = useLocation()

  useEffect(() => {
    const listener = onAuthStateChanged(authService.auth, async () => {
      revalidate()
    })

    return () => {
      listener()
    }
  }, [])

  useEffect(() => {
    revalidate()
  }, [pathname])

  return (
    <Main>
      <Alert />
      <Outlet />
    </Main>
  )
}
