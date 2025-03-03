
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User } from '@/types/user';

interface AssignmentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUser: User | null;
  adminId: string;
  setAdminId: (id: string) => void;
  onAssignExpert: (userId: string, adminId: string) => void;
}

const AssignmentDialog = ({
  isOpen,
  onOpenChange,
  selectedUser,
  adminId,
  setAdminId,
  onAssignExpert,
}: AssignmentDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Expert</DialogTitle>
          <DialogDescription>Assign an expert to {selectedUser?.first_name}</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='role'>Expert Assignment</Label>
            <Input placeholder='Enter Admin ID' onChange={(e) => setAdminId(e.target.value)} />
            <Button onClick={() => selectedUser && onAssignExpert(selectedUser.id, adminId)}>Assign Expert</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentDialog;
