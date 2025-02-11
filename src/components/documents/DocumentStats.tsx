
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, FileCheck, FileText, FileX } from "lucide-react";

interface DocumentStatsProps {
  totalDocuments: number;
  approvedDocuments: number;
  rejectedDocuments: number;
  pendingDocuments: number;
}

export const DocumentStats = ({
  totalDocuments,
  approvedDocuments,
  rejectedDocuments,
  pendingDocuments
}: DocumentStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[
        { title: "Total Documents", value: totalDocuments, icon: FileText, color: "blue" },
        { title: "Approved", value: approvedDocuments, icon: FileCheck, color: "green" },
        { title: "Rejected", value: rejectedDocuments, icon: FileX, color: "red" },
        { title: "Pending Review", value: pendingDocuments, icon: Eye, color: "yellow" },
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
