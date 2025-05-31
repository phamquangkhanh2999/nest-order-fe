import React from 'react';
import { ClipboardList } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <ClipboardList className="h-8 w-8 mr-3" />
        <h1 className="text-xl md:text-2xl font-bold">Danh sách order hàng</h1>
      </div>
    </header>
  );
};

export default Header;