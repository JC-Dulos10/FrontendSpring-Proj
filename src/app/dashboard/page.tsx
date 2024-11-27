'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import UserTable from '@/components/UserTable';
import ChangePasswordModal from '@/components/ChangePasswordModal';
import RegisterModal from '@/components/RegisterModal';

const DashboardPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<any[]>([]);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState<boolean>(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.getUserURL}`, config);
        setIsAdmin(true);
        setUsers(response.data);
      } catch (error) {
        handleFetchError(error);
      } finally {
        setIsAuthenticated(true);
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleFetchError = (error: unknown) => {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      if (axiosError.response.status === 403) {
        setIsAdmin(false); // User not an admin
      } else {
        console.error('Error fetching user data:', axiosError.response.data);
      }
    } else {
      console.error('Unknown error:', axiosError.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    router.push('/login');
  };

  const handleDeleteUser = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.getUserURL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleModalClose = () => window.location.reload();

  const handleNavigation = (path: string) => router.push(path);

  const renderAdminControls = () => (
    <div className="mt-6 flex space-x-4">
      <button
        onClick={() => setIsChangePasswordModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Change Password
      </button>
      <button
        onClick={() => setIsRegisterModalOpen(true)}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Register Admin
      </button>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Logout
      </button>
      <button
        onClick={() => handleNavigation('/product')}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Product Inventory
      </button>
      <button
        onClick={() => handleNavigation('/dashboard')}
        className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
      >
        Refresh
      </button>
    </div>
  );

  const renderUserControls = () => (
    <div className="mt-6 flex space-x-4">
      <button
        onClick={() => setIsChangePasswordModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Change Password
      </button>
      <button
        onClick={() => handleNavigation('/product')}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Product Inventory
      </button>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );

  if (!isAuthenticated) return null; // Optional: Add a loader or message

  return (
    <div className="min-h-screen bg-gray-100 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome to the dashboard!</p>
          <p className="mt-4 text-sm text-gray-500">
            This project demonstrates a backend powered by Java Spring Boot and a frontend using Next.js.
          </p>

          {loading ? (
            <p className="mt-4 text-gray-500">Loading...</p>
          ) : (
            isAdmin ? renderAdminControls() : renderUserControls()
          )}

          <ChangePasswordModal
            isOpen={isChangePasswordModalOpen}
            onClose={() => setIsChangePasswordModalOpen(false)}
          />
          <RegisterModal
            isOpen={isRegisterModalOpen}
            onClose={handleModalClose}
            isAdmin={true}
          />
        </div>

        {isAdmin && (
          <UserTable users={users} onDelete={handleDeleteUser} />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
