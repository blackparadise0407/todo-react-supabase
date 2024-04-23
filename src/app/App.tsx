import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Sidebar } from '~/components'
import { AuthContextProvider } from '~/contexts/AuthContext'

export default function App() {
  return (
    <Suspense fallback={null}>
      <AuthContextProvider>
        <div className="flex">
          <Sidebar />
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </AuthContextProvider>
    </Suspense>
  )
}
