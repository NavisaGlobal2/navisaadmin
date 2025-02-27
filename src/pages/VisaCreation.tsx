
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { adminApi } from "@/services/api";

const VISA_TYPES = [
  "UK Global Talent Visa",
  "US EB-1/EB-2 VISA",
  "CANADA EXPRESS ENTRY",
  "DUBAI GOLDEN VISA",
] as const;

type VisaType = typeof VISA_TYPES[number];

const VisaCreation = () => {
  const { toast } = useToast();
  const [selectedVisaType, setSelectedVisaType] = useState<VisaType | null>(null);
  const form = useForm({
    defaultValues: getDefaultValues(selectedVisaType),
  });

  const createVisaMutation = useMutation({
    mutationFn: (data: { visaName: string; formData: any }) =>
      adminApi.createVisa(data.visaName, data.formData),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Visa criteria created successfully",
      });
      form.reset();
      setSelectedVisaType(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create visa criteria",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    if (!selectedVisaType) return;
    createVisaMutation.mutate({
      visaName: selectedVisaType,
      formData: formatFormData(selectedVisaType, data),
    });
  };

  const handleVisaTypeChange = (value: VisaType) => {
    setSelectedVisaType(value);
    form.reset(getDefaultValues(value));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-2xl font-semibold">Create Visa Criteria</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Set up scoring criteria for different visa types
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Visa Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <FormLabel>Visa Type</FormLabel>
                  <Select
                    onValueChange={handleVisaTypeChange}
                    value={selectedVisaType || undefined}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select visa type" />
                    </SelectTrigger>
                    <SelectContent>
                      {VISA_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedVisaType && renderFormFields(selectedVisaType, form)}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={createVisaMutation.isPending}
                >
                  {createVisaMutation.isPending ? "Creating..." : "Create Visa Criteria"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

function getDefaultValues(visaType: VisaType | null) {
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

function formatFormData(visaType: VisaType, data: any) {
  return data;
}

function renderFormFields(visaType: VisaType, form: any) {
  const renderScoreInput = (label: string, path: string) => (
    <FormField
      control={form.control}
      name={path}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="number"
              min="0"
              max="100"
              {...field}
              onChange={(e) => field.onChange(parseInt(e.target.value))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  switch (visaType) {
    case "UK Global Talent Visa":
      return (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Education Scoring</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderScoreInput("PhD Score", "education.scoring.PhD")}
              {renderScoreInput("Masters Score", "education.scoring.Masters")}
              {renderScoreInput("Bachelors Score", "education.scoring.Bachelors")}
              {renderScoreInput("Diploma Score", "education.scoring.Diploma")}
              {renderScoreInput("Other Score", "education.scoring.Other")}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Experience Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderScoreInput("Minimum Years Required", "experience.minimumYearsRequired")}
              {renderScoreInput("3-5 Years Score", "experience.experiencePoints.3-5Years")}
              {renderScoreInput("5-8 Years Score", "experience.experiencePoints.5-8Years")}
              {renderScoreInput("8+ Years Score", "experience.experiencePoints.8+Years")}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderScoreInput("Required Items", "achievements.required")}
              {renderScoreInput("2 Items Score", "achievements.scoring.2Items")}
              {renderScoreInput("3 Items Score", "achievements.scoring.3Items")}
              {renderScoreInput("4+ Items Score", "achievements.scoring.4PlusItems")}
            </div>
          </div>
        </div>
      );

    case "US EB-1/EB-2 VISA":
      return (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Education Scoring</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderScoreInput("PhD Score", "education.scoring.PhD")}
              {renderScoreInput("Masters Score", "education.scoring.Masters")}
              {renderScoreInput("Bachelors (Exceptional) Score", "education.scoring.BachelorsExceptional")}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Experience Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderScoreInput("Minimum Years Required", "experience.minimumYearsRequired")}
              {renderScoreInput("5-7 Years Score", "experience.experiencePoints.5-7Years")}
              {renderScoreInput("8-10 Years Score", "experience.experiencePoints.8-10Years")}
              {renderScoreInput("10+ Years Score", "experience.experiencePoints.10+Years")}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Positions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderScoreInput("Executive Position", "positions.Executive")}
              {renderScoreInput("Senior Management", "positions.SeniorManagement")}
              {renderScoreInput("Expert Position", "positions.Expert")}
              {renderScoreInput("Other Positions", "positions.Other")}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderScoreInput("Required Items", "achievements.required")}
              {renderScoreInput("International Recognition", "achievements.recognitionLevels.International")}
              {renderScoreInput("National Recognition", "achievements.recognitionLevels.National")}
              {renderScoreInput("Industry Recognition", "achievements.recognitionLevels.Industry")}
            </div>
          </div>
        </div>
      );

    case "CANADA EXPRESS ENTRY":
      return (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Education</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderScoreInput("PhD", "education.PhD")}
              {renderScoreInput("Masters", "education.Masters")}
              {renderScoreInput("Bachelors", "education.Bachelors")}
              {renderScoreInput("Three Year Diploma", "education.ThreeYearDiploma")}
              {renderScoreInput("One/Two Year Diploma", "education.OneTwoYearDiploma")}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Language Proficiency</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderScoreInput("CLB 9+", "languageProficiency.CLB9Plus")}
              {renderScoreInput("CLB 8", "languageProficiency.CLB8")}
              {renderScoreInput("CLB 7", "languageProficiency.CLB7")}
              {renderScoreInput("CLB 6", "languageProficiency.CLB6")}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Work Experience</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderScoreInput("1 Year", "workExperience.scoring.1Year")}
              {renderScoreInput("2-3 Years", "workExperience.scoring.2-3Years")}
              {renderScoreInput("4-5 Years", "workExperience.scoring.4-5Years")}
              {renderScoreInput("6+ Years", "workExperience.scoring.6+Years")}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Foreign Experience Bonus</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderScoreInput("1-2 Years", "workExperience.foreignBonus.1-2Years")}
              {renderScoreInput("3-4 Years", "workExperience.foreignBonus.3-4Years")}
              {renderScoreInput("5+ Years", "workExperience.foreignBonus.5+Years")}
            </div>
          </div>
        </div>
      );

    case "DUBAI GOLDEN VISA":
      return (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Financial Criteria</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderScoreInput("Public Investment 10M+", "financialCriteria.PublicInvestment10MPlus")}
              {renderScoreInput("Public Investment 5-10M", "financialCriteria.PublicInvestment5To10M")}
              {renderScoreInput("Private Company 5M+", "financialCriteria.PrivateCompany5MPlus")}
              {renderScoreInput("Private Company 3-5M", "financialCriteria.PrivateCompany3To5M")}
              {renderScoreInput("Property Investment 2M+", "financialCriteria.PropertyInvestment2MPlus")}
              {renderScoreInput("Property Investment 1-2M", "financialCriteria.PropertyInvestment1To2M")}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Professional Criteria</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderScoreInput("Salary 30K+", "professionalCriteria.Salary30KPlus")}
              {renderScoreInput("Salary 20-30K", "professionalCriteria.Salary20To30K")}
              {renderScoreInput("Salary 15-20K", "professionalCriteria.Salary15To20K")}
              {renderScoreInput("CEO/MD Position", "professionalCriteria.PositionCEOMD")}
              {renderScoreInput("Senior Management", "professionalCriteria.PositionSeniorManagement")}
              {renderScoreInput("Department Head", "professionalCriteria.PositionDepartmentHead")}
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default VisaCreation;
