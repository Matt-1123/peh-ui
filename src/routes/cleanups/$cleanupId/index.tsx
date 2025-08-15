import { createFileRoute, Link } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import {queryOptions, useSuspenseQuery, useMutation} from '@tanstack/react-query'
import { fetchCleanup, deleteCleanup } from '@/api/cleanups'
import { FaEdit, FaTrash } from 'react-icons/fa'

const cleanupQueryOptions = (cleanupId: string) => queryOptions({
  queryKey: ['cleanup', cleanupId],
  queryFn: () => fetchCleanup(cleanupId),
})

export const Route = createFileRoute('/cleanups/$cleanupId/')({
  component: CleanupDetailsPage,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(cleanupQueryOptions(params.cleanupId))
  }
})

function CleanupDetailsPage() {
  const { cleanupId } = Route.useParams()
  const {data: cleanup} = useSuspenseQuery(cleanupQueryOptions(cleanupId))
  
  const navigate = useNavigate();

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
    <h1>Cleanups</h1>
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
    </div>
    
  </>
}
