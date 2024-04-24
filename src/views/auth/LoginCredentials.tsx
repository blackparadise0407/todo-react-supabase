import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaCheck } from 'react-icons/fa'
import { useEffect } from 'react'

import { routes } from '~/app/routes'
import { supabase } from '~/libs/supabase'
import { useMutation } from '@tanstack/react-query'
import { queryClient, queryKeys } from '~/libs/query'

type Inputs = {
  email: string
  password: string
}

export default function LoginCredentials() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { register, handleSubmit, setValue } = useForm<Inputs>()
  const { isPending, mutate } = useMutation({
    mutationFn: (data: Inputs) =>
      supabase.auth.signInWithPassword(data).then(({ data, error }) => {
        if (error) {
          throw error
        }
        return data.user
      }),
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data, {
      onSuccess(user) {
        queryClient.setQueryData(queryKeys.currentUser, user)
        navigate(routes.index)
      },
    })
  }

  useEffect(() => {
    if (state?.email) {
      setValue('email', state.email)
    }
  }, [state?.email, setValue])

  if (!state?.email) {
    return <Navigate to={routes.login} />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link to={routes.login}>
          <FaArrowLeft />
        </Link>
        <div className="grow"></div>
        <h1 className="text-lg font-bold">{t('welcome_back')}</h1>
        <div className="grow"></div>
        <div className="w-4 shrink-0"></div>
      </div>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <label className="input input-bordered input-primary flex w-full items-center gap-2">
          <input
            readOnly
            type="email"
            className="grow"
            placeholder={t('enter_your_email')}
            {...register('email')}
          />
          <FaCheck className="text-success" />
        </label>
        <input
          type="password"
          className="input input-bordered input-primary w-full"
          placeholder={t('enter_your_password')}
          {...register('password')}
        />
        <Link
          to={routes.forgotPassword}
          className="link-hover link link-primary block text-center"
        >
          {t('forgot_password')}
        </Link>
        <button className="btn btn-primary w-full" disabled={isPending}>
          {t('login')}
        </button>
      </form>
    </div>
  )
}
