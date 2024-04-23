import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '~/libs/query'
import { supabase } from '~/libs/supabase'

export const useUser = () =>
  useQuery({
    queryKey: queryKeys.currentUser,
    queryFn: () =>
      supabase.auth.getUser().then(({ data, error }) => {
        if (error) {
          throw error
        }
        return data.user
      }),
  })
