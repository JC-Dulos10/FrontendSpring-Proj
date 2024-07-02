'use client';
// Import necessary modules
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { request } from 'http';
import UserTable from '@/components/UserTable';
import ChangePasswordModal from '@/components/ChangePasswordModal';


const DashboardPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [users, setUsers] = useState<any[]>([]); // State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal state

  useEffect(() => {
    const token = localStorage.getItem('token');

    
    if (!token) {
      router.push('/login'); // Redirect to login page if token is not present
    } else {
      // Optionally, you can verify the token here
      setIsAuthenticated(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // JWT token in Authorization header
        },
      };

      const fetchData = async () => {
        try{
            // Make GET request to fetch user data
            const response = await axios.get('http://localhost:8080/api/v1/users', config);
            if (response.status === 200) {
                setIsAdmin(true); // User is admin
                setUsers(response.data);
              } else {
                setIsAdmin(false); // Assume user is not admin for any other status
              }
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                if (axiosError.response.status === 403) {
                    setIsAdmin(false); // User is not admin (403 Forbidden)
                } else {
                    console.error('Error fetching user data:', axiosError,request);
                }
            } else if (axiosError.request) {
                console.error('Request error:', axiosError.request);
            } else {
                console.error('Error:', axiosError.message);
            }
        } finally {
            setLoading(false); // Set loading state to false after fetching data
        }
      };
      fetchData();
    }
  }, [router]);
  

  if (!isAuthenticated) {
    // Return null or a loading indicator if not authenticated (optional)
    return null;
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome to the dashboard!</p>
          <p className="mt-4 text-sm text-gray-500">
            This project is created as a demo to showcase the functionality of a backend server created using Java Spring Boot
            and a frontend using Next.js.
          </p>
          {loading ? (
            <p className="mt-4 text-gray-500">Loading...</p>
          ) : isAdmin ? (
            <>
              <p className="mt-4 text-green-600">You are an admin!</p>
              <UserTable users={users} /> 
              <div className="mt-4 flex space-x-4">
                <button
                    onClick={handleOpenModal}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Change Password
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
              <ChangePasswordModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
              />
            </>
          ) : (
            <p className="mt-4 text-red-600">You are not authorized as admin.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

