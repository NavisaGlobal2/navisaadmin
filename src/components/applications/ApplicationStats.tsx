
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Clock, FileText } from "lucide-react";
import { Application } from "@/types/application";

interface ApplicationStatsProps {
  applications: Application[];
}

export const ApplicationStats = ({ applications }: ApplicationStatsProps) => {
  const getStatusCounts = () => {
    const counts = {
      total: applications.length,
      inReview: applications.filter(app => app.status === "In Review").length,
      approved: applications.filter(app => app.status === "Approved").length,
      urgent: applications.filter(app => 
        app.status === "Pending Review" && 
        new Date().getTime() - new Date(app.submittedAt).getTime() > 7 * 24 * 60 * 60 * 1000
      ).length
    };
    return counts;
  };

  const counts = getStatusCounts();

  return (
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
  );
};
