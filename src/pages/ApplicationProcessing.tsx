
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

const ApplicationProcessing = () => {
  const [applications, setApplications] = useState<Application[]>(mockApplications);
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
              return { ...doc, status: newStatus };
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Application Processing</h1>
          <Button onClick={handleNotificationClick}>
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </Button>
        </div>

        <ApplicationStats applications={applications} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentApplications 
            applications={applications}
            onStatusChange={handleStatusChange}
            onDocumentStatusUpdate={handleDocumentStatusUpdate}
          />
          <ApplicationSteps />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ApplicationProcessing;
