import { HeadContent, Outlet, createRootRouteWithContext, Link } from '@tanstack/react-router'
// import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
// import { TanstackDevtools } from '@tanstack/react-devtools'
import { QueryClient } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';
import Header from '@/components/Header'
import { Analytics } from '@vercel/analytics/react';

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
  component: RootLayout,
  notFoundComponent: NotFound,
})

function RootLayout() {
  return (
    <>
      <HeadContent />
      <Header />
      <main>
        <Outlet />
        <Analytics />
      </main>
      {/* <TanstackDevtools
        config={{
          position: 'bottom-left',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      /> */}
      <ToastContainer />
    </>
  )
}

function NotFound() {
  return (
    <>
      <div>404 - Not Found</div>
      <Link to="/">Go Home</Link>
    </>
  )
}
