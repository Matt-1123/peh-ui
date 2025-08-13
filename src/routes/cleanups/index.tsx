import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cleanups/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/cleanups/"!</div>
}
