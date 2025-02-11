
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { mockApplications } from "@/data/mockApplications";
import { Application } from "@/types/application";
import { useToast } from "@/hooks/use-toast";
import { ApplicationStats } from "@/components/applications/ApplicationStats";
import { ApplicationSteps } from "@/components/applications/ApplicationSteps";
import { RecentApplications } from "@/components/applications/RecentApplications";
import { ApplicationDetails } from "@/components/applications/ApplicationDetails";
import { ApplicationFilters } from "@/components/applications/ApplicationFilters";
import { ApplicationsTable } from "@/components/applications/ApplicationsTable";

const ApplicationProcessing = () => {
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expertFilter, setExpertFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
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

  const handleAddNote = (applicationId: string, note: { content: string; assignedTo?: string }) => {
    const updatedApplications = applications.map(app => {
      if (app.id === applicationId) {
        return {
          ...app,
          internalNotes: [
            ...(app.internalNotes || []),
            {
              id: Date.now().toString(),
              content: note.content,
              createdBy: "Admin",
              createdAt: new Date().toISOString(),
              assignedTo: note.assignedTo
            }
          ],
          lastUpdated: new Date().toISOString()
        };
      }
      return app;
    });
    setApplications(updatedApplications);
    toast({
      title: "Note Added",
      description: "Internal note has been added to the application",
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

        <ApplicationFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          expertFilter={expertFilter}
          onExpertFilterChange={setExpertFilter}
        />

        <ApplicationStats applications={filteredApplications} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ApplicationsTable 
              applications={filteredApplications}
              onApplicationSelect={setSelectedApplication}
              onAssignExpert={handleAssignExpert}
            />
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

        {selectedApplication && (
          <ApplicationDetails
            application={selectedApplication}
            onAddNote={handleAddNote}
            onClose={() => setSelectedApplication(null)}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default ApplicationProcessing;
