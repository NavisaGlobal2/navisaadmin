
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '@/types/user';

interface UserStatsProps {
  users: User[];
}

const UserStats = ({ users }: UserStatsProps) => {
  const stats = [
    {
      title: 'Total Users',
      value: users?.length || 0,
      description: 'Active users in the system',
    },
    {
      title: 'Active Users',
      value: users?.filter((user) => user.status === 'Active').length || 0,
      description: 'Currently active accounts',
    },
    {
      title: 'Pending Users',
      value: users?.filter((user) => user.status === 'Pending').length || 0,
      description: 'Awaiting verification',
    },
  ];

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {stats.map((stat, index) => (
        <Card key={index} className='bg-white/5 border-white/10'>
          <CardHeader>
            <CardTitle className='text-sm font-medium text-gray-400'>{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold mb-1'>{stat.value}</div>
            <p className='text-sm text-gray-400'>{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserStats;
