// components/UpdateProductModal.tsx
"use client"; 

import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

type UpdateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
};

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({ isOpen, onClose, productId }) => {
  const [productName, setProductName] = useState<string>('');
  const [productPrice, setProductPrice] = useState<number>(0);

  useEffect(() => {
    if (isOpen) {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/products/${productId}`, config);
          const product = response.data;
          setProductName(product.productName);
          setProductPrice(product.productPrice);
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      };
      fetchProduct();
    }
  }, [isOpen, productId]);

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.put(
        `http://localhost:8080/api/v1/products/${productId}`,
        { productName, productPrice },
        config
      );
      onClose();
      window.location.reload();
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error('Error response:', axiosError.response.data);
      } else {
        console.error('Error:', axiosError.message);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-black text-2xl font-semibold mb-4">Update Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
              Product Price
            </label>
            <input
              type="number"
              id="productPrice"
              value={productPrice}
              onChange={(e) => setProductPrice(Number(e.target.value))}
              className="text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;
