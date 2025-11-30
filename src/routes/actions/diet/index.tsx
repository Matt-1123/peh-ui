import { createFileRoute } from '@tanstack/react-router'
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query'
import { fetchDietActionMeals } from '@/api/dietActions'
const dietActionsQueryOptions = () => queryOptions({
  queryKey: ['dietActions'],
  queryFn: () => fetchDietActionMeals(),
})

export const Route = createFileRoute('/actions/diet/')({
  head: () => ({
    meta: [
      {
        title: 'PEH - Diet Actions'
      }
    ]
  }),
  component: RouteComponent,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(dietActionsQueryOptions())
  }
})

function RouteComponent() {
  const { data: dietActions } = useSuspenseQuery(dietActionsQueryOptions())
  return <>
    <h1>All Diet Actions</h1>
    {dietActions.map(action => (
      <p>{action.mealName}</p>
    ))}
  </>
}
