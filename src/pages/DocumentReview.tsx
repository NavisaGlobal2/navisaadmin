import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { DocumentStats } from "@/components/documents/DocumentStats";
import { RecentDocuments } from "@/components/documents/RecentDocuments";
import { DocumentRequirements } from "@/components/documents/DocumentRequirements";
import { DocumentValidation } from "@/components/documents/DocumentValidation";
import { DocumentUploadModal } from "@/components/documents/DocumentUploadModal";
import { useToast } from "@/hooks/use-toast";
import { Document, DocumentStatus, Application } from "@/types/application";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApplications } from "@/hooks/useApplications";

const DocumentReview = () => {
  const { toast } = useToast();
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [selectedUser, setSelectedUser] = useState<string>("all");
  const [selectedApplicationType, setSelectedApplicationType] = useState<string>("all");
  const { applications, handleUploadDocument } = useApplications();

  // Get unique users and application types
  const users = Array.from(new Set(applications.map(app => app.name)));
  const applicationTypes = Array.from(new Set(applications.map(app => app.type)));

  // Filter applications based on selection
  const filteredApplications = applications.filter(app => {
    const userMatch = selectedUser === "all" || app.name === selectedUser;
    const typeMatch = selectedApplicationType === "all" || app.type === selectedApplicationType;
    return userMatch && typeMatch;
  });

  // Get all documents from filtered applications
  const allDocuments = filteredApplications.reduce((docs, app) => {
    return [...docs, ...app.documents];
  }, [] as Document[]);

  // Stats calculation from filtered data
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

  const handleEdit = (documentName: string, notes: string) => {
    toast({
      title: "Document Updated",
      description: `Notes updated for ${documentName}`,
    });
  };

  const handleImproveWithAI = (documentName: string) => {
    toast({
      title: "AI Improvement Started",
      description: `Starting AI improvement process for ${documentName}`,
    });
  };

  const handleUpload = (file: File) => {
    const firstApplicationId = filteredApplications[0]?.id;
    if (firstApplicationId) {
      handleUploadDocument(firstApplicationId, file);
    } else {
      toast({
        title: "Upload Failed",
        description: "No application selected to upload document to",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Document Review</h1>
            <p className="text-sm text-gray-400">Review and validate application documents</p>
          </div>
          <DocumentUploadModal onUpload={handleUpload} />
        </div>

        <div className="flex gap-4 mb-6">
          <Select value={selectedUser} onValueChange={setSelectedUser}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select User" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              {users.map(user => (
                <SelectItem key={user} value={user}>{user}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedApplicationType} onValueChange={setSelectedApplicationType}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Application Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Application Types</SelectItem>
              {applicationTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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
                onEdit={handleEdit}
                onImproveWithAI={handleImproveWithAI}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DocumentReview;
