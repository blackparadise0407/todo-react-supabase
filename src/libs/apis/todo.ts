import { todoApi } from '.'
import { supabase } from '../supabase'

export interface Todo {
  id: number
  title: string
  notes: string
  is_complete: boolean
  deadline: Date
  created_by: string
  created_at: Date
  tag_ids: number[]
  list_id: number
  attachment_id?: string | null
}

export type CreateRQ = Pick<Todo, 'title' | 'list_id'>

export const create = async (payload: CreateRQ) => {
  const { data, error } = await supabase.from('todo').insert(payload)
  if (error) {
    throw error
  }
  return data
}

export const getTodayTodos = async (userId: string) => {
  const { data, error } = await supabase
    .from('todo')
    .select()
    .eq('created_by', userId)
  if (error) {
    throw error
  }
  return data as Todo[]
}

export const toggleComplete = async (todo: Todo) => {
  const { data, error } = await supabase
    .from('todo')
    .update({ is_complete: !todo.is_complete })
    .eq('id', todo.id)
  if (error) {
    throw error
  }
  return data
}
