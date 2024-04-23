type AvatarProps = {
  src?: string
}

export default function Avatar({ src }: AvatarProps) {
  return (
    <div className="avatar">
      <div className="w-12 rounded-full">
        <img alt="Avatar" loading="lazy" width={48} height={48} src={src} />
      </div>
    </div>
  )
}
