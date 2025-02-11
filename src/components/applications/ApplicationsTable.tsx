
import { Application } from "@/types/application";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  MessageSquare,
  User,
  XCircle 
} from "lucide-react";

interface ApplicationsTableProps {
  applications: Application[];
  onApplicationSelect: (application: Application) => void;
  onAssignExpert: (applicationId: string, expertName: string) => void;
}

export const ApplicationsTable = ({
  applications,
  onApplicationSelect,
  onAssignExpert,
}: ApplicationsTableProps) => {
  const getStatusBadge = (status: Application["status"]) => {
    const statusConfig = {
      "Pending Review": { icon: Clock, className: "bg-blue-500/10 text-blue-500" },
      "In Review": { icon: AlertCircle, className: "bg-yellow-500/10 text-yellow-500" },
      "Approved": { icon: CheckCircle, className: "bg-green-500/10 text-green-500" },
      "Rejected": { icon: XCircle, className: "bg-red-500/10 text-red-500" },
      "More Info Needed": { icon: MessageSquare, className: "bg-purple-500/10 text-purple-500" },
      "Escalated": { icon: AlertCircle, className: "bg-orange-500/10 text-orange-500" }
    };

    const config = statusConfig[status];
    return (
      <Badge variant="secondary" className={config.className}>
        <config.icon className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Applicant</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Expert</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow 
                key={app.id} 
                className="cursor-pointer hover:bg-accent/50"
                onClick={() => onApplicationSelect(app)}
              >
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium">{app.name}</div>
                      <div className="text-sm text-muted-foreground">{app.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{app.type}</TableCell>
                <TableCell>{getStatusBadge(app.status)}</TableCell>
                <TableCell>
                  {app.assignedExpert || (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAssignExpert(app.id, "Sarah Wilson");
                      }}
                    >
                      Assign Expert
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  {new Date(app.lastUpdated).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
