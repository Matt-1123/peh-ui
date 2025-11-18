// @ts-nocheck
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import {queryOptions, useSuspenseQuery, useQuery, useMutation} from '@tanstack/react-query'
import { fetchCleanup, deleteCleanup } from '@/api/cleanups'
import { fetchUser } from '@/api/user'
import { FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa'
import { useAuth } from '@/context/AuthContext'
import oakLeaf from '@/assets/img/profile-leaf-icons/oak-leaf.png'
import dateConverter from '@/utils/dateConverter'


const cleanupQueryOptions = (cleanupId: string) => queryOptions({
  queryKey: ['cleanup', cleanupId],
  queryFn: () => fetchCleanup(cleanupId),
  // @ts-ignore
  select: (data) => data[0]
})

export const Route = createFileRoute('/cleanups/$cleanupId/')({
  component: CleanupDetailsPage,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(cleanupQueryOptions(params.cleanupId))
  }
})

function CleanupDetailsPage() {
  const { cleanupId } = Route.useParams()
  
  const navigate = useNavigate();

  const { user } = useAuth();
  
  const {data: cleanup} = useSuspenseQuery(cleanupQueryOptions(cleanupId))
  
  const {data: cleanupUser} = useQuery({
    queryKey: ['user', cleanup.user_id],
    queryFn: () => fetchUser(cleanup.user_id),
    enabled: !!cleanup.user_id,
  })

  const { mutateAsync: deleteMutate, isPending } = useMutation({
    mutationFn: () => deleteCleanup(cleanupId),
    onSuccess: () => {
      navigate({ to: '/cleanups' });
    },
  });

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this cleanup?'
    );

    if (confirmDelete) {
      await deleteMutate();
    }
  };

  // Capitalize environment type
  const envType = cleanup.env_type.charAt(0).toUpperCase() + cleanup.env_type.slice(1);
  
  return <>   
    <div className="container-narrow">
      <div className='flex mb-2' style={styles.top}>
        <Link to='/' className='back-link'>
          <FaArrowLeft className='mr' /> Back to Home
        </Link>
        { user && user.id === cleanup.user_id && (
          <>
            <div>
              <button className="mr-1">
                <Link to='/cleanups/$cleanupId/edit' params={{cleanupId}}>
                  <FaEdit style={{ color: "#999" }} /> Edit
                </Link>
              </button>
              <button disabled={ isPending } onClick={handleDelete}>
                <FaTrash style={{ color: "#dc3545" }} /> { isPending ? 'Deleting...' : 'Delete' }
              </button>
            </div>
          </>
        )}
        
      </div>
      <div
        className="grid mb"
        style={{
          gridTemplateColumns: "42px 1fr",
        }}
      >
        <img src={oakLeaf} alt="" style={styles.avatar} />
        <div style={styles.meta}>
          <p className="font-sm">{cleanupUser?.[0]?.username || 'Loading...'}</p>
          <p className="font-sm">{dateConverter(cleanup.date)}</p>
        </div>
      </div>

      <h1>Action Summary</h1>
      <div className="container-narrow bg-dark">
        <p>Title: {cleanup.title}</p>
        {cleanup.description && <p>Description: {cleanup.description}</p>}
        {/* <p>Date: {dateConverter(date)}</p> */}
      </div>
      <div className="container-narrow bg-dark">
        <p>Group size: {cleanup.group_size}</p>
        <p>Duration: {cleanup.duration} minutes</p>
        <p>Environment type: {envType}</p>
        <p>Location: {cleanup.location}</p>
        {/* CO2e prevented:{" "}
        <span className="font-lg text-primary">{carbonPrevented} kg</span> */}
      </div>
      
      {/* show section if there are items or bags stats */}
      {(cleanup.total_bags || cleanup.total_items) && (
        <div className="container-narrow bg-dark">
          <h3 className="px-1 mb-1">Impact</h3>
          <div className="grid-2" style={{ gridGap: 0 }}>
            {cleanup.total_bags && (
              <div style={{ textAlign: "center" }}>
                <div className="text-primary mr">
                  <p className="font-lg" style={{ marginBottom: "0" }}>
                    {cleanup.total_bags}
                  </p>
                  <p className="font-md">
                    Bags collected
                  </p>
                </div>
              </div>
            )}
            {cleanup.total_items && (
              <div style={{ textAlign: "center" }}>
                <div className="text-primary mr">
                  <p className="font-lg" style={{ marginBottom: "0" }}>
                    {cleanup.total_items}
                  </p>
                  <p className="font-md">
                    Items collected
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  </>
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
  top: {
    display: "flex",
    justifyContent: "space-between",
  }
};
