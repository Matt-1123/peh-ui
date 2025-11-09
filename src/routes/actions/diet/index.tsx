import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/actions/diet/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/actions/diet/"!</div>
}
