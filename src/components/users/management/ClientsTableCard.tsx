
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClientsTable } from '@/components/users/ClientsTable';
import { User } from '@/types/user';

interface ClientsTableCardProps {
  clients: User[];
  isLoading: boolean;
}

const ClientsTableCard = ({ clients, isLoading }: ClientsTableCardProps) => {
  return (
    <Card className='bg-white/5 border-white/10'>
      <CardHeader className='p-4 md:p-6'>
        <CardTitle>Clients</CardTitle>
      </CardHeader>
      <CardContent className='p-0'>
        <ClientsTable users={clients} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
};

export default ClientsTableCard;
