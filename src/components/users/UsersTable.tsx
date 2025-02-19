
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import { Shield, UserCheck, UserX } from "lucide-react";

interface UsersTableProps {
  users: User[];
  onAssignExpert: (userId: string, expertName: string) => void;
  onSuspendUser: (userId: string) => void;
  onActivateUser: (userId: string) => void;
  onManageRoles: (user: User) => void;
}

export const UsersTable = ({
  users,
  onAssignExpert,
  onSuspendUser,
  onActivateUser,
  onManageRoles,
}: UsersTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Visa Type</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Expert</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.visaType}</TableCell>
            <TableCell>{user.country}</TableCell>
            <TableCell>{user.status}</TableCell>
            <TableCell>{user.expert}</TableCell>
            <TableCell>{user.lastUpdated}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onManageRoles(user)}
                >
                  <Shield className="h-4 w-4" />
                </Button>
                {user.status === "Active" ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSuspendUser(user.id)}
                  >
                    <UserX className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onActivateUser(user.id)}
                  >
                    <UserCheck className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
