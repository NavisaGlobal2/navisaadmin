
import { Application } from "@/types/application";

export const mockApplications: Application[] = [
  {
    id: "1",
    userId: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    type: "Global Talent Visa",
    status: "In Review",
    submittedAt: "2024-03-10T10:00:00",
    lastUpdated: "2024-03-11T14:30:00",
    documents: [
      { name: "Passport", status: "Verified", lastUpdated: "2024-03-11T12:00:00" },
      { name: "Academic Records", status: "Pending", lastUpdated: "2024-03-10T10:00:00" }
    ],
    assignedExpert: "Sarah Wilson",
    nationality: "United States",
    workHistory: "10 years in Tech",
    eligibilityScore: 85,
    internalNotes: [
      {
        id: "note1",
        content: "Academic records need verification",
        createdBy: "Admin",
        createdAt: "2024-03-11T14:30:00",
        assignedTo: "Sarah Wilson"
      }
    ]
  },
  {
    id: "2",
    userId: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    type: "Work Permit",
    status: "Pending Review",
    submittedAt: "2024-03-09T15:20:00",
    lastUpdated: "2024-03-10T09:45:00",
    documents: [
      { name: "Resume", status: "Verified", lastUpdated: "2024-03-09T16:00:00" },
      { name: "Job Offer", status: "Pending", lastUpdated: "2024-03-09T15:20:00" }
    ],
    nationality: "Canada",
    workHistory: "5 years in Finance",
    eligibilityScore: 75
  },
  {
    id: "3",
    userId: "3",
    name: "Mike Johnson",
    email: "mike.j@example.com",
    type: "Express Entry",
    status: "Approved",
    submittedAt: "2024-03-08T11:00:00",
    lastUpdated: "2024-03-09T16:20:00",
    documents: [
      { name: "Bank Statement", status: "Verified", lastUpdated: "2024-03-09T14:00:00" },
      { name: "Education Certificate", status: "Verified", lastUpdated: "2024-03-09T15:00:00" }
    ],
    assignedExpert: "Michael Brown",
    nationality: "UK",
    workHistory: "8 years in Engineering",
    eligibilityScore: 92
  }
];
