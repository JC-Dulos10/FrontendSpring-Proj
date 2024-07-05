// components/CreateProductModal.tsx
import { useState } from 'react';

type CreateProductModalProps = {
  isOpen: boolean;
  onCreateSuccess: (newProduct: any) => void;
  onClose: () => void;
};

const CreateProductModal: React.FC<CreateProductModalProps> = ({ isOpen, onCreateSuccess, onClose }) => {
  const [productName, setProductName] = useState<string>('');
  const [productPrice, setProductPrice] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCreateProduct = async () => {
    // Validate input fields
    if (!productName || !productPrice || parseFloat(productPrice) <= 0) {
      setError('Please enter valid product name and price.');
      return;
    }

    setLoading(true);
    setError('');

    const token = localStorage.getItem('token');

    try {
      const response = await fetch (`${process.env.productURL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            productName,
            productPrice,
          }),
        }
      );
      
      if (response.status == 201){
        setLoading(false);
        setProductName('');
        setProductPrice('');
        onCreateSuccess(response.json); // Pass newly created product back to parent component
        setError(''); // Clear the error state
          setTimeout(() => {
            onClose();
            setSuccess(''); // Clear success message after some time
          }, 2000);
      }else {
        // Handle error response (text or JSON)
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          // If response is JSON
          setLoading(false);
          const jsonError = await response.json();
          setError(jsonError.message || 'Failed to create product');
        } else {
          // If response is plain text
          setLoading(false);
          const textError = await response.text();
          setError(textError || 'Failed to create product');
        }
      }
    } catch (error) {
      setError('Error to create product');
      setLoading(false);
      setSuccess(''); // Clear success message if there's an error
    }
  };

  const handlePriceChange = (value: string) => {
    // Remove non-digit characters except decimal point
    const sanitizedValue = value.replace(/[^0-9.]/g, '');

    // Validate the format of the price (optional: enforce decimal places)
    // Example: allow up to two decimal places
    const regex = /^\d+(\.\d{0,2})?$/;
    if (regex.test(sanitizedValue)) {
      setProductPrice(sanitizedValue);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-black text-2xl font-bold mb-4">Create New Product</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                className="text-black border border-gray-300 rounded-md py-2 px-3 w-full"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productPrice">
                Product Price
              </label>
              <input
                type="text"
                id="productPrice"
                className="text-black border border-gray-300 rounded-md py-2 px-3 w-full"
                value={productPrice}
                onChange={(e) => handlePriceChange(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleCreateProduct}
                disabled={loading}
                className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 mr-2 ${
                  loading && 'opacity-50 cursor-not-allowed'
                }`}
              >
                {loading ? 'Creating...' : 'Create'}
              </button>
              <button
                onClick={onClose}
                disabled={loading}
                className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 ${
                  loading && 'opacity-50 cursor-not-allowed'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateProductModal;
