// @ts-nocheck
import { useState } from 'react';
import { CiCircleAlert } from "react-icons/ci";

const ConfirmationModal = ({ openModal, setOpenModal, title, text }) => {
  const [result, setResult] = useState('');

  const handleConfirm = () => {
    setResult('Your account has been deleted.');
    setOpenModal(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <>
      {openModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-icon-container">
              <div className="modal-icon">
                <CiCircleAlert size={24} color="#dc2626" />
              </div>
            </div>

            <div className="modal-content">
              <h2 className="modal-title">{title}</h2>
              <p className="modal-text">
                {text}
              </p>
            </div>

            <div className="modal-actions">
              <button onClick={handleCancel} className="cancel-button">
                Cancel
              </button>
              <button onClick={handleConfirm} className="confirm-button">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ConfirmationModal;
