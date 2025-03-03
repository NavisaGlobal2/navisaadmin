
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SuperAdminsTable } from '@/components/users/SuperAdminTable';
import { User } from '@/types/user';

interface SuperAdminsTableCardProps {
  users: User[];
  isLoading: boolean;
}

const SuperAdminsTableCard = ({ users, isLoading }: SuperAdminsTableCardProps) => {
  return (
    <Card className='bg-white/5 border-white/10'>
      <CardHeader className='p-4 md:p-6'>
        <CardTitle>Super Admins</CardTitle>
      </CardHeader>
      <CardContent className='p-0'>
        <SuperAdminsTable users={users} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
};

export default SuperAdminsTableCard;
