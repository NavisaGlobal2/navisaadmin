export interface User {
  id: string;
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  visaType: string;
  visa_type: string;
  status: string;
  expert: string;
  country: string;
  lastUpdated: string;
  role?: string;
  clients?: User[];
  updated_at: string;
  client_admin?: {
    id: string;
    name: string;
    email: string;
  };
}
