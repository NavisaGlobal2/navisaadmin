
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";

interface ManualOverrideFormProps {
  onSubmit: () => void;
}

export const ManualOverrideForm = ({ onSubmit }: ManualOverrideFormProps) => {
  const [manualScore, setManualScore] = useState(85);
  const [overrideReason, setOverrideReason] = useState("");

  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label>Adjusted Score</Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[manualScore]}
            onValueChange={([value]) => setManualScore(value)}
            max={100}
            step={1}
          />
          <span className="w-12 text-right">{manualScore}%</span>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Override Justification</Label>
        <Textarea
          value={overrideReason}
          onChange={(e) => setOverrideReason(e.target.value)}
          placeholder="Provide detailed reasoning for the manual override..."
        />
      </div>
      <Button onClick={onSubmit} className="w-full">
        Apply Override
      </Button>
    </div>
  );
};
