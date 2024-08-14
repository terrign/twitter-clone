import { Providers } from '@context/Providers'
import { Router } from '@router/index'

export const App = () => {
  return (
    <Providers>
      <Router />
    </Providers>
  )
}
