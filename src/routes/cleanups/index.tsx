import { createFileRoute, Link } from '@tanstack/react-router'
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query'
import type { Cleanup } from '../../types'

const fetchCleanups = async (): Promise<Cleanup> => {
  const res = await fetch(`/api/cleanups/`);
  if (!res.ok) {
    throw new Error('Failed to fetch cleanups');
  }
  return res.json();
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
  return <div>Hello "/cleanups/"!</div>
}
