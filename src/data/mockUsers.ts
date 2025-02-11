
import { User } from "@/types/user";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    visaType: "Student Visa",
    status: "Active",
    expert: "Sarah Wilson",
    country: "United States",
    lastUpdated: "2024-02-20",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    visaType: "Work Permit",
    status: "Pending",
    expert: "Michael Brown",
    country: "Canada",
    lastUpdated: "2024-02-19",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert@example.com",
    visaType: "Tourist Visa",
    status: "Suspended",
    expert: "Emily Davis",
    country: "UK",
    lastUpdated: "2024-02-18",
  },
];
