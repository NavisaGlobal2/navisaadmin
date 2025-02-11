
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Bell, Filter, Search } from "lucide-react";
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentApplications 
            applications={filteredApplications}
            onStatusChange={handleStatusChange}
            onDocumentStatusUpdate={handleDocumentStatusUpdate}
            onAssignExpert={handleAssignExpert}
          />
          <ApplicationSteps />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ApplicationProcessing;
