
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { UserFilters } from '@/components/users/UserFilters';

interface UserFiltersCardProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  visaFilter: string;
  setVisaFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

const UserFiltersCard = ({
  searchTerm,
  setSearchTerm,
  visaFilter,
  setVisaFilter,
  statusFilter,
  setStatusFilter,
}: UserFiltersCardProps) => {
  return (
    <Card className='bg-white/5 border-white/10'>
      <CardContent className='p-4 md:p-6'>
        <UserFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          visaFilter={visaFilter}
          setVisaFilter={setVisaFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      </CardContent>
    </Card>
  );
};

export default UserFiltersCard;
