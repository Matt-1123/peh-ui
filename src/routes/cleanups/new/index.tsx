import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cleanups/new/')({
  component: NewCleanupPage,
})

function NewCleanupPage() {
  return <div>Hello "/cleanups/new/"!</div>
}
