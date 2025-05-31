import React from 'react';
import { UserSubmission } from '../../types';
import { Package } from 'lucide-react';

interface ProductInfoProps {
  data: UserSubmission;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Product Details</h2>
      
      <div className="flex items-start">
        <Package className="h-5 w-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <p className="text-sm text-gray-500 font-medium">Product Notes</p>
          <p className="text-gray-800">{data.product_note}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;