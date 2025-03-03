
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SuperAdminsTable } from '@/components/users/SuperAdminTable';
import { User } from '@/types/user';
import { AlertTriangle } from 'lucide-react';

interface SuperAdminsTableCardProps {
  users: User[];
  isLoading: boolean;
  hasError?: boolean;
}

const SuperAdminsTableCard = ({ users, isLoading, hasError = false }: SuperAdminsTableCardProps) => {
  return (
    <Card className='bg-white/5 border-white/10'>
      <CardHeader className='p-4 md:p-6'>
        <CardTitle>Super Admins</CardTitle>
      </CardHeader>
      <CardContent className='p-0'>
        {hasError ? (
          <div className='flex items-center justify-center p-6 text-red-500'>
            <AlertTriangle className="mr-2 h-5 w-5" />
            <span>Error loading super admins data</span>
          </div>
        ) : (
          <SuperAdminsTable users={users} isLoading={isLoading} />
        )}
      </CardContent>
    </Card>
  );
};

export default SuperAdminsTableCard;
