
import { User } from "@/types/user";
import { Badge } from "@/components/ui/badge";
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
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Shield, UserCheck, UserX } from "lucide-react";

interface UsersTableProps {
  users: User[];
  onAssignExpert: (userId: string) => void;
  onSuspendUser: (userId: string) => void;
  onActivateUser: (userId: string) => void;
}

export const UsersTable = ({
  users,
  onAssignExpert,
  onSuspendUser,
  onActivateUser,
}: UsersTableProps) => {
  return (
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
          {users.map((user) => (
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
                    <DropdownMenuItem onClick={() => onAssignExpert(user.id)}>
                      <UserCheck className="mr-2 h-4 w-4" />
                      <span>Assign Expert</span>
                    </DropdownMenuItem>
                    {user.status !== "Suspended" ? (
                      <DropdownMenuItem 
                        onClick={() => onSuspendUser(user.id)}
                        className="text-destructive"
                      >
                        <UserX className="mr-2 h-4 w-4" />
                        <span>Suspend User</span>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => onActivateUser(user.id)}>
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
  );
};
