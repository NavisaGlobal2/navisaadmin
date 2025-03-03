
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClientAdminsTable } from '@/components/users/ClientAdminsTable';
import { User } from '@/types/user';
import { AlertTriangle } from 'lucide-react';

interface ClientAdminsTableCardProps {
  users: User[];
  setActiveAdmin: (admin: User) => void;
  setAdminClients: (clients: User[]) => void;
  isLoading: boolean;
  hasError?: boolean;
}

const ClientAdminsTableCard = ({
  users,
  setActiveAdmin,
  setAdminClients,
  isLoading,
  hasError = false,
}: ClientAdminsTableCardProps) => {
  return (
    <Card className='bg-white/5 border-white/10'>
      <CardHeader className='p-4 md:p-6'>
        <CardTitle>Client Admins And their Clients</CardTitle>
      </CardHeader>
      <CardContent className='p-0'>
        {hasError ? (
          <div className='flex items-center justify-center p-6 text-red-500'>
            <AlertTriangle className="mr-2 h-5 w-5" />
            <span>Error loading client admins data</span>
          </div>
        ) : (
          <ClientAdminsTable
            users={users}
            setActiveAdmin={setActiveAdmin}
            setAdminClients={setAdminClients}
            isLoading={isLoading}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ClientAdminsTableCard;
