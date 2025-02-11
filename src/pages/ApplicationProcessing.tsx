
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { Application } from "@/types/application";
import { useToast } from "@/hooks/use-toast";
import { ApplicationStats } from "@/components/applications/ApplicationStats";
import { ApplicationSteps } from "@/components/applications/ApplicationSteps";
import { RecentApplications } from "@/components/applications/RecentApplications";
import { ApplicationDetails } from "@/components/applications/ApplicationDetails";
import { ApplicationFilters } from "@/components/applications/ApplicationFilters";
import { ApplicationsTable } from "@/components/applications/ApplicationsTable";
import { filterApplications } from "@/utils/applicationStatusUtils";
import { useApplications } from "@/hooks/useApplications";

const ApplicationProcessing = () => {
  const { 
    applications,
    handleStatusChange,
    handleDocumentStatusUpdate,
    handleAssignExpert,
    handleAddNote
  } = useApplications();

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

  const filteredApplications = filterApplications(applications, searchQuery, statusFilter, expertFilter);

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
