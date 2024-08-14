import { useEffect } from 'react'
import { Outlet } from 'react-router'
import { useLocation, useRevalidator } from 'react-router-dom'
import { Notification } from '@components/Notification'
import { authService } from '@services/Auth'
import { onAuthStateChanged } from 'firebase/auth'
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
      <Notification />
      <Outlet />
    </Main>
  )
}
