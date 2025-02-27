import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { UserPlus, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { UserFilters } from '@/components/users/UserFilters';
import { UsersTable } from '@/components/users/UsersTable';
import { User } from '@/types/user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { adminApi } from '@/services/api';
import { ClientAdminsTable } from '@/components/users/ClientAdminsTable';
import { Input } from '@/components/ui/input';
import { ClientsTable } from '@/components/users/ClientsTable';

const UserManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [visaFilter, setVisaFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [activeAdmin, setActiveAdmin] = useState<User | null>(null);

  /// Assignment Dialog
  const [openAssignmentDialog, setOpenAssignmentDialog] = useState(false);
  const [selectedUserForAssignment, setSelectedUserForAssignment] = useState<User | null>(null);
  const [adminId, setAdminId] = useState<string>('');

  //Admin Creation Dialog
  const [openAdminCreationDialog, setOpenAdminCreationDialog] = useState(false);
  const [password, setPassword] = useState<string>('');

  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  // Fetch users with error handling
  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      console.log('Fetching users...');
      const response = await adminApi.getAllUsers();
      console.log('API Response:', response);

      toast({
        title: 'Users Loaded',
        description: 'Users have been successfully loaded',
        // variant: 'success',
      });
      return response.data;
    },
    onError: (error) => {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to fetch users',
        variant: 'destructive',
      });
    },
  });

  const {
    data: clientAdmins = [],
    isLoading: clientAdminsLoading,
    error: clientAdminsError,
  } = useQuery({
    queryKey: ['clientAdmins'],
    queryFn: async () => {
      console.log('Fetching users...');
      const response = await adminApi.getAllClientAdminsWithClients();
      console.log('API Response:', response);

      toast({
        title: 'Client Admins Loaded',
        description: 'Client Admins have been successfully loaded',
        // variant: 'success',
      });
      return response.data;
    },
    onError: (error) => {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to fetch users',
        variant: 'destructive',
      });
    },
  });

  // const {
  //   data: clients = [],
  //   isLoading: clientsLoading,
  //   error: clientsError,
  // } = useQuery({
  //   queryKey: ['clients'],
  //   queryFn: async () => {
  //     console.log('Fetching users...');
  //     const response = await adminApi();
  //     console.log('API Response:', response);

  //     toast({
  //       title: 'Client Admins Loaded',
  //       description: 'Client Admins have been successfully loaded',
  //       // variant: 'success',
  //     });
  //     return response.data;
  //   },
  //   onError: (error) => {
  //     console.error('Error fetching users:', error);
  //     toast({
  //       title: 'Error',
  //       description: error instanceof Error ? error.message : 'Failed to fetch users',
  //       variant: 'destructive',
  //     });
  //   },
  // });

  const assignExpert = async (userId: string, adminId: string) => {
    await adminApi
      .assignClient({ client_id: userId, admin_id: adminId })
      .then((res) => {
        console.log(res);
        // setOpenAssignmentDialog(false);
        toast({
          title: 'Expert Assigned',
          description: `Expert has been assigned to user ${userId}`,
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: 'Error',
          description: 'Failed to assign expert',
          variant: 'destructive',
        });
      });
  };

  const createClientAdmin = async (data: {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
  }) => {
    await adminApi
      .createClientAdmin(data)
      .then(() => {
        toast({
          title: 'Client Admin Created',
          description: 'Client Admin has been created',
        });

        setOpenAdminCreationDialog(false);
      })
      .catch((error) => {
        toast({
          title: 'Error',
          description: error.response.data.message,
        });
      });
  };

  const handleAssignExpert = (userId: string) => {
    toast({
      title: 'Expert Assigned',
      description: `Expert has been assigned to user ${userId}`,
    });
  };

  const handleSuspendUser = (userId: string) => {
    toast({
      title: 'User Suspended',
      description: `User ${userId} has been suspended`,
      variant: 'destructive',
    });
  };

  const handleActivateUser = (userId: string) => {
    toast({
      title: 'User Activated',
      description: `User ${userId} has been activated`,
    });
  };

  const handleAdminClients = (user: User[]) => {
    console.log('Admin Clients:', user);
    setAdminClients(user);
    setOpenDialog(true);
  };

  const handleManageRoles = (user: User) => {
    setSelectedUser(user);
    setIsRoleDialogOpen(true);
  };

  const handleRoleChange = (role: string) => {
    if (!selectedUser) return;

    toast({
      title: 'Role Updated',
      description: `${selectedUser.name}'s role has been updated to ${role}`,
    });
    setIsRoleDialogOpen(false);
  };

  const [adminClients, setAdminClients] = useState<User[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  // useEffect(() => {
  //   const filteredUsers = users
  //     ? users.filter((user: User) => {
  //         const matchesSearch =
  //           user?.name.toLowerCase().includes(searchTerm?.toLowerCase()) ||
  //           user?.email.toLowerCase().includes(searchTerm?.toLowerCase()) ||
  //           user?.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //           {};
  //         const matchesVisa = visaFilter === 'all' || user?.visaType === visaFilter;
  //         const matchesStatus = statusFilter === 'all' || user?.status === statusFilter;
  //         return matchesSearch && matchesVisa && matchesStatus;
  //       })
  //     : [];

  //   setFilteredUsers(filteredUsers);
  // }, [users]);

  const stats = [
    {
      title: 'Total Users',
      value: users?.length || 0,
      description: 'Active users in the system',
    },
    {
      title: 'Active Users',
      value: users?.filter((user) => user.status === 'Active').length || 0,
      description: 'Currently active accounts',
    },
    {
      title: 'Pending Users',
      value: users?.filter((user) => user.status === 'Pending').length || 0,
      description: 'Awaiting verification',
    },
  ];

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className='flex items-center justify-center h-full'>
          <div className='text-center'>Loading users...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className='flex items-center justify-center h-full'>
          <div className='text-center text-red-500'>Error loading users. Please try again later.</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className='space-y-6'>
        {/* Header Section */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
          <div>
            <h1 className='text-2xl font-semibold'>User Management</h1>
            <p className='text-sm text-gray-400 mt-1'>Manage user accounts and roles</p>
          </div>
          <Button size='default' className='w-full sm:w-auto'>
            <UserPlus className='w-4 h-4 mr-2' />
            Add User
          </Button>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {stats.map((stat, index) => (
            <Card key={index} className='bg-white/5 border-white/10'>
              <CardHeader>
                <CardTitle className='text-sm font-medium text-gray-400'>{stat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold mb-1'>{stat.value}</div>
                <p className='text-sm text-gray-400'>{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters Section */}
        <Card className='bg-white/5 border-white/10'>
          <CardContent className='p-4 md:p-6'>
            <UserFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              visaFilter={visaFilter}
              setVisaFilter={setVisaFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className='bg-white/5 border-white/10'>
          <CardHeader className='p-4 md:p-6'>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent className='p-0'>
            <UsersTable
              users={users}
              onAssignExpert={handleAssignExpert}
              onSuspendUser={handleSuspendUser}
              onActivateUser={handleActivateUser}
              onManageRoles={handleManageRoles}
              setSelectedUserForAssignment={setSelectedUserForAssignment}
              setOpenAssignmentDialog={setOpenAssignmentDialog}
              setOpenAdminCreationDialog={setOpenAdminCreationDialog}
            />
          </CardContent>
        </Card>

        <Card className='bg-white/5 border-white/10'>
          <CardHeader className='p-4 md:p-6'>
            <CardTitle>Client Admins And their Clients</CardTitle>
          </CardHeader>
          <CardContent className='p-0'>
            <ClientAdminsTable
              users={clientAdmins}
              setActiveAdmin={setActiveAdmin}
              // onSuspendUser={handleSuspendUser}
              // onManageRoles={handleManageRoles}
              setAdminClients={handleAdminClients}
            />
          </CardContent>
        </Card>

        {/* Role Management Dialog */}
        <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Manage User Role</DialogTitle>
              <DialogDescription>Change the role for {selectedUser?.name}</DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='space-y-2'>
                <Label htmlFor='role'>Role</Label>
                <Select onValueChange={handleRoleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a role' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='admin'>Admin</SelectItem>
                    <SelectItem value='moderator'>Moderator</SelectItem>
                    <SelectItem value='user'>User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Role Management Dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
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

        {/* Assignment Dialog */}
        <Dialog open={openAssignmentDialog} onOpenChange={setOpenAssignmentDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Expert</DialogTitle>
              <DialogDescription>Assign an expert to {selectedUserForAssignment?.first_name}</DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='space-y-2'>
                <Label htmlFor='role'>Expert Assignment</Label>
                <Input placeholder='Enter Admin ID' onChange={(e) => setAdminId(e.target.value)} />
                <Button onClick={() => assignExpert(selectedUserForAssignment?.id, adminId)}>Assign Expert</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Admin Creation Dialog */}
        <Dialog open={openAdminCreationDialog} onOpenChange={setOpenAdminCreationDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Client Admin</DialogTitle>
              <DialogDescription>Create a new client admin</DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input placeholder='Enter Email' value={selectedUserForAssignment?.email} disabled />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='first_name'>First Name</Label>
                <Input placeholder='Enter First Name' disabled value={selectedUserForAssignment?.first_name} />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='last_name'>Last Name</Label>
                <Input placeholder='' value={selectedUserForAssignment?.last_name} disabled />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <Input type='password' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />
              </div>

              <Button
                onClick={() => {
                  createClientAdmin({
                    email: selectedUserForAssignment?.email,
                    first_name: selectedUserForAssignment?.first_name,
                    last_name: selectedUserForAssignment?.last_name,
                    password,
                  });
                }}
                className='w-full'
              >
                <Shield className='w-4 h-4 mr-2' />
                Create Client Admin
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;
