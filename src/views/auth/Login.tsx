import { Provider } from '@supabase/supabase-js'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FaArrowRight, FaFacebookF, FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom'

import { routes } from '~/app/routes'
import { supabase } from '~/libs/supabase'

type Inputs = {
  email: string
}

export default function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { formState, watch, register, handleSubmit } = useForm<Inputs>({})

  const externalLogin = (provider: Provider) => {
    supabase.auth.signInWithOAuth({
      provider,
    })
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    navigate(routes.loginCredentials, {
      state: {
        email: data.email,
      },
    })
  }

  return (
    <>
      <button
        className="btn btn-primary w-full"
        onClick={() => externalLogin('google')}
      >
        <div className="aspect-square rounded-full bg-white p-1">
          <FcGoogle className="text-xl" />
        </div>
        {t('continue_with_google')}
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="input input-bordered input-primary flex items-center gap-2">
          <input
            type="email"
            className="grow"
            placeholder={t('enter_your_email')}
            {...register('email')}
          />
          <button
            type="submit"
            disabled={!formState.isValid || !watch('email')}
            className="btn btn-circle btn-primary btn-sm"
          >
            <FaArrowRight />
          </button>
        </label>
      </form>
      <div className="divider">{t('or')}</div>
      <div className="flex gap-5">
        <button className="btn flex-1" onClick={() => externalLogin('github')}>
          <FaGithub className="text-xl" />
        </button>
        <button
          className="btn flex-1"
          onClick={() => externalLogin('facebook')}
        >
          <FaFacebookF className="text-xl" />
        </button>
      </div>
      <section className="text-center text-sm">
        {t('by_using_todo_you_accept_our')}
        <br />
        <Link
          to={routes.termOfService}
          className="link-hover link link-secondary"
        >
          {t('term_of_service')}
        </Link>
        &nbsp;and&nbsp;
        <Link
          to={routes.privacyPolicy}
          className="link-hover link link-secondary"
        >
          {t('privacy_policy')}
        </Link>
      </section>
    </>
  )
}
