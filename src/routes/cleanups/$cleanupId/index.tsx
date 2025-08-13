import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cleanups/$cleanupId/')({
  component: CleanupDetailsPage,
})

function CleanupDetailsPage() {
  return <div>Hello "/cleanups/$cleanupId/"!</div>
}
