
import { Application } from "@/types/application";

export const mockApplications: Application[] = [
  {
    id: "1",
    userId: "1",
    name: "John Doe",
    type: "Student Visa",
    status: "In Review",
    submittedAt: "2024-03-10T10:00:00",
    lastUpdated: "2024-03-11T14:30:00",
    documents: [
      { name: "Passport", status: "Verified" },
      { name: "Academic Records", status: "Pending" }
    ]
  },
  {
    id: "2",
    userId: "2",
    name: "Jane Smith",
    type: "Work Permit",
    status: "Pending",
    submittedAt: "2024-03-09T15:20:00",
    lastUpdated: "2024-03-10T09:45:00",
    documents: [
      { name: "Resume", status: "Verified" },
      { name: "Job Offer", status: "Pending" }
    ]
  },
  {
    id: "3",
    userId: "3",
    name: "Mike Johnson",
    type: "Tourist Visa",
    status: "Approved",
    submittedAt: "2024-03-08T11:00:00",
    lastUpdated: "2024-03-09T16:20:00",
    documents: [
      { name: "Bank Statement", status: "Verified" },
      { name: "Hotel Booking", status: "Verified" }
    ]
  }
];
