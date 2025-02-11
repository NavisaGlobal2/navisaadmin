
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { DocumentStats } from "@/components/documents/DocumentStats";
import { RecentDocuments } from "@/components/documents/RecentDocuments";
import { DocumentRequirements } from "@/components/documents/DocumentRequirements";
import { DocumentValidation } from "@/components/documents/DocumentValidation";
import { useToast } from "@/hooks/use-toast";
import { Document, DocumentStatus } from "@/types/application";
import { mockApplications } from "@/data/mockApplications";

const DocumentReview = () => {
  const { toast } = useToast();
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  // Get all documents from all applications
  const allDocuments = mockApplications.reduce((docs, app) => {
    return [...docs, ...app.documents];
  }, [] as Document[]);

  // Stats calculation from actual data
  const totalDocuments = allDocuments.length;
  const verifiedDocuments = allDocuments.filter(doc => doc.status === "Verified").length;
  const rejectedDocuments = allDocuments.filter(doc => doc.status === "Rejected").length;
  const pendingDocuments = allDocuments.filter(doc => doc.status === "Pending").length;

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
          totalDocuments={totalDocuments}
          approvedDocuments={verifiedDocuments}
          rejectedDocuments={rejectedDocuments}
          pendingDocuments={pendingDocuments}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <RecentDocuments 
              documents={allDocuments}
            />
            <DocumentRequirements categories={documentCategories} />
          </div>
          <div className="space-y-6">
            {allDocuments.map((doc, index) => (
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
