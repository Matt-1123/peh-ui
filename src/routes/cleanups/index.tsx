import { createFileRoute, Link } from '@tanstack/react-router'
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query'
import type { Cleanup } from '@/types'
import api from '@/lib/axios'

const fetchCleanups = async (): Promise<Cleanup[]> => {
  const res = await api.get('/cleanups');

  return res.data;
}

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
  component: CleanupsComponent,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(cleanupsQueryOptions())
  }
})

function CleanupsComponent() {
  const {data: cleanups} = useSuspenseQuery(cleanupsQueryOptions())
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
