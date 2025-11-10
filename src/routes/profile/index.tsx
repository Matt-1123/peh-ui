//@ts-nocheck
import { useState, useEffect } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery, useMutation } from '@tanstack/react-query'
import { useAuth } from '@/context/AuthContext';
import ConfirmationModal from '../../components/ConfirmationModal'
import { deleteUser } from '@/api/user'
import { logoutUser } from '@/api/auth';
import { fetchUserCleanups } from '@/api/cleanups' 

const cleanupsQueryOptions = (userId: string) => queryOptions({
  queryKey: ['cleanups', userId],
  queryFn: () => fetchUserCleanups(userId)
})

export const Route = createFileRoute('/profile/')({
  component: ProfilePage,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(cleanupsQueryOptions())
  }
})

function ProfilePage() {
  
  const { user, setUser, setAccessToken } = useAuth();
  const userId = user?.id;
  
  const { data: cleanups } = useSuspenseQuery(cleanupsQueryOptions(userId))

  const totalCleanups = cleanups.length;

  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { mutateAsync: deleteMutate, isPending } = useMutation({
    mutationFn: () => deleteUser(userId),
    onSuccess: () => {
      navigate({ to: '/' });
    },
  });
  
  useEffect(() => {
    if (confirmDelete) {
      const callDeleteMutate = async () => {
        console.log('confirmDelete is true')
        await deleteMutate();
        await logoutUser();
        setAccessToken(null);
        setUser(null);
        // navigate({ to: '/' })
      }

      callDeleteMutate();
    }
  }, [confirmDelete]);

  const handleDeleteAccount = async () => {
    setOpenModal(true);
  }

  return <>
    {user && (
      <div className="container-narrow">
        <h1>My Profile</h1>
        <div className="container-narrow bg-dark">
          <h2>Account Details</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
        <div className="container-narrow bg-dark">
          <h2>Statistics</h2>
          <p>Total Cleanups: {totalCleanups}</p>
        </div>
        <div className="container-narrow bg-dark">
          <h2>Manage Account</h2>
          {/* <a href="#" style={{ display: "block" }}>Update Account</a> */}
          <button onClick={handleDeleteAccount} className="text-danger">Delete Account</button>
        </div>
      </div>
    )}
    {openModal && <ConfirmationModal 
      openModal={openModal} 
      setOpenModal={setOpenModal} 
      setConfirmDelete={setConfirmDelete}
      title="Confirm Account Deletion" 
      text="Are you sure you want to delete your account? This action cannot be undone." 
    />}  
  </>
}
