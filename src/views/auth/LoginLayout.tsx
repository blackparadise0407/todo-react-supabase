import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'

export default function Login() {
  const { t } = useTranslation()

  return (
    <div className="flex h-screen flex-col items-center justify-center overflow-hidden">
      <div className="flex w-full max-w-4xl gap-5 rounded-3xl bg-base-300 p-20 pl-0 shadow">
        <div className="flex grow flex-col items-center justify-center">
          <h1 className="text-xl font-bold">Todo</h1>
          <p className="text-5xl font-bold">{t('organize_it_all')}</p>
        </div>
        <div className="w-2/5 space-y-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
