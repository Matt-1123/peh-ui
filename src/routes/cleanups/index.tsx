import { createFileRoute, Link } from '@tanstack/react-router'
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query'
import { fetchCleanups } from '@/api/cleanups'
import CleanupFeedItem from '../../components/CleanupFeedItem'
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
    <div className="container-narrow">
      <h1>All Cleanups</h1>
      {cleanups.map(cleanup => (
        <CleanupFeedItem key={cleanup.id} cleanup={cleanup} />
        // <li key={cleanup.id}>
        //   <Link to='/cleanups/$cleanupId' params={{cleanupId: cleanup.id.toString()}}>{cleanup.title}</Link>
        // </li>
      ))}
    </div>
  </>
}
