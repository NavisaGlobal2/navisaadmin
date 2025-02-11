
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UserFilters } from "@/components/users/UserFilters";
import { UsersTable } from "@/components/users/UsersTable";
import { mockUsers } from "@/data/mockUsers";
import { User } from "@/types/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [visaFilter, setVisaFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleAssignExpert = (userId: string) => {
    toast({
      title: "Expert Assignment",
      description: `Assigning expert to user ${userId}`,
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

  const filteredUsers = mockUsers.filter((user: User) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVisa = visaFilter === "all" || user.visaType === visaFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesVisa && matchesStatus;
  });

  const stats = [
    {
      title: "Total Users",
      value: mockUsers.length,
      description: "Active users in the system",
    },
    {
      title: "Active Users",
      value: mockUsers.filter(user => user.status === "Active").length,
      description: "Currently active accounts",
    },
    {
      title: "Pending Users",
      value: mockUsers.filter(user => user.status === "Pending").length,
      description: "Awaiting verification",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold">User Management</h1>
            <p className="text-sm text-gray-400 mt-1">
              Manage user accounts and applications
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
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;
