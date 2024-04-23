import { supabase } from '~/libs/supabase'

export default function Login() {
  const loginWithGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }
  return (
    <div>
      Login page
      <button onClick={loginWithGoogle}>Login</button>
    </div>
  )
}
