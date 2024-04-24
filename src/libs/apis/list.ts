import { supabase } from '../supabase'

export interface List {
  id: number
  name: string
  created_by: string
  created_at: Date
  is_default: boolean
}

export const getByUserId = async (userId: string) => {
  return supabase
    .from('list')
    .select()
    .filter('created_by', 'eq', userId)
    .then(({ data }) => data as List[])
}
