
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { AlertTriangle } from 'lucide-react';

const UserManagementError = () => {
  return (
    <DashboardLayout>
      <div className='flex items-center justify-center h-full'>
        <div className='text-center text-red-500 flex items-center'>
          <AlertTriangle className="mr-2 h-6 w-6" />
          <div>Error loading users. Please try again later.</div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserManagementError;
