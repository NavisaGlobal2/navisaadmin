
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { User } from '@/types/user';
import { Copy, Power, Shield, UserCheck, UserX } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { adminApi } from '@/services/api';

interface UsersTableProps {
  users: User[];
  onAssignExpert: (userId: string) => void;
  onSuspendUser: (userId: string) => void;
  onActivateUser: (userId: string) => void;
  onManageRoles: (user: User) => void;
  setSelectedUserForAssignment: (user: User | null) => void;
  setOpenAssignmentDialog: (open: boolean) => void;
  setOpenAdminCreationDialog: (open: boolean) => void;
  onUserSelect: (userId: string) => void;
}

export const UsersTable = ({
  users,
  onAssignExpert,
  onSuspendUser,
  onActivateUser,
  onManageRoles,
  setSelectedUserForAssignment,
  setOpenAssignmentDialog,
  setOpenAdminCreationDialog,
  onUserSelect,
}: UsersTableProps) => {
  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({
      title: 'User ID copied',
      description: 'User ID has been copied to clipboard',
    });
  };

  const createSuperAdmin = async (email: string) => {
    await adminApi
      .createSuperAdmin(email)
      .then(() => {
        toast({
          title: 'Super Admin Created',
          description: email + ' has been made a super admin',
        });
      })
      .catch((error) => {
        toast({
          title: 'Error',
          description: error.response.data.message,
        });
      });
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Visa Type</TableHead>
          {/* <TableHead>Country</TableHead>
          <TableHead>Status</TableHead> */}
          <TableHead>Expert</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow 
            key={user.id} 
            className="cursor-pointer hover:bg-muted"
            onClick={() => onUserSelect(user.id)}
          >
            <TableCell className='flex items-center gap-2 mt-2'>
              <span>{user.id}</span>
              <Button 
                variant='outline' 
                size='icon' 
                className='w-3 h-3' 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent row click event
                  handleCopyId(user.id);
                }}
              >
                <Copy className='h-4 w-4' />
              </Button>
            </TableCell>
            <TableCell>
              {user.first_name} {user.last_name}
            </TableCell>
            <TableCell>
              <span>{user.email}</span>
            </TableCell>
            <TableCell>{user.visa_type}</TableCell>
            {/* <TableCell>{user.country}</TableCell>
            <TableCell>{user.status}</TableCell> */}
            <TableCell>{user?.client_admin?.name ? user.client_admin.name : 'not assigned'}</TableCell>
            <TableCell>{new Date(user.updated_at).toDateString()}</TableCell>
            <TableCell>
              <div className='flex items-center gap-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent row click event
                    setSelectedUserForAssignment(user);
                    setOpenAdminCreationDialog(true);
                  }}
                >
                  <Shield className='h-4 w-4' />
                </Button>

                <Button
                  variant='outline'
                  size='sm'
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent row click event
                    setSelectedUserForAssignment(user);
                    setOpenAssignmentDialog(true);
                  }}
                >
                  <UserCheck className='h-4 w-4' />
                </Button>

                <Button
                  variant='outline'
                  size='sm'
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent row click event
                    createSuperAdmin(user.email);
                  }}
                >
                  <Power className='h-4 w-4' />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
