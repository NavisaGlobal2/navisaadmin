
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClientsTable } from '@/components/users/ClientsTable';
import { User } from '@/types/user';
import { AlertTriangle } from 'lucide-react';

interface ClientsTableCardProps {
  clients: User[];
  isLoading: boolean;
  hasError?: boolean;
}

const ClientsTableCard = ({ clients, isLoading, hasError = false }: ClientsTableCardProps) => {
  return (
    <Card className='bg-white/5 border-white/10'>
      <CardHeader className='p-4 md:p-6'>
        <CardTitle>Clients</CardTitle>
      </CardHeader>
      <CardContent className='p-0'>
        {hasError ? (
          <div className='flex items-center justify-center p-6 text-red-500'>
            <AlertTriangle className="mr-2 h-5 w-5" />
            <span>Error loading clients data</span>
          </div>
        ) : (
          <ClientsTable users={clients} isLoading={isLoading} />
        )}
      </CardContent>
    </Card>
  );
};

export default ClientsTableCard;
