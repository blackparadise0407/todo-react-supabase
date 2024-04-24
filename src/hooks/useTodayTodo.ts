import { useQuery } from '@tanstack/react-query'
import { todoApi } from '~/libs/apis'
import { queryKeys } from '~/libs/query'

export const useTodayTodo = (userId?: string) => {
  return useQuery({
    queryKey: queryKeys.todayTodo,
    queryFn: () => todoApi.getTodayTodos(userId!),
    enabled: !!userId,
  })
}
