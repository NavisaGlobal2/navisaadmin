
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Bell, CheckCircle, Clock, FileText } from "lucide-react";

const ApplicationProcessing = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Application Processing</h1>
          <Button>
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { title: "Total Applications", value: "156", icon: FileText, color: "blue" },
            { title: "In Review", value: "45", icon: Clock, color: "yellow" },
            { title: "Approved", value: "89", icon: CheckCircle, color: "green" },
            { title: "Urgent", value: "22", icon: AlertCircle, color: "red" },
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
              {[
                {
                  name: "John Doe",
                  type: "Student Visa",
                  status: "In Review",
                  time: "2 hours ago"
                },
                {
                  name: "Jane Smith",
                  type: "Work Permit",
                  status: "Pending",
                  time: "5 hours ago"
                },
                {
                  name: "Mike Johnson",
                  type: "Tourist Visa",
                  status: "Approved",
                  time: "1 day ago"
                }
              ].map((app, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="font-medium">{app.name}</h4>
                    <p className="text-sm text-gray-400">{app.type}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium">{app.status}</span>
                    <p className="text-sm text-gray-400">{app.time}</p>
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
