
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { User } from '@/types/user';
import { useToast } from '@/hooks/use-toast';

interface AdminCreationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUser: User | null;
  onCreateClientAdmin: (data: {
    email: string;
    first_name: string;
    last_name: string;
  }) => void;
}

const AdminCreationDialog = ({
  isOpen,
  onOpenChange,
  selectedUser,
  onCreateClientAdmin,
}: AdminCreationDialogProps) => {
  const { toast } = useToast();

  const handleCreateAdmin = () => {
    if (selectedUser) {
      if (!selectedUser.email || !selectedUser.first_name || !selectedUser.last_name) {
        toast({
          title: 'Missing Information',
          description: 'Email, first name, and last name are required',
          variant: 'destructive',
        });
        return;
      }

      onCreateClientAdmin({
        email: selectedUser.email,
        first_name: selectedUser.first_name,
        last_name: selectedUser.last_name,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Client Admin</DialogTitle>
          <DialogDescription>Create a new client admin</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input placeholder='Enter Email' value={selectedUser?.email} disabled />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='first_name'>First Name</Label>
            <Input placeholder='Enter First Name' disabled value={selectedUser?.first_name} />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='last_name'>Last Name</Label>
            <Input placeholder='' value={selectedUser?.last_name} disabled />
          </div>

          <Button
            onClick={handleCreateAdmin}
            className='w-full'
          >
            <Shield className='w-4 h-4 mr-2' />
            Create Client Admin
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminCreationDialog;
