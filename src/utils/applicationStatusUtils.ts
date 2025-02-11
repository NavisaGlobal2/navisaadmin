
import { AlertCircle, CheckCircle, Clock, MessageSquare, XCircle } from "lucide-react";
import { Application } from "@/types/application";

export const getStatusConfig = (status: Application["status"]) => {
  const statusConfig = {
    "Pending Review": { icon: Clock, className: "bg-blue-500/10 text-blue-500" },
    "In Review": { icon: AlertCircle, className: "bg-yellow-500/10 text-yellow-500" },
    "Approved": { icon: CheckCircle, className: "bg-green-500/10 text-green-500" },
    "Rejected": { icon: XCircle, className: "bg-red-500/10 text-red-500" },
    "More Info Needed": { icon: MessageSquare, className: "bg-purple-500/10 text-purple-500" },
    "Escalated": { icon: AlertCircle, className: "bg-orange-500/10 text-orange-500" }
  };

  return statusConfig[status];
};

export const filterApplications = (
  applications: Application[],
  searchQuery: string,
  statusFilter: string,
  expertFilter: string
) => {
  return applications.filter(app => {
    const matchesSearch = 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    const matchesExpert = expertFilter === "all" || app.assignedExpert === expertFilter;
    
    return matchesSearch && matchesStatus && matchesExpert;
  });
};
