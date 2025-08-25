import { createFileRoute, Link } from '@tanstack/react-router'
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query'
import { fetchCleanups } from '@/api/cleanups'

const cleanupsQueryOptions = () => queryOptions({
  queryKey: ['cleanups'],
  queryFn: () => fetchCleanups(),
})

export const Route = createFileRoute('/cleanups/')({
  head: () => ({
    meta: [
      {
        title: 'PEH - Cleanups'
      }
    ],
  }),
  component: CleanupsPage,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(cleanupsQueryOptions())
  }
})

function CleanupsPage() {
  const { data: cleanups } = useSuspenseQuery(cleanupsQueryOptions())
  // const cleanups = [...data].sort(
  //   (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  // )
  console.log('Cleanups:', cleanups)
  
  return <>
    <div>Hello "/cleanups/"!</div>
    <ul>
      {cleanups.map(cleanup => (
        <li key={cleanup.id}>
          <Link to='/cleanups/$cleanupId' params={{cleanupId: cleanup.id.toString()}}>{cleanup.title}</Link>
        </li>
      ))}
    </ul>
  </>
}
