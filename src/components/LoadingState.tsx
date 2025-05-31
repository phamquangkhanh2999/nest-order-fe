import React from 'react';
import { Spin } from 'antd';

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Spin size="large" />
      <p className="text-gray-600 font-medium mt-4">Đang tải dữ liệu...</p>
    </div>
  );
};

export default LoadingState;