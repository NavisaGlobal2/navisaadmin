
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { User } from '@/types/user';
import {
  Copy,
  Delete,
  DeleteIcon,
  LucideRemoveFormatting,
  RemoveFormatting,
  Shield,
  UserCheck,
  UserRoundMinusIcon,
  Users,
  UserX,
} from 'lucide-react';
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
  //   onSuspendUser: (userId: string) => void;
  //   onManageRoles: (user: User) => void;
  setAdminClients: (clients: User[]) => void;
  setActiveAdmin: (admin: User) => void;
}

export const ClientAdminsTable = ({ users, setAdminClients, setActiveAdmin }: UsersTableProps) => {
  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({
      title: 'User ID copied',
      description: 'User ID has been copied to clipboard',
    });
  };

  const deleteClientAdmin = async (id: string) => {
    await adminApi
      .deleteClientAdmin(id)
      .then(() => {
        toast({
          title: 'Client Admin Deleted',
          description: 'Client Admin has been deleted',
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

            <TableHead>Last Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className=' flex items-center gap-2 mt-2'>
                <span>{user.id}</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant='outline' size='icon' className=' w-3 h-3' onClick={() => handleCopyId(user.id)}>
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
              <TableCell>{user.email}</TableCell>
              <TableCell>{new Date(user.updated_at).toDateString()}</TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => {
                          setActiveAdmin(user);
                          setAdminClients(users.find((client) => client.id === user.id).clients);
                        }}
                      >
                        <Users className='h-4 w-4' />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View Clients</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant='outline' size='sm' onClick={() => {}}>
                        <UserX className='h-4 w-4' />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Remove User</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant='outline' size='sm' onClick={() => deleteClientAdmin(user.id)}>
                        <UserRoundMinusIcon className='h-4 w-4' />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete Admin</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TooltipProvider>
  );
};
