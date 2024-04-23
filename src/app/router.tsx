import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import App from './App'
import { routes } from './routes'

const Login = lazy(() => import('~/views/auth/Login'))
const Main = lazy(() => import('~/views/main/Main'))

export const router = createBrowserRouter([
  {
    path: routes.index,
    Component: App,
    children: [
      {
        index: true,
        Component: Main,
      },
      {
        path: routes.login,
        Component: Login,
      },
    ],
  },
])
