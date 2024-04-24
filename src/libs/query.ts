import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

export const queryKeys = {
  currentUser: ['currentUser'],
  quote: ['quote'],
  list: (userId: string) => ['list', userId],
  todayTodo: ['todayTodo'],
}
