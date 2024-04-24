import { useMutation } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FaArrowUp } from 'react-icons/fa'

import { useAuth, useList, useUser } from '~/hooks'
import { todoApi } from '~/libs/apis'

type Inputs = {
  title: string
}

export default function Main() {
  const { t } = useTranslation()
  const { watch, handleSubmit, register } = useForm<Inputs>()
  const { isPending, mutate } = useMutation({
    mutationFn: (title: string) => todoApi.create(title),
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data.title)
  }

  return (
    <div>
      Main application
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="input input-bordered input-primary flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder={t('enter_todo_title')}
            {...register('title')}
          />
          <button
            className="btn btn-circle btn-primary btn-sm"
            disabled={!watch('title') || isPending}
          >
            <FaArrowUp />
          </button>
        </label>
      </form>
    </div>
  )
}
