import { Router } from '@router'
import { useAppSelector } from '@store'

export const App = () => {
  const state = useAppSelector((state) => state.user)
  console.log(state)

  return <Router />
}
