import React, { useState } from 'react';
import UpdateProductModal from './UpdateProductModal';

interface Product {
  productId: number;
  productName: string;
  productPrice: number;
}

interface Props {
  products: Product[];
  isAdmin: boolean;
  onDelete: (id: number) => void;
}

const ProductTable: React.FC<Props> = ({ products, isAdmin, onDelete }) => {
  const [isUpdateProductModalOpen, setIsUpdateProductModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpenUpdateProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsUpdateProductModalOpen(true);
  };

  const handleCloseUpdateProductModal = () => {
    setIsUpdateProductModalOpen(false);
    setSelectedProduct(null);
    window.location.reload();
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            {isAdmin && (
              <>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Update
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delete
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.productId}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {product.productId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.productName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.productPrice}
              </td>
              {isAdmin && (
                <>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleOpenUpdateProductModal(product)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Update
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => onDelete(product.productId)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedProduct && (
        <UpdateProductModal
          isOpen={isUpdateProductModalOpen}
          onClose={handleCloseUpdateProductModal}
          productId={selectedProduct.productId}
        />
      )}
    </div>
  );
};

export default ProductTable;
