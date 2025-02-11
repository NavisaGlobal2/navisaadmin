
export type User = {
  id: string;
  name: string;
  email: string;
  visaType: string;
  status: "Active" | "Pending" | "Suspended";
  expert: string;
  country: string;
  lastUpdated: string;
};
