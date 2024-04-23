import { useQuote } from '~/hooks/useQuote'

export default function Main() {
  const { data } = useQuote()
  return (
    <div>
      <div
        className="prose"
        dangerouslySetInnerHTML={{
          __html: data?.h ?? '',
        }}
      ></div>
    </div>
  )
}
