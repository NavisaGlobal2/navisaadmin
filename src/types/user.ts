
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
  created_at: string;
  username?: string | null;
  avatar_url?: string | null;
}

export interface UserDocument {
  error: string | null;
  path: string;
  signedURL: string;
  signedUrl: string;
}

export interface UserAssessmentScore {
  uk?: {
    education: number;
    experience: number;
    finalScore: number;
    achievements: number;
  };
  us?: {
    education: number;
    experience: number;
    finalScore: number;
    achievements: number;
  };
  dubai?: {
    financial: number;
    finalScore: number;
    professional: number;
  };
  canada?: {
    language: number;
    education: number;
    finalScore: number;
    workExperience: number;
  };
}

export interface UserAssessment {
  id: string;
  created_at: string;
  client_id: string | null;
  personal: {
    email: string;
    fullName: string;
    nationality: string;
    currentLocation: string;
  };
  assessment_data: {
    field: string;
    language: string;
    education: string;
    experience: {
      years: string;
      position: string;
      foreignYears: string;
    };
    achievement: {
      achievementCount: number;
      achievementImpact: string;
    };
    salaryCategory: string;
    positionCategory: string;
    financialCategory: string;
  };
  email: string;
  updated_at: string;
  score: UserAssessmentScore;
}

export interface UserDetails {
  status: string;
  data: User;
  user_documents: {
    data: UserDocument[];
    error: string | null;
  };
  user_assessment: UserAssessment;
}
