import React from 'react';
import { UserSubmission } from '../../types';
import { Phone, User, MessageSquare } from 'lucide-react';

interface ContactInfoProps {
  data: UserSubmission;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Contact Information</h2>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <User className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-500 font-medium">Full Name</p>
            <p className="text-gray-800">{data.name}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Phone className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-500 font-medium">Phone Number</p>
            <p className="text-gray-800">{data.phone}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <MessageSquare className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-500 font-medium">Message</p>
            <p className="text-gray-800">{data.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;