import { useMutation } from '@tanstack/react-query'
import { todoApi } from '~/libs/apis'
import { queryClient, queryKeys } from '~/libs/query'

type TodoProps = {
  data: todoApi.Todo
}

export default function Todo({ data }: TodoProps) {
  const { isPending, mutate } = useMutation({
    mutationFn: (data: todoApi.Todo) => todoApi.toggleComplete(data),
  })

  const handleMarkComplete = () => {
    mutate(data, {
      onSuccess() {
        queryClient.setQueryData(
          queryKeys.todayTodo,
          (updater?: todoApi.Todo[]) => {
            const clone = (updater ?? []).slice()
            const foundIndex = clone.findIndex((it) => it.id === data.id)
            if (foundIndex > -1) {
              const newTodo: todoApi.Todo = {
                ...clone[foundIndex],
                is_complete: !clone[foundIndex].is_complete,
              }
              clone.splice(foundIndex, 1, newTodo)
              return clone
            }
            return updater
          },
        )
      },
    })
  }

  return (
    <div className="flex cursor-pointer gap-3 rounded border bg-base-100 p-3 shadow transition-colors hover:bg-base-200">
      <input
        type="checkbox"
        disabled={isPending}
        checked={data.is_complete}
        className="checkbox"
        onChange={handleMarkComplete}
      />
      <p>{data.title}</p>
    </div>
  )
}
