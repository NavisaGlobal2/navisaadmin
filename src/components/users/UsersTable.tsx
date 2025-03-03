import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { User } from '@/types/user';
import { Copy, Delete, Loader2, Power, Shield, UserCheck, UserX } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { adminApi } from '@/services/api';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  isLoading?: boolean;
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
  isLoading = false,
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
    <TooltipProvider>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Visa Type</TableHead>
            <TableHead>Expert</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                <div className="flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
                  <span>Loading users...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow 
                key={user.id} 
                className="cursor-pointer hover:bg-muted"
                onClick={() => onUserSelect(user.id)}
              >
                <TableCell className='flex items-center gap-2 mt-2'>
                  <span>{user.id}</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
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
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy ID</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  {user.first_name} {user.last_name}
                </TableCell>
                <TableCell>
                  <span>{user.email}</span>
                </TableCell>
                <TableCell>{user.visa_type}</TableCell>
                <TableCell>{user?.client_admin?.name ? user.client_admin.name : 'not assigned'}</TableCell>
                <TableCell>{new Date(user.updated_at).toDateString()}</TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Tooltip>
                      <TooltipTrigger asChild>
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
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Create Client Admin</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
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
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Assign Expert</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
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
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Make Super Admin</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TooltipProvider>
  );
};
