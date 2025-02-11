
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Filter, 
  Search, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  MessageSquare,
  User
} from "lucide-react";
import { mockApplications } from "@/data/mockApplications";
import { Application } from "@/types/application";
import { useToast } from "@/hooks/use-toast";
import { ApplicationStats } from "@/components/applications/ApplicationStats";
import { ApplicationSteps } from "@/components/applications/ApplicationSteps";
import { RecentApplications } from "@/components/applications/RecentApplications";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ApplicationProcessing = () => {
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expertFilter, setExpertFilter] = useState("all");
  const { toast } = useToast();

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have new application updates",
    });
  };

  const handleStatusChange = (applicationId: string, newStatus: Application["status"]) => {
    const updatedApplications = applications.map(app => {
      if (app.id === applicationId) {
        return {
          ...app,
          status: newStatus,
          lastUpdated: new Date().toISOString()
        };
      }
      return app;
    });
    setApplications(updatedApplications);
    toast({
      title: "Status Updated",
      description: `Application status changed to ${newStatus}`,
    });
  };

  const handleDocumentStatusUpdate = (applicationId: string, documentName: string, newStatus: "Verified" | "Pending" | "Rejected") => {
    const updatedApplications = applications.map(app => {
      if (app.id === applicationId) {
        return {
          ...app,
          documents: app.documents.map(doc => {
            if (doc.name === documentName) {
              return { 
                ...doc, 
                status: newStatus,
                lastUpdated: new Date().toISOString()
              };
            }
            return doc;
          }),
          lastUpdated: new Date().toISOString()
        };
      }
      return app;
    });
    setApplications(updatedApplications);
    toast({
      title: "Document Status Updated",
      description: `${documentName} status changed to ${newStatus}`,
    });
  };

  const handleAssignExpert = (applicationId: string, expertName: string) => {
    const updatedApplications = applications.map(app => {
      if (app.id === applicationId) {
        return {
          ...app,
          assignedExpert: expertName,
          lastUpdated: new Date().toISOString()
        };
      }
      return app;
    });
    setApplications(updatedApplications);
    toast({
      title: "Expert Assigned",
      description: `Application assigned to ${expertName}`,
    });
  };

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

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    const matchesExpert = expertFilter === "all" || app.assignedExpert === expertFilter;
    
    return matchesSearch && matchesStatus && matchesExpert;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Application Processing</h1>
            <p className="text-sm text-gray-500">Manage and process visa applications</p>
          </div>
          <Button onClick={handleNotificationClick}>
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              placeholder="Search by name, email, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Pending Review">Pending Review</SelectItem>
              <SelectItem value="In Review">In Review</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
              <SelectItem value="More Info Needed">More Info Needed</SelectItem>
              <SelectItem value="Escalated">Escalated</SelectItem>
            </SelectContent>
          </Select>
          <Select value={expertFilter} onValueChange={setExpertFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by expert" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Experts</SelectItem>
              <SelectItem value="Sarah Wilson">Sarah Wilson</SelectItem>
              <SelectItem value="Michael Brown">Michael Brown</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ApplicationStats applications={filteredApplications} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
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
                    {filteredApplications.map((app) => (
                      <TableRow key={app.id} className="cursor-pointer hover:bg-accent/50">
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
                              onClick={() => handleAssignExpert(app.id, "Sarah Wilson")}
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
          </div>
          <div className="space-y-6">
            <RecentApplications 
              applications={filteredApplications}
              onStatusChange={handleStatusChange}
              onDocumentStatusUpdate={handleDocumentStatusUpdate}
              onAssignExpert={handleAssignExpert}
            />
            <ApplicationSteps />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ApplicationProcessing;
