//@ts-nocheck
import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '@/context/AuthContext';
import ConfirmationModal from '../../components/ConfirmationModal'

export const Route = createFileRoute('/profile/')({
  component: ProfilePage,
})

function ProfilePage() {
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(true);

  const handleDeleteAccount = () => {
    setOpenModal(true);
    window.alert('User deletion API is in the process of being created. Please try again later.')
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
    {openModal && <ConfirmationModal openModal={openModal} setOpenModal={setOpenModal} title="Confirm Account Deletion" text="Are you sure you want to delete your account? This action cannot be undone." />}  
  </>
}
