
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';

const UserManagementError = () => {
  return (
    <DashboardLayout>
      <div className='flex items-center justify-center h-full'>
        <div className='text-center text-red-500'>Error loading users. Please try again later.</div>
      </div>
    </DashboardLayout>
  );
};

export default UserManagementError;
