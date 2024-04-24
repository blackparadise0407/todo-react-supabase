import { supabase } from '../supabase'

export const getByUserId = async (userId: string) => {
  return supabase
    .from('list')
    .select()
    .filter('created_by', 'eq', userId)
    .then(({ data }) => data)
}
