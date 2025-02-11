
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const applicationSteps = [
  { number: 1, title: "Initial Review", description: "Document verification and basic eligibility check" },
  { number: 2, title: "Background Check", description: "Detailed background verification process" },
  { number: 3, title: "Expert Assessment", description: "Review by domain expert" },
  { number: 4, title: "Final Decision", description: "Application approval or rejection" }
];

export const ApplicationSteps = () => {
  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle>Application Steps</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {applicationSteps.map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                  {step.number}
                </div>
              </div>
              <div className="flex-grow">
                <h4 className="font-medium">{step.title}</h4>
                <p className="text-sm text-gray-400">{step.description}</p>
              </div>
              {index < applicationSteps.length - 1 && (
                <div className="absolute left-4 ml-4 w-0.5 h-16 bg-primary/20" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
