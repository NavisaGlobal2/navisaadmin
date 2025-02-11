
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Filter, 
  MoreHorizontal, 
  Search, 
  Shield, 
  UserPlus, 
  UserCheck,
  UserX
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type User = {
  id: string;
  name: string;
  email: string;
  visaType: string;
  status: "Active" | "Pending" | "Suspended";
  expert: string;
  country: string;
  lastUpdated: string;
};

const UserManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [visaFilter, setVisaFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  // Mock data - would come from API in real implementation
  const users: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      visaType: "Student Visa",
      status: "Active",
      expert: "Sarah Wilson",
      country: "United States",
      lastUpdated: "2024-02-20",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      visaType: "Work Permit",
      status: "Pending",
      expert: "Michael Brown",
      country: "Canada",
      lastUpdated: "2024-02-19",
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert@example.com",
      visaType: "Tourist Visa",
      status: "Suspended",
      expert: "Emily Davis",
      country: "UK",
      lastUpdated: "2024-02-18",
    },
  ];

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

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVisa = !visaFilter || user.visaType === visaFilter;
    const matchesStatus = !statusFilter || user.status === statusFilter;
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

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Search by name, email, or ID..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={visaFilter} onValueChange={setVisaFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Visa Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Visa Types</SelectLabel>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="Student Visa">Student Visa</SelectItem>
                  <SelectItem value="Work Permit">Work Permit</SelectItem>
                  <SelectItem value="Tourist Visa">Tourist Visa</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl border border-white/10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Visa Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expert Assigned</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.visaType}</TableCell>
                  <TableCell>
                    <Badge variant={
                      user.status === "Active" ? "default" :
                      user.status === "Pending" ? "secondary" :
                      "destructive"
                    }>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.expert}</TableCell>
                  <TableCell>{user.country}</TableCell>
                  <TableCell>{user.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleAssignExpert(user.id)}>
                          <UserCheck className="mr-2 h-4 w-4" />
                          <span>Assign Expert</span>
                        </DropdownMenuItem>
                        {user.status !== "Suspended" ? (
                          <DropdownMenuItem 
                            onClick={() => handleSuspendUser(user.id)}
                            className="text-destructive"
                          >
                            <UserX className="mr-2 h-4 w-4" />
                            <span>Suspend User</span>
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleActivateUser(user.id)}>
                            <Shield className="mr-2 h-4 w-4" />
                            <span>Activate User</span>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;
