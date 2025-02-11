
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileText } from "lucide-react";

export const AssessmentCriteria = () => {
  const criteria = [
    { name: "Education Qualification", score: 85 },
    { name: "Work Experience", score: 70 },
    { name: "Publications & Research", score: 90 },
    { name: "Industry Recognition", score: 75 },
    { name: "Leadership Experience", score: 80 }
  ];

  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle>Assessment Criteria</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {criteria.map((criteria, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">{criteria.name}</span>
              <span className="text-sm text-gray-400">{criteria.score}%</span>
            </div>
            <Progress value={criteria.score} className="h-2" />
          </div>
        ))}
        <Button variant="outline" className="w-full mt-4">
          <FileText className="w-4 h-4 mr-2" />
          View Detailed Report
        </Button>
      </CardContent>
    </Card>
  );
};
