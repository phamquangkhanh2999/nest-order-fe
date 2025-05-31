import React from 'react';
import { UserSubmission } from '../types';
import ContactInfo from './UserInfo/ContactInfo';
import LocationInfo from './UserInfo/LocationInfo';
import ProductInfo from './UserInfo/ProductInfo';

interface SubmissionDetailsProps {
  data: UserSubmission;
}

const SubmissionDetails: React.FC<SubmissionDetailsProps> = ({ data }) => {
  return (
    <div className="animate-fadeIn">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Submission Details</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ContactInfo data={data} />
        <LocationInfo data={data} />
        <ProductInfo data={data} />
      </div>
    </div>
  );
};

export default SubmissionDetails;