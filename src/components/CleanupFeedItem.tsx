// @ts-nocheck
import { Link } from '@tanstack/react-router';
import { FaEdit, FaTrash, FaEllipsisH } from 'react-icons/fa'
import { useAuth } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query'
import { fetchUser } from '@/api/user'
import dateConverter from '../utils/dateConverter'
import oakLeaf from '../assets/img/profile-leaf-icons/oak-leaf.png'

const CleanupFeedItem = ({ cleanup }) => {
  const { user } = useAuth();

  const cleanupQueryOptions = (cleanupId: string) => queryOptions({
    queryKey: ['cleanup', cleanupId],
    queryFn: () => fetchCleanup(cleanupId),
    // @ts-ignore
    select: (data) => data[0]
  })
  
  const { id, user_id, title, date, description, group_size, duration, location, env_type, total_items, total_bags } = cleanup;

  const {data: cleanupUser} = useQuery({
    queryKey: ['user', cleanup.user_id],
    queryFn: () => fetchUser(cleanup.user_id),
    enabled: !!cleanup.user_id,
  })

  return (
    <div className="card bg-dark feed-item">
      <div
        className="grid mb"
        style={{
          gridTemplateColumns: "42px 1fr auto",
        }}
      >
        <img src={oakLeaf} alt="" style={styles.avatar} />
        <div style={styles.meta}>
          <p className="font-sm">{cleanupUser?.[0]?.username || 'Loading...'}</p>
          <p className="font-sm">{dateConverter(date)}</p>
        </div>
        <div
          style={{
            display: "inline-block",
          }}
        >
          {/* <button style={{ marginRight: "10px" }}>
            <FaEdit style={{ color: "#999" }} />
          </button>
          <button>
            <Link to="/" style={{ marginRight: "10px" }}>
              <FaTrash style={{ color: "#dc3545" }} />
            </Link>
          </button> */}
          {/* <button style={{ height: "1rem" }}>
            <FaEllipsisH
              style={{ color: "#555", justifySelf: "end" }}
            />
          </button> */}
        </div>
      </div>
      <div
        className="flex"
        style={{ alignItems: "center", marginBottom: ".25em" }}
      >
        <FaTrash className="icon-primary" />
        <h3
          // onClick={handleTitleLink}
          className="font-md ml-1 title"
          style={{ cursor: "pointer" }}
        >
          <Link to='/cleanups/$cleanupId' params={{cleanupId: cleanup.id.toString()}}>{cleanup.title}</Link>
        </h3>
      </div>
      
        <p className="font-sm" style={{ marginBottom: ".5em", whiteSpace: 'pre-line' }}>
          {description}
        </p>
      <div style={styles.stats}>
        {total_bags && (
          <div className="text-primary mr">
            <p className="font-sm">
              Bags collected
            </p>
            <p className="font-md" style={{ lineHeight: "1", marginBottom: "0" }}>
              {total_bags}
            </p>
          </div>
        )}
        {total_items && (
          <div className="text-primary mr">
            <p className="font-sm">
              Items collected
            </p>
            <p className="font-md" style={{ lineHeight: "1", marginBottom: "0" }}>
              {total_items}
            </p>
          </div>
        )}
        
        <div className="mr">
          <p className="font-sm">Environment Type</p>
          <p>
            {env_type}
          </p>
        </div>
        <div className="mr">
          <p className="font-sm">Location</p>
          <p className='font-sm'>
            {location}
          </p>
        </div>
        <div className="mr">
          <p className="font-sm">Group Size</p>
          <p>
            {group_size}
          </p>
        </div>
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
  },
  stats: {
    display: "inline-flex",
    flexWrap: "wrap",
    gap: "1rem",
  },
};

export default CleanupFeedItem
