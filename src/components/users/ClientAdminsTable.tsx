import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { User } from '@/types/user';
import {
  Copy,
  Delete,
  DeleteIcon,
  Loader2,
  LucideRemoveFormatting,
  RemoveFormatting,
  Shield,
  UserCheck,
  UserRoundMinusIcon,
  Users,
  UserX,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { adminApi } from '@/services/api';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UsersTableProps {
  users: User[];
  setAdminClients: (clients: User[]) => void;
  setActiveAdmin: (admin: User) => void;
  isLoading?: boolean;
}

export const ClientAdminsTable = ({ users, setAdminClients, setActiveAdmin, isLoading = false }: UsersTableProps) => {
  const { toast } = useToast();
  
  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({
      title: 'User ID copied',
      description: 'User ID has been copied to clipboard',
    });
  };

  const deleteClientAdmin = async (id: string) => {
    try {
      await adminApi.deleteClientAdmin(id);
      toast({
        title: 'Client Admin Deleted',
        description: 'Client Admin has been deleted',
      });
    } catch (error) {
      // Error will be handled by the global interceptor
      console.error('Error deleting client admin:', error);
    }
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
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                <div className="flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
                  <span>Loading client admins...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No client admins found.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
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
            ))
          )}
        </TableBody>
      </Table>
    </TooltipProvider>
  );
};
