import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { User } from '@/types/user';
import { Copy, Delete, Loader2, Power, Shield, UserCheck, UserX } from 'lucide-react';
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
  isLoading?: boolean;
}

export const SuperAdminsTable = ({ users, isLoading = false }: UsersTableProps) => {
  const { toast } = useToast();
  
  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({
      title: 'User ID copied',
      description: 'User ID has been copied to clipboard',
    });
  };

  const removeSuperAdmin = async (email: string) => {
    try {
      await adminApi.removeSuperAdmin(email);
      toast({
        title: 'Super Admin Removed',
        description: email + ' has been removed as a super admin',
      });
    } catch (error) {
      // Error will be handled by the global interceptor
      console.error('Error removing super admin:', error);
    }
  };
  
  return (
    <TooltipProvider>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                <div className="flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
                  <span>Loading super admins...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No super admins found.
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
                  <span>{user.email}</span>
                </TableCell>
                <TableCell>{new Date(user.created_at).toDateString()}</TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => {
                            removeSuperAdmin(user.email);
                          }}
                        >
                          <Delete className='h-4 w-4' />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Remove Super Admin</p>
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
