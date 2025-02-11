
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { DocumentStats } from "@/components/documents/DocumentStats";
import { RecentDocuments } from "@/components/documents/RecentDocuments";
import { DocumentRequirements } from "@/components/documents/DocumentRequirements";
import { DocumentValidation } from "@/components/documents/DocumentValidation";
import { useToast } from "@/hooks/use-toast";
import { Document } from "@/types/application";

const DocumentReview = () => {
  const { toast } = useToast();
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const recentDocuments = [
    {
      name: "Passport.pdf",
      type: "Identity Document",
      status: "Approved" as const,
      uploadedBy: "John Doe",
      time: "2 hours ago",
      version: 1,
      validationResults: {
        isComplete: true,
        isAccurate: true,
        aiConfidenceScore: 98,
      },
      history: [
        {
          version: 1,
          uploadedAt: "2024-03-15T10:00:00",
          status: "Verified",
        }
      ]
    },
    {
      name: "BankStatement.pdf",
      type: "Financial Document",
      status: "Pending" as const,
      uploadedBy: "Jane Smith",
      time: "5 hours ago",
      version: 2,
      validationResults: {
        isComplete: false,
        isAccurate: true,
        aiConfidenceScore: 85,
        suggestions: ["Missing transaction history for January 2024"]
      },
      history: [
        {
          version: 2,
          uploadedAt: "2024-03-15T09:00:00",
          status: "Pending",
        },
        {
          version: 1,
          uploadedAt: "2024-03-14T14:00:00",
          status: "Rejected",
          notes: "Incomplete statement"
        }
      ]
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

  const handleValidate = (documentName: string) => {
    toast({
      title: "Document Validation",
      description: `Starting AI validation for ${documentName}`,
    });
  };

  const handleApprove = (documentName: string) => {
    toast({
      title: "Document Approved",
      description: `${documentName} has been approved`,
    });
  };

  const handleReject = (documentName: string, reason: string) => {
    toast({
      title: "Document Rejected",
      description: reason,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Document Review</h1>
            <p className="text-sm text-gray-400">Review and validate application documents</p>
          </div>
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
          <div className="space-y-6">
            <RecentDocuments 
              documents={recentDocuments}
            />
            <DocumentRequirements categories={documentCategories} />
          </div>
          <div className="space-y-6">
            {recentDocuments.map((doc, index) => (
              <DocumentValidation
                key={index}
                document={doc}
                onValidate={handleValidate}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DocumentReview;
