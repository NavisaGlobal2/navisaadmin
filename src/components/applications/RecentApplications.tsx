
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Application } from "@/types/application";

interface RecentApplicationsProps {
  applications: Application[];
  onStatusChange: (applicationId: string, newStatus: Application["status"]) => void;
  onDocumentStatusUpdate: (applicationId: string, documentName: string, newStatus: "Verified" | "Pending" | "Rejected") => void;
  onAssignExpert: (applicationId: string, expertName: string) => void;
}

export const RecentApplications = ({ 
  applications, 
  onStatusChange, 
  onDocumentStatusUpdate,
  onAssignExpert
}: RecentApplicationsProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "text-green-500 bg-green-500/20";
      case "In Review":
        return "text-yellow-500 bg-yellow-500/20";
      case "Pending Review":
        return "text-blue-500 bg-blue-500/20";
      case "Rejected":
        return "text-red-500 bg-red-500/20";
      default:
        return "text-gray-500 bg-gray-500/20";
    }
  };

  return (
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
                    onClick={() => onDocumentStatusUpdate(app.id, doc.name, 
                      doc.status === "Pending" ? "Verified" : 
                      doc.status === "Verified" ? "Rejected" : "Pending"
                    )}
                  >
                    {doc.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right">
              <span 
                className={`px-2 py-1 rounded-full text-xs ${getStatusColor(app.status)} cursor-pointer`}
                onClick={() => onStatusChange(app.id, 
                  app.status === "Pending Review" ? "In Review" :
                  app.status === "In Review" ? "Approved" :
                  app.status === "Approved" ? "Rejected" : "Pending Review"
                )}
              >
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
  );
};
