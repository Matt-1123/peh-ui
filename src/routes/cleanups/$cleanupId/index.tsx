import { createFileRoute, Link } from '@tanstack/react-router'
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query'
import type { Cleanup } from '@/types'
import api from '@/lib/axios'

const fetchCleanup = async (cleanupId: string): Promise<Cleanup> => {
  const res = await api.get(`/cleanups/${cleanupId}`);

  return res.data;
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
