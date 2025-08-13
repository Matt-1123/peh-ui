import { createFileRoute, Link } from '@tanstack/react-router'
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query'
import type { Cleanup } from '../../types'

const fetchCleanup = async (cleanupId: string): Promise<Cleanup> => {
  const res = await fetch(`/api/cleanups/${cleanupId}`);
  if (!res.ok) {
    throw new Error('Failed to fetch cleanup details');
  }
  return res.json();
}

const cleanupQueryOptions = (cleanupId: string) => queryOptions({
  queryKey: ['cleanup', cleanupId],
  queryFn: () => fetchCleanup(cleanupId),
})

export const Route = createFileRoute('/cleanups/$cleanupId/')({
  component: CleanupDetailsPage,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(cleanupQueryOptions(params.cleanupId))
  }
})

function CleanupDetailsPage() {
  const { cleanupId } = Route.useParams()
  const {data: cleanup} = useSuspenseQuery(cleanupQueryOptions(cleanupId))
  
  return <>
    <h1>Cleanups</h1>
    <p>{cleanup.title}</p>
    <Link to='/cleanups'>Back to Cleanups</Link>
  </>
}
