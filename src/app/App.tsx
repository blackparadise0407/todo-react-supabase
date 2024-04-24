import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { AuthContextProvider } from '~/contexts/AuthContext'

export default function App() {
  return (
    <Suspense fallback={null}>
      <AuthContextProvider>
        <Outlet />
      </AuthContextProvider>
    </Suspense>
  )
}
