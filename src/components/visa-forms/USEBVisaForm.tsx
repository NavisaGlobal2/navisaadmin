
import { UseFormReturn } from "react-hook-form";
import { VisaFormData } from "@/types/visa";
import { ScoreInput } from "./ScoreInput";

interface USEBVisaFormProps {
  form: UseFormReturn<VisaFormData>;
}

export function USEBVisaForm({ form }: USEBVisaFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Education Scoring</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScoreInput form={form} label="PhD Score" path="education.scoring.PhD" />
          <ScoreInput form={form} label="Masters Score" path="education.scoring.Masters" />
          <ScoreInput form={form} label="Bachelors (Exceptional) Score" path="education.scoring.BachelorsExceptional" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Experience Requirements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScoreInput form={form} label="Minimum Years Required" path="experience.minimumYearsRequired" />
          <ScoreInput form={form} label="5-7 Years Score" path="experience.experiencePoints.5-7Years" />
          <ScoreInput form={form} label="8-10 Years Score" path="experience.experiencePoints.8-10Years" />
          <ScoreInput form={form} label="10+ Years Score" path="experience.experiencePoints.10+Years" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Positions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScoreInput form={form} label="Executive Position" path="positions.Executive" />
          <ScoreInput form={form} label="Senior Management" path="positions.SeniorManagement" />
          <ScoreInput form={form} label="Expert Position" path="positions.Expert" />
          <ScoreInput form={form} label="Other Positions" path="positions.Other" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScoreInput form={form} label="Required Items" path="achievements.required" />
          <ScoreInput form={form} label="International Recognition" path="achievements.recognitionLevels.International" />
          <ScoreInput form={form} label="National Recognition" path="achievements.recognitionLevels.National" />
          <ScoreInput form={form} label="Industry Recognition" path="achievements.recognitionLevels.Industry" />
        </div>
      </div>
    </div>
  );
}
