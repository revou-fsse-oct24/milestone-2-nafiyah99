import React from 'react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-zinc-800 p-6 rounded shadow-md">
        <h2 className="text-lg font-bold">Confirm Logout</h2>
        <p className='p-4'>Are you sure you want to log out?</p>
        <div className="mt-4 flex justify-end">
          <button className="mr-2 px-4 py-2 bg-zinc-700 rounded" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={handleConfirm}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
