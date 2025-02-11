
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { DocumentStats } from "@/components/documents/DocumentStats";
import { RecentDocuments } from "@/components/documents/RecentDocuments";
import { DocumentRequirements } from "@/components/documents/DocumentRequirements";

const DocumentReview = () => {
  const recentDocuments = [
    {
      name: "Passport.pdf",
      type: "Identity Document",
      status: "Approved" as const,
      uploadedBy: "John Doe",
      time: "2 hours ago"
    },
    {
      name: "BankStatement.pdf",
      type: "Financial Document",
      status: "Pending" as const,
      uploadedBy: "Jane Smith",
      time: "5 hours ago"
    },
    {
      name: "Degree.pdf",
      type: "Educational Document",
      status: "Rejected" as const,
      uploadedBy: "Mike Johnson",
      time: "1 day ago"
    }
  ];

  const documentCategories = [
    {
      title: "Identity Documents",
      required: ["Passport", "National ID", "Birth Certificate"],
      status: "complete" as const
    },
    {
      title: "Financial Documents",
      required: ["Bank Statements", "Tax Returns", "Pay Stubs"],
      status: "incomplete" as const
    },
    {
      title: "Educational Documents",
      required: ["Degree Certificates", "Transcripts"],
      status: "pending" as const
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Document Review</h1>
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Upload Documents
          </Button>
        </div>

        <DocumentStats
          totalDocuments={234}
          approvedDocuments={156}
          rejectedDocuments={45}
          pendingDocuments={33}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentDocuments documents={recentDocuments} />
          <DocumentRequirements categories={documentCategories} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DocumentReview;
