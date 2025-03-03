
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { User } from '@/types/user';
import { Copy, Power, Shield, UserCheck, UserX } from 'lucide-react';
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
}

export const ClientsTable = ({ users }: UsersTableProps) => {
  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({
      title: 'User ID copied',
      description: 'User ID has been copied to clipboard',
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
            {/* <TableHead>Country</TableHead>
            <TableHead>Status</TableHead> */}
            {/* <TableHead>Expert</TableHead> */}
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
              <TableCell>
                <span>{user.email}</span>
              </TableCell>
              <TableCell>{user.visa_type}</TableCell>
              {/* <TableCell>{user.country}</TableCell>
              <TableCell>{user.status}</TableCell> */}
              {/* <TableCell>{user?.client_admin?.name ? user.client_admin.name : 'not assigned'}</TableCell> */}
              <TableCell>{new Date(user.updated_at).toDateString()}</TableCell>
              <TableCell>
                {/* <div className='flex items-center gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => {
                      setSelectedUserForAssignment(user);
                      setOpenAdminCreationDialog(true);
                    }}
                  >
                    <Shield className='h-4 w-4' />
                  </Button>

                 

                 
                </div> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TooltipProvider>
  );
};
