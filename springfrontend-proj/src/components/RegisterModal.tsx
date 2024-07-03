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
        const res = await fetch('http://localhost:8080/api/v1/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname,
            lastname,
            email,
            password,            
            isAdmin: isAdmin ? "true" : "false"
          }),
        });
  
        if (res.ok) {
          setSuccess('User registered successfully');
          setFirstname('');
          setLastname('');
          setEmail('');
          setPassword('');
          setError(''); // Clear the error state
          setTimeout(() => {
            onClose();
            setSuccess(''); // Clear success message after some time
          }, 2000);
        } else {
          // Handle error response (text or JSON)
          const contentType = res.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            // If response is JSON
            const jsonError = await res.json();
            setError(jsonError.message || 'Failed to register user');
          } else {
            // If response is plain text
            const textError = await res.text();
            setError(textError || 'Failed to register user');
          }
        }
      } catch (error) {
        setError('Error registering user');
        setSuccess(''); // Clear success message if there's an error
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
            <h3 className="text-lg leading-6 font-medium text-gray-900">Register {isAdmin ? 'Admin' : 'User'}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500 focus:outline-none">
              <span className="sr-only">Close</span>
              ✕
            </button>
          </div>
          {error && <div className="mb-4 text-red-600">{error}</div>}
          {success && <div className="mb-4 text-green-600">{success}</div>}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              onClick={handleRegister}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;