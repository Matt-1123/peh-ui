//@ts-nocheck
import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {useMutation} from '@tanstack/react-query'
import { useAuth } from '@/context/AuthContext';
import ConfirmationModal from '../../components/ConfirmationModal'
import { deleteUser } from '@/api/user'

export const Route = createFileRoute('/profile/')({
  component: ProfilePage,
})

function ProfilePage() {
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const userId = user?.id;

  const { mutateAsync: deleteMutate, isPending } = useMutation({
    mutationFn: () => deleteUser(userId),
    onSuccess: () => {
      navigate({ to: '/' });
    },
  });
  
  const handleDeleteAccount = async () => {
    setOpenModal(true);

    if (confirmDelete) {
      await deleteMutate();
    }
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
          <h2>Manage Account</h2>
          <a href="#" style={{ display: "block" }}>Update Account</a>
          <button onClick={handleDeleteAccount} className="text-danger">Delete Account</button>
        </div>
      </div>
    )}
    {openModal && <ConfirmationModal 
      openModal={openModal} 
      setOpenModal={setOpenModal} 
      confirmDelete={confirmDelete}
      setConfirmDelete={setConfirmDelete}
      title="Confirm Account Deletion" 
      text="Are you sure you want to delete your account? This action cannot be undone." 
    />}  
  </>
}
