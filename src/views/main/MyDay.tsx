import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import i18next from 'i18next'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FaArrowUp } from 'react-icons/fa'
import { Todo } from '~/components'
import { useAuth, useList, useTodayTodo } from '~/hooks'

import { todoApi } from '~/libs/apis'

type Inputs = {
  title: string
}

export default function MyDay() {
  const { t } = useTranslation()

  const { watch, handleSubmit, register } = useForm<Inputs>()
  const { user } = useAuth()
  const { data: list } = useList(user?.id)
  const { isPending, mutate } = useMutation({
    mutationFn: (payload: todoApi.CreateRQ) => todoApi.create(payload),
  })
  const { data: todos } = useTodayTodo(user?.id)
  const [today] = useState(dayjs())

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const defaultList = list?.find((it) => it.is_default)
    if (defaultList) {
      mutate({
        title: data.title,
        list_id: defaultList.id,
      })
    }
  }

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">
        Good evening, {user?.user_metadata.name}
      </h1>
      <div className="flex">
        <div className="text-center">
          <p className="text-sm font-semibold text-accent">
            {today
              .toDate()
              .toLocaleString(i18next.language, { weekday: 'short' })}
          </p>
          <p className="text-4xl font-bold leading-7">{today.date()}</p>
          <p className="text-sm text-accent">
            {today.toDate().toLocaleString(i18next.language, { month: 'long' })}
          </p>
        </div>
      </div>
      <ul className="space-y-5">
        {todos?.map((it) => <Todo key={it.id} data={it} />)}
      </ul>
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
