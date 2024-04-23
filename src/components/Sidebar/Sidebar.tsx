import { useAuth } from '~/hooks'
import { Avatar } from '../Avatar'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <aside className="w-full max-w-72 p-5">
      <div className="flex gap-5">
        <Avatar src={user.user_metadata.picture} />
        <div className="min-w-0">
          <h1 className="font-bold" title={user.user_metadata.name}>
            {user.user_metadata.name}
          </h1>
          <Link
            to="#"
            className="block truncate link link-secondary link-hover"
            title={user.email}
          >
            {user.email}
          </Link>
        </div>
      </div>
    </aside>
  )
}
