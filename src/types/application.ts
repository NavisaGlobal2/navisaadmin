
export type ApplicationStatus = "Pending Review" | "In Review" | "Approved" | "Rejected" | "More Info Needed" | "Escalated";

export type DocumentStatus = "Verified" | "Pending" | "Rejected";

export interface Document {
  name: string;
  status: DocumentStatus;
  lastUpdated?: string;
  notes?: string;
}

export interface InternalNote {
  id: string;
  content: string;
  createdBy: string;
  createdAt: string;
  assignedTo?: string;
}

export interface Application {
  id: string;
  userId: string;
  name: string;
  email: string;
  type: string;
  status: ApplicationStatus;
  submittedAt: string;
  lastUpdated: string;
  documents: Document[];
  assignedExpert?: string;
  internalNotes?: InternalNote[];
  nationality?: string;
  workHistory?: string;
  eligibilityScore?: number;
}
