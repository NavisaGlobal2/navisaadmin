
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ClientsTable } from '@/components/users/ClientsTable';
import { User } from '@/types/user';

interface AdminClientsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  adminClients: User[];
  activeAdmin: User | null;
}

const AdminClientsDialog = ({
  isOpen,
  onOpenChange,
  adminClients,
  activeAdmin,
}: AdminClientsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Admin Clients</DialogTitle>
          <DialogDescription>Clients for {activeAdmin?.first_name}</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='space-y-2'>
            <ClientsTable users={adminClients} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminClientsDialog;
