import React, { useState } from 'react';
import axios from 'axios';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [currentPassword, setcurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    if (newPassword !== confirmationPassword) {
      setError('New password and confirm password do not match');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('JWT token not found in localStorage.');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.patch('http://localhost:8080/api/v1/users/change-password', {
        currentPassword,
        newPassword,
        confirmationPassword
      }, config);

      if (response.status === 200) {
        setSuccess('Password changed successfully');
        setcurrentPassword('');
        setNewPassword('');
        setConfirmationPassword('');
        setError('');
        setTimeout(() => {
          onClose();
          setSuccess('');
        }, 2000);
      } else {
        setError('Failed to change password');
      }
    } catch (error) {
      setError('Error changing password');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Change Password</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500 focus:outline-none">
              <span className="sr-only">Close</span>
              ✕
            </button>
          </div>
          {error && <div className="mb-4 text-red-600">{error}</div>}
          {success && <div className="mb-4 text-green-600">{success}</div>}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Old Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setcurrentPassword(e.target.value)}
                className="text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                value={confirmationPassword}
                onChange={(e) => setConfirmationPassword(e.target.value)}
                className="text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
