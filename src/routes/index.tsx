// @ts-nocheck
import '../App.css'
import { createFileRoute, Link } from '@tanstack/react-router'
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query'
import { fetchCleanups } from '@/api/cleanups'
import dateConverter from '../utils/dateConverter'
import oakLeaf from '../assets/img/profile-leaf-icons/oak-leaf.png'

const cleanupsQueryOptions = queryOptions({
  queryKey: ['cleanups', { limit: 3 }],
  queryFn: () => fetchCleanups(3)
})

export const Route = createFileRoute('/')({
  component: HomePage,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(cleanupsQueryOptions),
})

function HomePage() {
  const { data: cleanups } = useSuspenseQuery(cleanupsQueryOptions);

  return (
    <div className="container-narrow">
      <div className="container-narrow bg-dark" style={{ textAlign: 'center', marginTop: '0' }}>
        <h1>Welcome to Project Earth Health!</h1>
        <p style={{ fontSize: '1.1rem' }}>Learn about and log environmentally friendly activities</p>
      </div>
      
      <div className="container-narrow bg-dark">
        <h2 className='mb'>Latest Cleanups</h2>
        
        <ul>
          {cleanups.map(cleanup => (
            <Link to='/cleanups/$cleanupId' params={{cleanupId: cleanup.id.toString()}}>
              <div className='latest-action-item'>
                <div
                  className="grid mb"
                  style={{
                    gridTemplateColumns: "42px 1fr auto",
                  }}
                >
                  <img src={oakLeaf} alt="" style={styles.avatar} />
                  <div style={styles.meta}>
                    {/* <p className="font-sm">{cleanupUser?.[0]?.username || 'Loading...'}</p> */}
                    <p className="font-sm">{dateConverter(cleanup.date)}</p>
                    <p className="font-sm">{cleanup.title}</p>
                  </div>
                </div>
              </div>
            </Link>
            
          ))}
        </ul>
        
        <Link to='/cleanups'>
          <div className="btn btn-primary--dark mt-1">View All Cleanups</div>
        </Link>
        
      </div>
    </div>
  )
}

const styles = {
  avatar: {
    height: "42px",
    width: "42px",
    border: "1px solid #fff",
    borderRadius: "50%",
    backgroundColor: "#cb997e"
  },
  meta: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  icon: {
    height: "1rem",
    width: "1rem",
    border: "1px solid #fff",
  }
};
