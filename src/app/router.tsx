import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import App from './App'
import { routes } from './routes'
import { Layout } from '~/layouts'

const Login = lazy(() => import('~/views/auth/Login'))
const LoginLayout = lazy(() => import('~/views/auth/LoginLayout'))
const LoginCredentials = lazy(() => import('~/views/auth/LoginCredentials'))
const ForgotPassword = lazy(() => import('~/views/auth/ForgotPassword'))
const Main = lazy(() => import('~/views/main/Main'))

export const router = createBrowserRouter([
  {
    path: '',
    Component: App,
    children: [
      {
        path: routes.index,
        Component: Layout,
        children: [
          {
            index: true,
            Component: Main,
          },
        ],
      },
      {
        path: routes.auth,
        Component: LoginLayout,
        children: [
          {
            path: routes.login,
            Component: Login,
          },
          {
            path: routes.loginCredentials,
            Component: LoginCredentials,
          },
          {
            path: routes.forgotPassword,
            Component: ForgotPassword,
          },
        ],
      },
      {
        path: '*',
        element: <>NOt found</>,
      },
    ],
  },
])
