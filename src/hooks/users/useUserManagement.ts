
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

  // Assignment Dialog
  const [openAssignmentDialog, setOpenAssignmentDialog] = useState(false);
  const [selectedUserForAssignment, setSelectedUserForAssignment] = useState<User | null>(null);
  const [adminId, setAdminId] = useState<string>('');

  // Admin Creation Dialog
  const [openAdminCreationDialog, setOpenAdminCreationDialog] = useState(false);
  const [password, setPassword] = useState<string>('');

  // User Details Dialog
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isUserDetailsDialogOpen, setIsUserDetailsDialogOpen] = useState(false);
  
  // Admin Clients Dialog
  const [adminClients, setAdminClients] = useState<User[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  // Fetch users with error handling
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

  // Fetch user details when a user is selected
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

        toast({
          title: 'Clients Loaded',
          description: 'Clients have been successfully loaded',
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching clients:', error);
        throw error;
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
    // State
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
    password,
    setPassword,
    selectedUserId,
    isUserDetailsDialogOpen,
    setIsUserDetailsDialogOpen,
    adminClients,
    openDialog,
    setOpenDialog,
    filteredUsers,
    
    // Data
    users,
    clientAdmins,
    clients,
    superAdmins,
    userDetails,
    
    // Loading/Error states
    isUsersLoading,
    isClientAdminsLoading, 
    isClientsLoading,
    isSuperAdminsLoading,
    usersError,
    clientAdminsError,
    clientsError,
    superAdminsError,
    isLoadingUserDetails,
    
    // Functions
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
