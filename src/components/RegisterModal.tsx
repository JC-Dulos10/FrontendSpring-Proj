import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean; // To differentiate between user and admin registration
}

const RegisterModal: React.FC<Props> = ({ isOpen, onClose, isAdmin }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async () => {
    try {
      const res = await fetch(`${process.env.registerURL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
          isAdmin: isAdmin ? 'true' : 'false',
        }),
      });

      if (res.ok) {
        setSuccess('User registered successfully');
        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
        setError('');
        setTimeout(() => {
          onClose();
          setSuccess('');
        }, 2000);
      } else {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const jsonError = await res.json();
          setError(jsonError.message || 'Failed to register user');
        } else {
          const textError = await res.text();
          setError(textError || 'Failed to register user');
        }
      }
    } catch (error) {
      setError('Error registering user');
      setSuccess('');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center px-4 sm:px-6">
      <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md sm:max-w-lg p-6 space-y-6 transform transition-all">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            Register {isAdmin ? 'Admin' : 'User'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <span className="sr-only">Close</span>
            ✕
          </button>
        </div>
        {error && <div className="text-red-600">{error}</div>}
        {success && <div className="text-green-600">{success}</div>}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleRegister}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
