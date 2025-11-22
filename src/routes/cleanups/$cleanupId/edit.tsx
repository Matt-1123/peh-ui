// @ts-nocheck
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import {useState} from 'react';
import {
  queryOptions,
  useSuspenseQuery,
  useMutation,
} from '@tanstack/react-query';
import { fetchCleanup, deleteCleanup, updateCleanup } from '@/api/cleanups';
import { RiInformation2Line } from 'react-icons/ri';
import { SearchBox  } from '@mapbox/search-js-react';

const cleanupQueryOptions = (cleanupId: string) =>
  queryOptions({
    queryKey: ['cleanup', cleanupId],
    queryFn: () => fetchCleanup(cleanupId),
    // @ts-ignore
    select: (data) => data[0]
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
  const dateOnly = cleanup.date.slice(0, 10);

  const [title, setTitle] = useState(cleanup.title);
  const [date, setDate] = useState(dateOnly);
  const [description, setDescription] = useState(cleanup.description);
  const [location, setLocation] = useState(cleanup.location);
  const [groupSize, setGroupSize] = useState(cleanup.group_size);
  const [duration, setDuration] = useState(cleanup.duration);
  const [environmentType, setEnvironmentType] = useState(cleanup.env_type);
  const [totalItemsCollected, setTotalItemsCollected] = useState(cleanup.total_items);
  const [totalBagsCollected, setTotalBagsCollected] = useState(cleanup.total_bags);
  const [showBagInfoBox, setShowBagInfoBox] = useState(false)

  const navigate = useNavigate();
  
  const { mutateAsync: deleteMutate, isPending: isPendingDelete } = useMutation({
    mutationFn: () => deleteCleanup(cleanupId),
    onSuccess: () => {
      navigate({ to: '/cleanups' });
    },
  });

  const handleBagInfo = () => {
    setShowBagInfoBox(!showBagInfoBox);
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this cleanup?'
    );

    if (confirmDelete) {
      await deleteMutate();
    }
  };

  const { mutateAsync: editMutate } = useMutation({
    mutationFn: () =>
      updateCleanup(cleanupId, {
        title,
        date,
        description,
        location,
        group_size: parseInt(groupSize.toString()),
        duration: duration ? parseInt(duration) : null,
        env_type: environmentType,
        total_items: totalItemsCollected ? parseInt(totalItemsCollected) : null,
        total_bags: totalBagsCollected ? parseFloat(totalBagsCollected) : null,
      }),
    onSuccess: () => {
      navigate({ to: '/cleanups/$cleanupId', params: { cleanupId } });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await editMutate();
  };
  
  return (<>
    <Link
      to='/cleanups/$cleanupId'
      params={{ cleanupId }}
    >
      ← Back To Cleanup
    </Link>
    <form onSubmit={handleSubmit} className="container-narrow bg-dark" >
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
          <SearchBox
            accessToken={import.meta.env.VITE_MAPBOX}
            value={location}
            onChange={(value) => setLocation(value)}
            onRetrieve={(result) => {
              // When user selects a suggestion, use the full address
              setLocation(result.features[0].properties.full_address || result.features[0].properties.place_formatted);
            }}
            placeholder="Enter location"
            options={{
              language: 'en'
            }}
          />
      </div>

      <div className="form-group grid-3">
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
          <div>
              <label htmlFor="duration">Duration (in minutes)</label>
              <input
                  id="duration"
                  style={styles.number}
                  type="number"
                  name="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  min="1"
                  max="600"
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
              <label htmlFor="totalBagsCollected">Total Bags Collected <RiInformation2Line onClick={handleBagInfo} style={{ cursor: 'pointer', position: 'relative' }} /></label>
              {showBagInfoBox && <div className="infoBox">Please enter 0.25 increments. Bags are calculated based on a standard 13 gallon size. For 30 gallon bags, enter 2.25 for a full bag. For a 5 gallon bag, round up to 0.5.</div>}
              <input
                  id="totalBagsCollected"
                  type="number"
                  step="0.25"
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
              disabled={isPendingDelete}
              className="btn btn-primary--dark btn-block"
          />
      </div>
      <div>
          <button
              type="button"
              onClick={handleDelete}
              disabled={isPendingDelete}
              className="btn btn-danger btn-block"
          >{ isPendingDelete ? 'Deleting...' : 'Delete' }</button>
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
