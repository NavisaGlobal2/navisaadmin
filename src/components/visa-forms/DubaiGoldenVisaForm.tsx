
import { UseFormReturn } from "react-hook-form";
import { VisaFormData } from "@/types/visa";
import { ScoreInput } from "./ScoreInput";

interface DubaiGoldenVisaFormProps {
  form: UseFormReturn<VisaFormData>;
}

export function DubaiGoldenVisaForm({ form }: DubaiGoldenVisaFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Financial Criteria</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScoreInput form={form} label="Public Investment 10M+" path="financialCriteria.PublicInvestment10MPlus" />
          <ScoreInput form={form} label="Public Investment 5-10M" path="financialCriteria.PublicInvestment5To10M" />
          <ScoreInput form={form} label="Private Company 5M+" path="financialCriteria.PrivateCompany5MPlus" />
          <ScoreInput form={form} label="Private Company 3-5M" path="financialCriteria.PrivateCompany3To5M" />
          <ScoreInput form={form} label="Property Investment 2M+" path="financialCriteria.PropertyInvestment2MPlus" />
          <ScoreInput form={form} label="Property Investment 1-2M" path="financialCriteria.PropertyInvestment1To2M" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Professional Criteria</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScoreInput form={form} label="Salary 30K+" path="professionalCriteria.Salary30KPlus" />
          <ScoreInput form={form} label="Salary 20-30K" path="professionalCriteria.Salary20To30K" />
          <ScoreInput form={form} label="Salary 15-20K" path="professionalCriteria.Salary15To20K" />
          <ScoreInput form={form} label="CEO/MD Position" path="professionalCriteria.PositionCEOMD" />
          <ScoreInput form={form} label="Senior Management" path="professionalCriteria.PositionSeniorManagement" />
          <ScoreInput form={form} label="Department Head" path="professionalCriteria.PositionDepartmentHead" />
        </div>
      </div>
    </div>
  );
}
