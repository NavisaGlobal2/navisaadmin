
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Bell, CheckCircle, Clock, FileText } from "lucide-react";
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
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="font-medium">{app.name}</h4>
                    <p className="text-sm text-gray-400">{app.type}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      app.status === "Approved"
                        ? "bg-green-500/20 text-green-500"
                        : app.status === "In Review"
                        ? "bg-yellow-500/20 text-yellow-500"
                        : "bg-blue-500/20 text-blue-500"
                    }`}>
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
              <CardTitle>Processing Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {[
                  {
                    title: "Document Verification",
                    description: "Initial documents verified",
                    time: "Completed",
                    icon: CheckCircle
                  },
                  {
                    title: "Background Check",
                    description: "Processing background verification",
                    time: "In Progress",
                    icon: Clock
                  },
                  {
                    title: "Expert Review",
                    description: "Awaiting expert review",
                    time: "Pending",
                    icon: AlertCircle
                  }
                ].map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="mt-1">
                      <step.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">{step.title}</h4>
                      <p className="text-sm text-gray-400">{step.description}</p>
                      <p className="text-sm text-gray-500">{step.time}</p>
                    </div>
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
