import React from 'react';
import { UserSubmission } from '../../types';
import { MapPin, Home, Navigation } from 'lucide-react';

interface LocationInfoProps {
  data: UserSubmission;
}

const LocationInfo: React.FC<LocationInfoProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Location Details</h2>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <MapPin className="h-5 w-5 text-teal-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-500 font-medium">Region</p>
            <div className="flex flex-wrap gap-x-1">
              <span className="text-gray-800">{data.state},</span>
              <span className="text-gray-800">{data.district},</span>
              <span className="text-gray-800">{data.ward}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-start">
          <Home className="h-5 w-5 text-teal-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-500 font-medium">Street Address</p>
            <p className="text-gray-800">{data.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;