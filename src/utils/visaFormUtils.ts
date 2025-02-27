
import { VisaType, VisaFormData } from "@/types/visa";

export function getDefaultValues(visaType: VisaType | null): VisaFormData {
  switch (visaType) {
    case "UK Global Talent Visa":
      return {
        education: {
          scoring: {
            PhD: 100,
            Masters: 80,
            Bachelors: 60,
            Diploma: 40,
            Other: 20,
          },
        },
        experience: {
          minimumYearsRequired: 3,
          experiencePoints: {
            "3-5Years": 60,
            "5-8Years": 80,
            "8+Years": 100,
          },
        },
        achievements: {
          required: 2,
          scoring: {
            "2Items": 60,
            "3Items": 80,
            "4PlusItems": 100,
          },
        },
      };
    case "US EB-1/EB-2 VISA":
      return {
        education: {
          scoring: {
            PhD: 100,
            Masters: 80,
            BachelorsExceptional: 60,
          },
        },
        experience: {
          minimumYearsRequired: 5,
          experiencePoints: {
            "5-7Years": 60,
            "8-10Years": 80,
            "10+Years": 100,
          },
        },
        positions: {
          Executive: 100,
          SeniorManagement: 80,
          Expert: 70,
          Other: 50,
        },
        achievements: {
          required: 3,
          recognitionLevels: {
            International: 100,
            National: 80,
            Industry: 60,
          },
        },
      };
    case "CANADA EXPRESS ENTRY":
      return {
        education: {
          PhD: 100,
          Masters: 80,
          Bachelors: 60,
          ThreeYearDiploma: 50,
          OneTwoYearDiploma: 40,
        },
        languageProficiency: {
          CLB9Plus: 100,
          CLB8: 80,
          CLB7: 60,
          CLB6: 40,
          BelowCLB6: "Ineligible",
        },
        workExperience: {
          scoring: {
            "1Year": 40,
            "2-3Years": 53,
            "4-5Years": 64,
            "6+Years": 72,
          },
          foreignBonus: {
            "1-2Years": 13,
            "3-4Years": 25,
            "5+Years": 50,
          },
        },
      };
    case "DUBAI GOLDEN VISA":
      return {
        financialCriteria: {
          PublicInvestment10MPlus: 100,
          PublicInvestment5To10M: 80,
          PrivateCompany5MPlus: 80,
          PrivateCompany3To5M: 60,
          PropertyInvestment2MPlus: 60,
          PropertyInvestment1To2M: 40,
        },
        professionalCriteria: {
          Salary30KPlus: 100,
          Salary20To30K: 80,
          Salary15To20K: 60,
          PositionCEOMD: 100,
          PositionSeniorManagement: 80,
          PositionDepartmentHead: 60,
        },
      };
    default:
      return {};
  }
}

export function formatFormData(visaType: VisaType, data: VisaFormData): VisaFormData {
  return data;
}
