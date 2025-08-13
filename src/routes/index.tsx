import '../App.css'
import { createFileRoute, Link } from '@tanstack/react-router'
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query'
import { fetchCleanups } from '@/api/cleanups'

const cleanupsQueryOptions = queryOptions({
  queryKey: ['cleanups', { limit: 3 }],
  queryFn: fetchCleanups
})

export const Route = createFileRoute('/')({
  component: HomePage,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(cleanupsQueryOptions),
})

function HomePage() {
  const { data: cleanups } = useSuspenseQuery(cleanupsQueryOptions);
  const latest = cleanups.slice(0, 3);

  return (
    <>
      <h1>Project Earth Health</h1>
      <ul>
        {latest.map(cleanup => (
          <li key={cleanup.id}>
            <Link to='/cleanups/$cleanupId' params={{cleanupId: cleanup.id.toString()}}>{cleanup.title}</Link>
          </li>
        ))}
      </ul>
      <Link to='/cleanups'>View all cleanups</Link>
    </>
  )
}
