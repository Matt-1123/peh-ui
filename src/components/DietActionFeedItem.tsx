// @ts-nocheck
import { Link } from '@tanstack/react-router';
import { FaEdit, FaEllipsisH } from 'react-icons/fa'
import { RiExternalLinkLine } from "react-icons/ri";
import { useAuth } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query'
import { fetchUser } from '@/api/user'
import dateConverter from '../utils/dateConverter'
import oakLeaf from '../assets/img/profile-leaf-icons/oak-leaf.png'
import { fetchDietActionMeal } from '@/api/dietActions';

const DietActionFeedItem = ({ dietAction }) => {
  const { user } = useAuth();

  const dietActionQueryOptions = (actionId: string) => queryOptions({
    queryKey: ['dietAction', actionId],
    queryFn: () => fetchDietActionMeal(actionId),
    // @ts-ignore
    select: (data) => data[0]
  })
  
  const { id, user_id, title, date, description, foodsAvoided, totalCO2Avoided } = dietAction;

  const {data: dietActionUser} = useQuery({
    queryKey: ['user', dietAction.user_id],
    queryFn: () => fetchUser(dietAction.user_id),
    enabled: !!dietAction.user_id,
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
          <p className="font-sm">{dietActionUser?.[0]?.username || 'Loading...'}</p>
          <p className="font-sm">{dateConverter(date)}</p>
        </div>
        <div
          style={{
            display: "inline-block",
          }}
        >
        </div>
      </div>
      <div
        className="flex"
        style={{ alignItems: "center", marginBottom: ".25em" }}
      >
        <h3
          // onClick={handleTitleLink}
          className="font-md title"
          style={{ cursor: "pointer" }}
        >
          <Link to='/'>{dietAction.title} <RiExternalLinkLine style={{ color: '#888', fontSize: '1rem' }} /></Link>
        </h3>
      </div>
        <p className="font-sm" style={{ marginBottom: ".5em", whiteSpace: 'pre-line' }}>
          {description}
        </p>
      <div style={styles.stats}>
        {totalCO2Avoided && (
          <div className="text-primary mr">
            <p className="font-sm">
              Total CO2 Avoided
            </p>
            <p className="font-md" style={{ lineHeight: "1", marginBottom: "0" }}>
              {totalCO2Avoided}
            </p>
          </div>
        )}
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

export default DietActionFeedItem
