
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UserFilters } from "@/components/users/UserFilters";
import { UsersTable } from "@/components/users/UsersTable";
import { mockUsers } from "@/data/mockUsers";
import { User } from "@/types/user";

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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">User Management</h1>
            <p className="text-sm text-gray-400 mt-1">
              Manage user accounts and applications
            </p>
          </div>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>

        <UserFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          visaFilter={visaFilter}
          setVisaFilter={setVisaFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <UsersTable 
          users={filteredUsers}
          onAssignExpert={handleAssignExpert}
          onSuspendUser={handleSuspendUser}
          onActivateUser={handleActivateUser}
        />
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;
