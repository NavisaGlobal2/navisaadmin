
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UsersTable } from '@/components/users/UsersTable';
import { User } from '@/types/user';

interface UsersTableCardProps {
  users: User[];
  onAssignExpert: (userId: string) => void;
  onSuspendUser: (userId: string) => void;
  onActivateUser: (userId: string) => void;
  onManageRoles: (user: User) => void;
  setSelectedUserForAssignment: (user: User | null) => void;
  setOpenAssignmentDialog: (open: boolean) => void;
  setOpenAdminCreationDialog: (open: boolean) => void;
  onUserSelect: (userId: string) => void;
  isLoading: boolean;
}

const UsersTableCard = ({
  users,
  onAssignExpert,
  onSuspendUser,
  onActivateUser,
  onManageRoles,
  setSelectedUserForAssignment,
  setOpenAssignmentDialog,
  setOpenAdminCreationDialog,
  onUserSelect,
  isLoading,
}: UsersTableCardProps) => {
  return (
    <Card className='bg-white/5 border-white/10'>
      <CardHeader className='p-4 md:p-6'>
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent className='p-0'>
        <UsersTable
          users={users}
          onAssignExpert={onAssignExpert}
          onSuspendUser={onSuspendUser}
          onActivateUser={onActivateUser}
          onManageRoles={onManageRoles}
          setSelectedUserForAssignment={setSelectedUserForAssignment}
          setOpenAssignmentDialog={setOpenAssignmentDialog}
          setOpenAdminCreationDialog={setOpenAdminCreationDialog}
          onUserSelect={onUserSelect}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
};

export default UsersTableCard;
