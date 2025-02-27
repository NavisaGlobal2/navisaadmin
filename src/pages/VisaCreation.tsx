
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
                <FormField
                  control={form.control}
                  name="visaType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Visa Type</FormLabel>
                      <Select
                        onValueChange={(value: VisaType) => handleVisaTypeChange(value)}
                        value={selectedVisaType || undefined}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select visa type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {VISA_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

// Helper functions for form rendering and data handling
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
    // Add other visa types default values similarly
    default:
      return {};
  }
}

function formatFormData(visaType: VisaType, data: any) {
  // Format the form data according to the API schema
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
              {renderScoreInput(
                "Minimum Years Required",
                "experience.minimumYearsRequired"
              )}
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
    // Add other visa types form fields
    default:
      return null;
  }
}

export default VisaCreation;
