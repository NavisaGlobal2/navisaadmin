
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
    <div className="relative w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px] whitespace-normal">Name</TableHead>
            <TableHead className="w-[250px] whitespace-normal">Email</TableHead>
            <TableHead className="w-[150px] whitespace-normal">
              Visa Type
            </TableHead>
            <TableHead className="w-[120px] whitespace-normal">Status</TableHead>
            <TableHead className="w-[180px] whitespace-normal">
              Expert Assigned
            </TableHead>
            <TableHead className="w-[140px] whitespace-normal">Country</TableHead>
            <TableHead className="w-[150px] whitespace-normal">
              Last Updated
            </TableHead>
            <TableHead className="w-[100px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="hover:bg-white/5">
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell className="text-muted-foreground">{user.email}</TableCell>
              <TableCell className="text-muted-foreground">{user.visaType}</TableCell>
              <TableCell>
                <Badge variant={
                  user.status === "Active" ? "default" :
                  user.status === "Pending" ? "secondary" :
                  "destructive"
                }
                className="whitespace-nowrap"
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{user.expert}</TableCell>
              <TableCell className="text-muted-foreground">{user.country}</TableCell>
              <TableCell className="text-muted-foreground">{user.lastUpdated}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuItem 
                      onClick={() => onAssignExpert(user.id)}
                      className="cursor-pointer"
                    >
                      <UserCheck className="mr-2 h-4 w-4" />
                      <span>Assign Expert</span>
                    </DropdownMenuItem>
                    {user.status !== "Suspended" ? (
                      <DropdownMenuItem 
                        onClick={() => onSuspendUser(user.id)}
                        className="text-destructive cursor-pointer"
                      >
                        <UserX className="mr-2 h-4 w-4" />
                        <span>Suspend User</span>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem 
                        onClick={() => onActivateUser(user.id)}
                        className="cursor-pointer"
                      >
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
