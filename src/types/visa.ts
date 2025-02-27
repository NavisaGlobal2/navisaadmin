
export const VISA_TYPES = [
  "UK Global Talent Visa",
  "US EB-1/EB-2 VISA",
  "CANADA EXPRESS ENTRY",
  "DUBAI GOLDEN VISA",
] as const;

export type VisaType = typeof VISA_TYPES[number];

export type VisaFormData = {
  education?: {
    scoring?: {
      PhD?: number;
      Masters?: number;
      Bachelors?: number;
      Diploma?: number;
      Other?: number;
      BachelorsExceptional?: number;
    };
    PhD?: number;
    Masters?: number;
    Bachelors?: number;
    ThreeYearDiploma?: number;
    OneTwoYearDiploma?: number;
  };
  experience?: {
    minimumYearsRequired?: number;
    experiencePoints?: {
      [key: string]: number;
    };
  };
  achievements?: {
    required?: number;
    scoring?: {
      [key: string]: number;
    };
    recognitionLevels?: {
      International?: number;
      National?: number;
      Industry?: number;
    };
  };
  positions?: {
    Executive?: number;
    SeniorManagement?: number;
    Expert?: number;
    Other?: number;
  };
  languageProficiency?: {
    CLB9Plus?: number;
    CLB8?: number;
    CLB7?: number;
    CLB6?: number;
    BelowCLB6?: string;
  };
  workExperience?: {
    scoring?: {
      [key: string]: number;
    };
    foreignBonus?: {
      [key: string]: number;
    };
  };
  financialCriteria?: {
    [key: string]: number;
  };
  professionalCriteria?: {
    [key: string]: number;
  };
};
