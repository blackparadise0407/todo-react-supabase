import { User } from '@supabase/supabase-js'
import { ReactNode, createContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { routes } from '~/app/routes'
import { useUser } from '~/hooks'

interface AuthContext {
  user: User | null | undefined
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContext>({
  user: null,
})

const publicRoutes = [
  routes.login,
  routes.loginCredentials,
  routes.forgotPassword,
]

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { data, isFetching, isFetchedAfterMount } = useUser()

  useEffect(() => {
    if (!isFetchedAfterMount) {
      return
    }
    const isPublicRoute = publicRoutes.some((route) => pathname.includes(route))
    if (data && isPublicRoute) {
      navigate(routes.index)
    } else if (!data && !isPublicRoute) {
      navigate(routes.login)
    }
  }, [isFetchedAfterMount, data, pathname, navigate])

  if (isFetching) {
    return <>Loading...</>
  }

  return (
    <AuthContext.Provider
      value={{
        user: data,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
