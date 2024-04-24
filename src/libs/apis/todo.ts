import { supabase } from '../supabase'

export const create = async (title: string) => {
  return supabase.from('todo').insert({ title, list_id: 1 })
}
