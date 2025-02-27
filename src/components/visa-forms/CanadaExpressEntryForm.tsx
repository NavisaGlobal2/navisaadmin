
import { UseFormReturn } from "react-hook-form";
import { VisaFormData } from "@/types/visa";
import { ScoreInput } from "./ScoreInput";

interface CanadaExpressEntryFormProps {
  form: UseFormReturn<VisaFormData>;
}

export function CanadaExpressEntryForm({ form }: CanadaExpressEntryFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Education</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScoreInput form={form} label="PhD" path="education.PhD" />
          <ScoreInput form={form} label="Masters" path="education.Masters" />
          <ScoreInput form={form} label="Bachelors" path="education.Bachelors" />
          <ScoreInput form={form} label="Three Year Diploma" path="education.ThreeYearDiploma" />
          <ScoreInput form={form} label="One/Two Year Diploma" path="education.OneTwoYearDiploma" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Language Proficiency</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScoreInput form={form} label="CLB 9+" path="languageProficiency.CLB9Plus" />
          <ScoreInput form={form} label="CLB 8" path="languageProficiency.CLB8" />
          <ScoreInput form={form} label="CLB 7" path="languageProficiency.CLB7" />
          <ScoreInput form={form} label="CLB 6" path="languageProficiency.CLB6" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Work Experience</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScoreInput form={form} label="1 Year" path="workExperience.scoring.1Year" />
          <ScoreInput form={form} label="2-3 Years" path="workExperience.scoring.2-3Years" />
          <ScoreInput form={form} label="4-5 Years" path="workExperience.scoring.4-5Years" />
          <ScoreInput form={form} label="6+ Years" path="workExperience.scoring.6+Years" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Foreign Experience Bonus</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScoreInput form={form} label="1-2 Years" path="workExperience.foreignBonus.1-2Years" />
          <ScoreInput form={form} label="3-4 Years" path="workExperience.foreignBonus.3-4Years" />
          <ScoreInput form={form} label="5+ Years" path="workExperience.foreignBonus.5+Years" />
        </div>
      </div>
    </div>
  );
}
