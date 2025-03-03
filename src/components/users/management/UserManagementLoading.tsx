
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Loader2 } from 'lucide-react';

const UserManagementLoading = () => {
  return (
    <DashboardLayout>
      <div className='flex items-center justify-center h-full'>
        <div className='text-center'>
          <div className="flex items-center justify-center mb-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
          <div>Loading user data...</div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserManagementLoading;
