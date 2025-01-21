'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ProductTable from '@/components/ProductTable';
import CreateProductModal from '@/components/CreateProductModal';

const parseBoolean = (str: String) => {
  return str.toLowerCase() === 'true';
};

const ProductPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<any[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const adminParam = parseBoolean(localStorage.getItem('admin') || 'false');

    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
      setIsAdmin(adminParam);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const fetchProducts = async () => {
        try {
          const response = await axios.get(`${process.env.productURL}`, config);
          if (response.status === 200) {
            setProducts(response.data);
          }
        } catch (error) {
          console.error('Error fetching product data:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [router]);

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    router.push('/login');
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`${process.env.productURL}/${id}`, config);
      setProducts(products.filter(product => product.productId !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdateProduct = (id: number) => {
    console.log(`Update product with ID: ${id}`);
    window.location.reload();
  };

  const handleCreateProduct = async (newProduct: any) => {
    window.location.reload();
    setIsCreateModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Product Inventory</h1>
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-600">
            Welcome to the product inventory page. Here you can manage and view all your products.
          </p>
          <p className="mt-4 mb-6 text-xs sm:text-sm lg:text-base text-gray-500">
            This page is a simple demo to showcase how you can create a product inventory page using Next.js.
          </p>
          {loading ? (
            <p className="mt-4 text-gray-500">Loading...</p>
          ) : (
            <ProductTable products={products} isAdmin={isAdmin} onDelete={handleDeleteProduct} />
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-3">
          {isAdmin && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="w-full xxs:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Create Product
            </button>
          )}
          <button
            onClick={handleLogout}
            className="w-full xxs:w-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Logout
          </button>
          <a href="/product" className='w-full xxs:w-auto'>
            <button className="w-full xxs:w-auto px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700">
              Refresh
            </button>
          </a>
          <a href="/dashboard" className='w-full xxs:w-auto'>
            <button className="w-full xxs:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Back
            </button>
          </a>
        </div>
      </div>
      <CreateProductModal
        isOpen={isCreateModalOpen}
        onCreateSuccess={handleCreateProduct}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default ProductPage;
