
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

const UserManagementHeader = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
      <div>
        <h1 className='text-2xl font-semibold'>User Management</h1>
        <p className='text-sm text-gray-400 mt-1'>Manage user accounts and roles</p>
      </div>
      <Button size='default' className='w-full sm:w-auto'>
        <UserPlus className='w-4 h-4 mr-2' />
        Add User
      </Button>
    </div>
  );
};

export default UserManagementHeader;
