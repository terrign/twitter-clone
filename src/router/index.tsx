import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { routes } from './routes'

export function Router() {
  return <RouterProvider router={createBrowserRouter(routes)} />
}
