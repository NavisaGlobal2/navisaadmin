
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Filter, Search, UserPlus } from "lucide-react";

const UserManagement = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">User Management</h1>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>

        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search users..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className="bg-white/5 rounded-xl border border-white/10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Visa Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expert Assigned</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  name: "John Doe",
                  visaType: "Student Visa",
                  status: "In Review",
                  expert: "Sarah Wilson",
                  lastUpdated: "2024-02-20",
                },
                {
                  name: "Jane Smith",
                  visaType: "Work Permit",
                  status: "Pending",
                  expert: "Michael Brown",
                  lastUpdated: "2024-02-19",
                },
                {
                  name: "Robert Johnson",
                  visaType: "Tourist Visa",
                  status: "Approved",
                  expert: "Emily Davis",
                  lastUpdated: "2024-02-18",
                },
              ].map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.visaType}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === "Approved" 
                        ? "bg-green-500/20 text-green-500"
                        : user.status === "In Review"
                        ? "bg-blue-500/20 text-blue-500"
                        : "bg-yellow-500/20 text-yellow-500"
                    }`}>
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>{user.expert}</TableCell>
                  <TableCell>{user.lastUpdated}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View Details</Button>
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
