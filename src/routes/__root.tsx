import { HeadContent, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanstackDevtools } from '@tanstack/react-devtools'
import { QueryClient } from '@tanstack/react-query'

type RouterContext = {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({ 
  head: () => ({
    meta: [
      {
        name: 'description',
        content: 'Project Earth Health - A platform for environmental cleanups'
      },
      {
        title: 'Project Earth Health',
      }
    ],
  }),
  component: () => (
    <>
      <HeadContent />
      <Outlet />
      <TanstackDevtools
        config={{
          position: 'bottom-left',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  ),
})
