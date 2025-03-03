import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { User, UserDetails } from '@/types/user';
import { useToast } from '@/hooks/use-toast';
import { adminApi } from '@/services/api';

export const useUserManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [visaFilter, setVisaFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [activeAdmin, setActiveAdmin] = useState<User | null>(null);

  const [openAssignmentDialog, setOpenAssignmentDialog] = useState(false);
  const [selectedUserForAssignment, setSelectedUserForAssignment] = useState<User | null>(null);
  const [adminId, setAdminId] = useState<string>('');

  const [openAdminCreationDialog, setOpenAdminCreationDialog] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isUserDetailsDialogOpen, setIsUserDetailsDialogOpen] = useState(false);
  
  const [adminClients, setAdminClients] = useState<User[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  const {
    data: users = [],
    isLoading: isUsersLoading,
    error: usersError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      console.log('Fetching users...');
      const response = await adminApi.getAllUsers();
      console.log('API Response:', response);

      toast({
        title: 'Users Loaded',
        description: 'Users have been successfully loaded',
      });
      return response.data;
    },
  });

  const {
    data: userDetails,
    isLoading: isLoadingUserDetails,
    error: userDetailsError,
    refetch: refetchUserDetails,
  } = useQuery({
    queryKey: ['userDetails', selectedUserId],
    queryFn: async () => {
      if (!selectedUserId) return null;
      const response = await adminApi.getUserDetails(selectedUserId);
      return response as UserDetails;
    },
    enabled: !!selectedUserId,
  });

  const {
    data: clientAdmins = [],
    isLoading: isClientAdminsLoading,
    error: clientAdminsError,
  } = useQuery({
    queryKey: ['clientAdmins'],
    queryFn: async () => {
      console.log('Fetching client admins...');
      try {
        const response = await adminApi.getAllClientAdminsWithClients();
        console.log('API Response:', response);

        toast({
          title: 'Client Admins Loaded',
          description: 'Client Admins have been successfully loaded',
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching client admins:', error);
        throw error;
      }
    },
  });

  const {
    data: clients = [],
    isLoading: isClientsLoading,
    error: clientsError,
  } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      console.log('Fetching clients...');
      try {
        const response = await adminApi.getMyClients();
        console.log('API Response:', response);

        if (response?.success === false && response?.message === "You are not authorized") {
          console.log('User not authorized to view clients');
          return [];
        }

        toast({
          title: 'Clients Loaded',
          description: 'Clients have been successfully loaded',
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching clients:', error);
        return [];
      }
    },
  });

  const {
    data: superAdmins = [],
    isLoading: isSuperAdminsLoading,
    error: superAdminsError,
  } = useQuery({
    queryKey: ['super-admins'],
    queryFn: async () => {
      console.log('Fetching super admins...');
      try {
        const response = await adminApi.getAllSuperAdmins();
        console.log('API Response:', response);

        toast({
          title: 'Super Admins Loaded',
          description: 'Super Admins have been successfully loaded',
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching super admins:', error);
        throw error;
      }
    },
  });

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
    setIsUserDetailsDialogOpen(true);
  };

  const assignExpert = async (userId: string, adminId: string) => {
    await adminApi
      .assignClient({ client_id: userId, admin_id: adminId })
      .then((res) => {
        console.log(res);
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
          description: error.response?.data?.message || 'Failed to create client admin',
          variant: 'destructive',
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

  const filteredUsers = users
    ? users.filter((user: User) => {
        const matchesSearch =
          user?.first_name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
          user?.last_name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
          user?.email?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
          user?.id.toLowerCase().includes(searchTerm?.toLowerCase());
        const matchesVisa = visaFilter === 'all' || user?.visaType === visaFilter;
        const matchesStatus = statusFilter === 'all' || user?.status === statusFilter;
        return matchesSearch && matchesVisa && matchesStatus;
      })
    : [];

  return {
    searchTerm,
    setSearchTerm,
    visaFilter,
    setVisaFilter,
    statusFilter,
    setStatusFilter,
    selectedUser,
    isRoleDialogOpen,
    setIsRoleDialogOpen,
    activeAdmin,
    setActiveAdmin,
    openAssignmentDialog,
    setOpenAssignmentDialog,
    selectedUserForAssignment,
    setSelectedUserForAssignment,
    adminId,
    setAdminId,
    openAdminCreationDialog,
    setOpenAdminCreationDialog,
    selectedUserId,
    isUserDetailsDialogOpen,
    setIsUserDetailsDialogOpen,
    adminClients,
    openDialog,
    setOpenDialog,
    filteredUsers,
    
    users,
    clientAdmins,
    clients,
    superAdmins,
    userDetails,
    
    isUsersLoading,
    isClientAdminsLoading, 
    isClientsLoading,
    isSuperAdminsLoading,
    usersError,
    clientAdminsError,
    clientsError,
    superAdminsError,
    isLoadingUserDetails,
    
    handleUserSelect,
    assignExpert,
    createClientAdmin,
    handleAssignExpert,
    handleSuspendUser,
    handleActivateUser,
    handleAdminClients,
    handleManageRoles,
    handleRoleChange,
  };
};
