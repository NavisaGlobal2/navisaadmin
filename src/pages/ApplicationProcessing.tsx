
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Bell, CheckCircle, Clock, FileText, ChevronRight } from "lucide-react";
import { mockApplications } from "@/data/mockApplications";
import { Application } from "@/types/application";
import { useToast } from "@/hooks/use-toast";

const ApplicationProcessing = () => {
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const { toast } = useToast();

  const getStatusCounts = () => {
    const counts = {
      total: applications.length,
      inReview: applications.filter(app => app.status === "In Review").length,
      approved: applications.filter(app => app.status === "Approved").length,
      urgent: applications.filter(app => 
        app.status === "Pending" && 
        new Date().getTime() - new Date(app.submittedAt).getTime() > 7 * 24 * 60 * 60 * 1000
      ).length
    };
    return counts;
  };

  const counts = getStatusCounts();

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have new application updates",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "text-green-500 bg-green-500/20";
      case "In Review":
        return "text-yellow-500 bg-yellow-500/20";
      case "Pending":
        return "text-blue-500 bg-blue-500/20";
      case "Rejected":
        return "text-red-500 bg-red-500/20";
      default:
        return "text-gray-500 bg-gray-500/20";
    }
  };

  const applicationSteps = [
    { number: 1, title: "Initial Review", description: "Document verification and basic eligibility check" },
    { number: 2, title: "Background Check", description: "Detailed background verification process" },
    { number: 3, title: "Expert Assessment", description: "Review by domain expert" },
    { number: 4, title: "Final Decision", description: "Application approval or rejection" }
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { title: "Total Applications", value: counts.total.toString(), icon: FileText, color: "blue" },
            { title: "In Review", value: counts.inReview.toString(), icon: Clock, color: "yellow" },
            { title: "Approved", value: counts.approved.toString(), icon: CheckCircle, color: "green" },
            { title: "Urgent", value: counts.urgent.toString(), icon: AlertCircle, color: "red" },
          ].map((stat, index) => (
            <Card key={index} className="bg-white/5 border-white/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`w-4 h-4 text-${stat.color}-500`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {applications.slice(0, 3).map((app, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="space-y-1">
                    <h4 className="font-medium flex items-center gap-2">
                      {app.name}
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </h4>
                    <p className="text-sm text-gray-400">{app.type}</p>
                    <div className="flex gap-2 items-center">
                      {app.documents.map((doc, docIndex) => (
                        <span 
                          key={docIndex}
                          className={`text-xs px-2 py-1 rounded-full ${
                            doc.status === "Verified" 
                              ? "bg-green-500/20 text-green-500"
                              : doc.status === "Pending"
                              ? "bg-yellow-500/20 text-yellow-500"
                              : "bg-red-500/20 text-red-500"
                          }`}
                        >
                          {doc.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                    <p className="text-sm text-gray-400 mt-1">
                      {new Date(app.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle>Application Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {applicationSteps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                        {step.number}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium">{step.title}</h4>
                      <p className="text-sm text-gray-400">{step.description}</p>
                    </div>
                    {index < applicationSteps.length - 1 && (
                      <div className="absolute left-4 ml-4 w-0.5 h-16 bg-primary/20" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ApplicationProcessing;
