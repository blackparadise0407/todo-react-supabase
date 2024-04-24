import { useAuth, useList } from '~/hooks'
import { Avatar } from '../Avatar'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  const { user } = useAuth()
  const { data: list } = useList(user?.id)

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
            className="link-hover link link-secondary block truncate"
            title={user.email}
          >
            {user.email}
          </Link>
        </div>
      </div>

      <ul className="menu w-56 rounded-box bg-base-200">
        <li>
          <h2 className="menu-title text-lg">My lists</h2>
          <ul>
            {list?.map((it) => (
              <li key={it.id}>
                <Link to="#">{it.name}</Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </aside>
  )
}
