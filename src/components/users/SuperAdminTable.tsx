import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { User } from '@/types/user';
import { Copy, Delete, Power, Shield, UserCheck, UserX } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { adminApi } from '@/services/api';

interface UsersTableProps {
  users: User[];
}

export const SuperAdminsTable = ({ users }: UsersTableProps) => {
  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({
      title: 'User ID copied',
      description: 'User ID has been copied to clipboard',
    });
  };

  const removeSuperAdmin = async (email: string) => {
    await adminApi
      .removeSuperAdmin(email)
      .then(() => {
        toast({
          title: 'Super Admin Removed',
          description: email + ' has been removed as a super admin',
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
          <TableHead>Email</TableHead>

          {/* <TableHead>Country</TableHead>
          <TableHead>Status</TableHead> */}
          {/* <TableHead>Expert</TableHead> */}
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className=' flex items-center gap-2 mt-2'>
              <span>{user.id}</span>
              <Button variant='outline' size='icon' className=' w-3 h-3' onClick={() => handleCopyId(user.id)}>
                <Copy className='h-4 w-4' />
              </Button>
            </TableCell>
            {/* <TableCell>
              {user.first_name} {user.last_name}
            </TableCell> */}
            <TableCell>
              <span>{user.email}</span>
            </TableCell>
            {/* <TableCell>{user.country}</TableCell>
            <TableCell>{user.status}</TableCell> */}
            {/* <TableCell>{user?.client_admin?.name ? user.client_admin.name : 'not assigned'}</TableCell> */}
            <TableCell>{new Date(user.created_at).toDateString()}</TableCell>
            <TableCell>
              <div className='flex items-center gap-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => {
                    removeSuperAdmin(user.email);
                  }}
                >
                  <Delete className='h-4 w-4' />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
