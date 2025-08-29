// @ts-nocheck
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import {queryOptions, useSuspenseQuery, useMutation} from '@tanstack/react-query'
import { fetchCleanup, deleteCleanup } from '@/api/cleanups'
import { FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa'

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
  
  const {data: cleanup} = useSuspenseQuery(cleanupQueryOptions(cleanupId))
  
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
  
  return <>
    {/* <h1>Cleanups</h1>
    <p>{cleanup.title}</p>
    <Link to='/cleanups'>Back to Cleanups</Link>
    <div>
      <button disabled={ isPending } onClick={handleDelete}>
        <FaTrash style={{ color: "#dc3545" }} /> { isPending ? 'Deleting...' : 'Delete' }
      </button>
    </div>
    <div>
      <button disabled={ isPending } >
        <FaEdit />
        <Link to='/cleanups/$cleanupId/edit' params={{cleanupId}}>Edit</Link>
      </button>
    </div> */}
    

    <div className="container-narrow">
      {/* <div className="grid-2 my-2">
        <button className="btn btn-light" onClick={handleDelete}>
          Cancel
        </button>
        <button className="btn btn-primary--dark" onClick={handleSave}>
          Save
        </button>
      </div> */}
      <div className='flex mb-2' style={styles.top}>
        <Link to='/' className='back-link'>
          <FaArrowLeft className='mr' /> Back to Home
        </Link>
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
      </div>
      <div
        className="grid mb"
        style={{
          gridTemplateColumns: "42px 1fr",
        }}
      >
        <img src="" alt="" style={styles.avatar} />
        <div style={styles.meta}>
          {/* <p className="font-sm">{userName}</p> */}
          {/* <p className="font-sm">{dateConverter(date)}</p> */}
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
        <p>Environment type: {cleanup.env_type}</p>
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
