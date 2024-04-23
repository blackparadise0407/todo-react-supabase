import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '~/libs/query'

export const useQuote = () =>
  useQuery({
    queryKey: queryKeys.quote,
    queryFn: () =>
      fetch(
        'https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/today',
      )
        .then((resp) => resp.json())
        .then((res) => res[0] as { q: string; a: string; h: string }),
    staleTime: Infinity,
  })
