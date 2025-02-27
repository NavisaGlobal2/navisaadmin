
import { UseFormReturn } from "react-hook-form";
import { VisaFormData } from "@/types/visa";
import { ScoreInput } from "./ScoreInput";

interface UKGlobalTalentFormProps {
  form: UseFormReturn<VisaFormData>;
}

export function UKGlobalTalentForm({ form }: UKGlobalTalentFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Education Scoring</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScoreInput form={form} label="PhD Score" path="education.scoring.PhD" />
          <ScoreInput form={form} label="Masters Score" path="education.scoring.Masters" />
          <ScoreInput form={form} label="Bachelors Score" path="education.scoring.Bachelors" />
          <ScoreInput form={form} label="Diploma Score" path="education.scoring.Diploma" />
          <ScoreInput form={form} label="Other Score" path="education.scoring.Other" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Experience Requirements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScoreInput form={form} label="Minimum Years Required" path="experience.minimumYearsRequired" />
          <ScoreInput form={form} label="3-5 Years Score" path="experience.experiencePoints.3-5Years" />
          <ScoreInput form={form} label="5-8 Years Score" path="experience.experiencePoints.5-8Years" />
          <ScoreInput form={form} label="8+ Years Score" path="experience.experiencePoints.8+Years" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScoreInput form={form} label="Required Items" path="achievements.required" />
          <ScoreInput form={form} label="2 Items Score" path="achievements.scoring.2Items" />
          <ScoreInput form={form} label="3 Items Score" path="achievements.scoring.3Items" />
          <ScoreInput form={form} label="4+ Items Score" path="achievements.scoring.4PlusItems" />
        </div>
      </div>
    </div>
  );
}
