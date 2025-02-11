
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ManualOverrideForm } from "./ManualOverrideForm";

interface Assessment {
  name: string;
  score: number;
  recommendation: string;
  visaType: string;
  time: string;
  overridden: boolean;
}

interface AssessmentListProps {
  onManualOverride: () => void;
}

export const AssessmentList = ({ onManualOverride }: AssessmentListProps) => {
  const assessments: Assessment[] = [
    {
      name: "John Doe",
      score: 85,
      recommendation: "Highly Eligible",
      visaType: "UK Global Talent Visa",
      time: "2 hours ago",
      overridden: false
    },
    {
      name: "Jane Smith",
      score: 72,
      recommendation: "Eligible with Conditions",
      visaType: "EB-1 Visa",
      time: "5 hours ago",
      overridden: true
    },
    {
      name: "Mike Johnson",
      score: 45,
      recommendation: "Not Eligible",
      visaType: "Express Entry Canada",
      time: "1 day ago",
      overridden: false
    }
  ];

  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Assessments</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Manual Override
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Manual Eligibility Override</DialogTitle>
            </DialogHeader>
            <ManualOverrideForm onSubmit={onManualOverride} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-4">
        {assessments.map((assessment, index) => (
          <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{assessment.name}</h4>
                {assessment.overridden && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-500">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Overridden
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-400">{assessment.visaType}</p>
              <p className="text-sm text-gray-400">{assessment.recommendation}</p>
            </div>
            <div className="text-left sm:text-right w-full sm:w-auto">
              <span className="text-sm font-medium">{assessment.score}/100</span>
              <p className="text-sm text-gray-400">{assessment.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
