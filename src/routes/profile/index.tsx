import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '@/context/AuthContext';

export const Route = createFileRoute('/profile/')({
  component: ProfilePage,
})

function ProfilePage() {
  const { user } = useAuth();

  return <>
    {user && (
      <div className="container-narrow">
        <h1>My Profile</h1>
        <div className="container-narrow bg-dark">
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>  
    )}
  </>
}
