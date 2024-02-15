import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { routes } from './routes'
import { Route } from './types'

const Router = () => <RouterProvider router={createBrowserRouter(routes)} />

export { Route, Router }
