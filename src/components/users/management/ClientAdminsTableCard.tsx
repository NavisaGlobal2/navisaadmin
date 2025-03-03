
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClientAdminsTable } from '@/components/users/ClientAdminsTable';
import { User } from '@/types/user';

interface ClientAdminsTableCardProps {
  users: User[];
  setActiveAdmin: (admin: User) => void;
  setAdminClients: (clients: User[]) => void;
  isLoading: boolean;
}

const ClientAdminsTableCard = ({
  users,
  setActiveAdmin,
  setAdminClients,
  isLoading,
}: ClientAdminsTableCardProps) => {
  return (
    <Card className='bg-white/5 border-white/10'>
      <CardHeader className='p-4 md:p-6'>
        <CardTitle>Client Admins And their Clients</CardTitle>
      </CardHeader>
      <CardContent className='p-0'>
        <ClientAdminsTable
          users={users}
          setActiveAdmin={setActiveAdmin}
          setAdminClients={setAdminClients}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
};

export default ClientAdminsTableCard;
