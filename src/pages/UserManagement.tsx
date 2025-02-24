import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { UserPlus, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UserFilters } from "@/components/users/UserFilters";
import { UsersTable } from "@/components/users/UsersTable";
import { User } from "@/types/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { adminApi } from "@/services/api";

const UserManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [visaFilter, setVisaFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);

  // Fetch users with error handling
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      console.log("Fetching users...");
      const response = await adminApi.getAllUsers();
      console.log("API Response:", response);
      return response.data;
    },
    onError: (error) => {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch users",
        variant: "destructive",
      });
    },
  });

  const handleAssignExpert = (userId: string, expertName: string) => {
    toast({
      title: "Expert Assigned",
      description: `Expert ${expertName} has been assigned to user ${userId}`,
    });
  };

  const handleSuspendUser = (userId: string) => {
    toast({
      title: "User Suspended",
      description: `User ${userId} has been suspended`,
      variant: "destructive",
    });
  };

  const handleActivateUser = (userId: string) => {
    toast({
      title: "User Activated",
      description: `User ${userId} has been activated`,
    });
  };

  const handleManageRoles = (user: User) => {
    setSelectedUser(user);
    setIsRoleDialogOpen(true);
  };

  const handleRoleChange = (role: string) => {
    if (!selectedUser) return;

    toast({
      title: "Role Updated",
      description: `${selectedUser.name}'s role has been updated to ${role}`,
    });
    setIsRoleDialogOpen(false);
  };

  const filteredUsers = users ? users.filter((user: User) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVisa = visaFilter === "all" || user.visaType === visaFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesVisa && matchesStatus;
  }) : [];

  const stats = [
    {
      title: "Total Users",
      value: users?.length || 0,
      description: "Active users in the system",
    },
    {
      title: "Active Users",
      value: users?.filter(user => user.status === "Active").length || 0,
      description: "Currently active accounts",
    },
    {
      title: "Pending Users",
      value: users?.filter(user => user.status === "Pending").length || 0,
      description: "Awaiting verification",
    },
  ];

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">Loading users...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-red-500">
            Error loading users. Please try again later.
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold">User Management</h1>
            <p className="text-sm text-gray-400 mt-1">
              Manage user accounts and roles
            </p>
          </div>
          <Button size="default" className="w-full sm:w-auto">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-400">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <p className="text-sm text-gray-400">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters Section */}
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 md:p-6">
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
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="p-4 md:p-6">
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <UsersTable 
              users={filteredUsers}
              onAssignExpert={handleAssignExpert}
              onSuspendUser={handleSuspendUser}
              onActivateUser={handleActivateUser}
              onManageRoles={handleManageRoles}
            />
          </CardContent>
        </Card>

        {/* Role Management Dialog */}
        <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Manage User Role</DialogTitle>
              <DialogDescription>
                Change the role for {selectedUser?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select onValueChange={handleRoleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;
