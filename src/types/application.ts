
export type ApplicationStatus = "In Review" | "Pending" | "Approved" | "Rejected";

export type Application = {
  id: string;
  userId: string;
  name: string;
  type: string;
  status: ApplicationStatus;
  submittedAt: string;
  lastUpdated: string;
  documents: {
    name: string;
    status: "Verified" | "Pending" | "Rejected";
  }[];
  notes?: string;
};
