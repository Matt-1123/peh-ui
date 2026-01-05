import { fetchCleanups } from '@/api/cleanups'
import CleanupFeedItem from '@/components/CleanupFeedItem'
import Spinner from '@/components/Spinner'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

const cleanupsQueryOptions = () => queryOptions({
  queryKey: ['cleanups'],
  queryFn: () => fetchCleanups(),
})

export const Route = createFileRoute('/actions/cleanups/')({
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
  },
  pendingComponent: () => (
    <div className="container-narrow">
      <h1 className='mb-3'>All Cleanups</h1>
      <Spinner />
    </div>
  )
})

function CleanupsPage() {
  const { data: cleanups } = useSuspenseQuery(cleanupsQueryOptions())
  
  return <>
    <div className="container-narrow">
      <h1>All Cleanups</h1>
      {cleanups.map(cleanup => (
        <CleanupFeedItem key={cleanup.id} cleanup={cleanup} />
      ))}
    </div> 
  </>
}
