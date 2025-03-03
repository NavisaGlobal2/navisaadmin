
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UsersTable } from '@/components/users/UsersTable';
import { User } from '@/types/user';
import { AlertTriangle } from 'lucide-react';

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
  hasError?: boolean;
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
  hasError = false,
}: UsersTableCardProps) => {
  return (
    <Card className='bg-white/5 border-white/10'>
      <CardHeader className='p-4 md:p-6'>
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent className='p-0'>
        {hasError ? (
          <div className='flex items-center justify-center p-6 text-red-500'>
            <AlertTriangle className="mr-2 h-5 w-5" />
            <span>Error loading users data</span>
          </div>
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
};

export default UsersTableCard;
