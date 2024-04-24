import { useQuery } from '@tanstack/react-query'

import { listApi } from '~/libs/apis'
import { queryKeys } from '~/libs/query'

export const useList = (userId?: string) =>
  useQuery({
    queryKey: queryKeys.list(userId!),
    queryFn: () => listApi.getByUserId(userId!),
    enabled: !!userId,
  })
