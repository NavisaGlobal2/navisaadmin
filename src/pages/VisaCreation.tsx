
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { adminApi } from "@/services/api";
import { VISA_TYPES, VisaType, VisaFormData } from "@/types/visa";
import { getDefaultValues, formatFormData } from "@/utils/visaFormUtils";
import { UKGlobalTalentForm } from "@/components/visa-forms/UKGlobalTalentForm";
import { USEBVisaForm } from "@/components/visa-forms/USEBVisaForm";
import { CanadaExpressEntryForm } from "@/components/visa-forms/CanadaExpressEntryForm";
import { DubaiGoldenVisaForm } from "@/components/visa-forms/DubaiGoldenVisaForm";

const VisaCreation = () => {
  const { toast } = useToast();
  const [selectedVisaType, setSelectedVisaType] = useState<VisaType | null>(null);
  const form = useForm<VisaFormData>({
    defaultValues: getDefaultValues(selectedVisaType),
  });

  const createVisaMutation = useMutation({
    mutationFn: (data: { visaName: string; formData: VisaFormData }) =>
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

  const onSubmit = (data: VisaFormData) => {
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

  const renderVisaForm = () => {
    switch (selectedVisaType) {
      case "UK Global Talent Visa":
        return <UKGlobalTalentForm form={form} />;
      case "US EB-1/EB-2 VISA":
        return <USEBVisaForm form={form} />;
      case "CANADA EXPRESS ENTRY":
        return <CanadaExpressEntryForm form={form} />;
      case "DUBAI GOLDEN VISA":
        return <DubaiGoldenVisaForm form={form} />;
      default:
        return null;
    }
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

                {selectedVisaType && renderVisaForm()}

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

export default VisaCreation;
