
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { useUserManagement } from '@/hooks/users/useUserManagement';

// Component imports
import UserManagementHeader from '@/components/users/management/UserManagementHeader';
import UserStats from '@/components/users/management/UserStats';
import UserFiltersCard from '@/components/users/management/UserFiltersCard';
import UsersTableCard from '@/components/users/management/UsersTableCard';
import ClientsTableCard from '@/components/users/management/ClientsTableCard';
import ClientAdminsTableCard from '@/components/users/management/ClientAdminsTableCard';
import SuperAdminsTableCard from '@/components/users/management/SuperAdminsTableCard';

// Dialog imports
import RoleManagementDialog from '@/components/users/management/dialogs/RoleManagementDialog';
import AdminClientsDialog from '@/components/users/management/dialogs/AdminClientsDialog';
import AssignmentDialog from '@/components/users/management/dialogs/AssignmentDialog';
import AdminCreationDialog from '@/components/users/management/dialogs/AdminCreationDialog';
import UserDetailsDialog from '@/components/users/UserDetailsDialog';

const UserManagement = () => {
  const { user } = useAuth();
  const {
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
  } = useUserManagement();

  return (
    <DashboardLayout>
      <div className='space-y-6'>
        {/* Header Section */}
        <UserManagementHeader />

        {/* Stats Cards */}
        <UserStats users={users} />

        {/* Filters Section */}
        <UserFiltersCard
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          visaFilter={visaFilter}
          setVisaFilter={setVisaFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Users Table */}
        {user.role === 'super_admin' && (
          <UsersTableCard
            users={filteredUsers}
            onAssignExpert={handleAssignExpert}
            onSuspendUser={handleSuspendUser}
            onActivateUser={handleActivateUser}
            onManageRoles={handleManageRoles}
            setSelectedUserForAssignment={setSelectedUserForAssignment}
            setOpenAssignmentDialog={setOpenAssignmentDialog}
            setOpenAdminCreationDialog={setOpenAdminCreationDialog}
            onUserSelect={handleUserSelect}
            isLoading={isUsersLoading}
            hasError={!!usersError}
          />
        )}

        {/* Client Table */}
        <ClientsTableCard clients={clients} isLoading={isClientsLoading} hasError={!!clientsError} />

        {/* Client Admins Table */}
        {user.role === 'super_admin' && (
          <ClientAdminsTableCard
            users={clientAdmins}
            setActiveAdmin={activeAdmin}
            setAdminClients={handleAdminClients}
            isLoading={isClientAdminsLoading}
            hasError={!!clientAdminsError}
          />
        )}

        {/* Super Admins Table */}
        {user.role === 'super_admin' && (
          <SuperAdminsTableCard 
            users={superAdmins} 
            isLoading={isSuperAdminsLoading} 
            hasError={!!superAdminsError} 
          />
        )}

        {/* Dialogs */}
        <RoleManagementDialog
          isOpen={isRoleDialogOpen}
          onOpenChange={setIsRoleDialogOpen}
          selectedUser={selectedUser}
          onRoleChange={handleRoleChange}
        />

        <AdminClientsDialog
          isOpen={openDialog}
          onOpenChange={setOpenDialog}
          adminClients={adminClients}
          activeAdmin={activeAdmin}
        />

        <AssignmentDialog
          isOpen={openAssignmentDialog}
          onOpenChange={setOpenAssignmentDialog}
          selectedUser={selectedUserForAssignment}
          adminId={adminId}
          setAdminId={setAdminId}
          onAssignExpert={assignExpert}
        />

        <AdminCreationDialog
          isOpen={openAdminCreationDialog}
          onOpenChange={setOpenAdminCreationDialog}
          selectedUser={selectedUserForAssignment}
          password={password}
          setPassword={setPassword}
          onCreateClientAdmin={createClientAdmin}
        />

        <UserDetailsDialog
          isOpen={isUserDetailsDialogOpen}
          onClose={() => setIsUserDetailsDialogOpen(false)}
          userDetails={userDetails}
          isLoading={isLoadingUserDetails}
        />
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;
