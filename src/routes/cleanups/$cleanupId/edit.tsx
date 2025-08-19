import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import {useState} from 'react';
import {
  queryOptions,
  useSuspenseQuery,
  useMutation,
} from '@tanstack/react-query';
import { fetchCleanup, deleteCleanup } from '@/api/cleanups';

const cleanupQueryOptions = (cleanupId: string) =>
  queryOptions({
    queryKey: ['cleanup', cleanupId],
    queryFn: () => fetchCleanup(cleanupId),
  });

export const Route = createFileRoute('/cleanups/$cleanupId/edit')({
  component: CleanupEditPage,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(cleanupQueryOptions(params.cleanupId));
  },
})

function CleanupEditPage() {
  const { cleanupId } = Route.useParams();
  const { data: cleanup } = useSuspenseQuery(cleanupQueryOptions(cleanupId));

  console.log(cleanup)

  const [title, setTitle] = useState(cleanup.title);
  const [date, setDate] = useState(cleanup.date);
  const [description, setDescription] = useState(cleanup.description);
  const [location, setLocation] = useState(cleanup.location);
  const [groupSize, setGroupSize] = useState(cleanup.group_size);
  const [environmentType, setEnvironmentType] = useState(cleanup.env_type);
  const [totalItemsCollected, setTotalItemsCollected] = useState(cleanup.total_items);
  const [totalBagsCollected, setTotalBagsCollected] = useState(cleanup.total_bags);

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
  
  return (<>
    <Link
      to='/cleanups/$cleanupId'
      params={{ cleanupId }}
    >
      ← Back To Cleanup
    </Link>
    <form className="container-narrow bg-dark" >
      <h1 className="text-primary font-lg">Edit Cleanup</h1>
      
      <div className="form-group">
          <label htmlFor="title">Title*</label>
          <input
              id="title"
              type="text"
              name="title"
              placeholder="Cleanup Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              // ref={inputRef}
          />
      </div>
      
      <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea 
              name="description" 
              id="description" 
              placeholder="(Optional) Describe your cleanup action"
              style={{ maxWidth: '100%', minWidth: '100%', whiteSpace: 'pre-line' }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
          ></textarea>
      </div>

      <div className="form-group">
          <label htmlFor="date">Date*</label>
          <input
              id="date"
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
          />
      </div>
      
      <div className="form-group">
          <label htmlFor="location">Location*</label>
          <input
              id="location"
              type="text"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
          />
      </div>

      <div className="form-group grid-2">
          <div>
              <label htmlFor="environment-type">Environment Type</label>
              <select name="environment-type" value={environmentType} onChange={(e) => setEnvironmentType(e.target.value)}>
                <option value="">Select an option</option>
                <option value="path">Path</option>
                <option value="park">Park</option>
                <option value="beach">Beach</option>
                <option value="other">Other</option>
              </select>
          </div>
          <div>
              <label htmlFor="groupSize">Group Size</label>
              <input
                  id="groupSize"
                  type="number"
                  style={styles.number}
                  name="groupSize"
                  value={groupSize}
                  onChange={(e) => setGroupSize(e.target.value)}
                  min="1"
                  max="9999"
              />
          </div>
      </div>

      <div className="form-group grid-2">
          <div>
              <label htmlFor="totalItemsCollected">Total Items Collected</label>
              <input
                  id="totalItemsCollected"
                  type="number"
                  style={styles.number}
                  name="totalItemsCollected"
                  value={totalItemsCollected}
                  onChange={(e) => setTotalItemsCollected(e.target.value)}
                  min="0"
                  max="99999"
              />
          </div>
          <div>
              <label htmlFor="groupSize">Total Bags Collected</label>
              <input
                  id="totalBagsCollected"
                  type="number"
                  style={styles.number}
                  name="totalBagsCollected"
                  value={totalBagsCollected}
                  onChange={(e) => setTotalBagsCollected(e.target.value)}
                  min="0"
                  max="999"
              />
          </div>
      </div>

      <div>
          <input
              type="submit"
              value="Update Cleanup"
              disabled={isPending}
              className="btn btn-primary--dark btn-block"
          />
      </div>
      <div>
          <button
              type="button"
              onClick={handleDelete}
              disabled={isPending}
              className="btn btn-danger btn-block"
          >{ isPending ? 'Deleting...' : 'Delete' }</button>
      </div>

      <p className="font-sm">* required</p>
    </form>
  </>)
}

const styles = {
  number: {
    display: "inherit",
    padding: "8px 4px",
    minWidth: "120px"
  }
};
