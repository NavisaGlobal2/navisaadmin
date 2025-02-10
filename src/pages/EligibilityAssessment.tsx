
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, ChevronDown, Percent, ThumbsDown, ThumbsUp } from "lucide-react";

const EligibilityAssessment = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">AI Eligibility Assessment</h1>
          <Button>
            <Brain className="w-4 h-4 mr-2" />
            Adjust AI Parameters
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Success Rate", value: "78%", icon: ThumbsUp, color: "green" },
            { title: "Average Score", value: "82/100", icon: Percent, color: "blue" },
            { title: "Rejection Rate", value: "22%", icon: ThumbsDown, color: "red" },
          ].map((stat, index) => (
            <Card key={index} className="bg-white/5 border-white/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`w-4 h-4 text-${stat.color}-500`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle>Recent Assessments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "John Doe",
                  score: 85,
                  recommendation: "Highly Eligible",
                  time: "2 hours ago"
                },
                {
                  name: "Jane Smith",
                  score: 72,
                  recommendation: "Eligible with Conditions",
                  time: "5 hours ago"
                },
                {
                  name: "Mike Johnson",
                  score: 45,
                  recommendation: "Not Eligible",
                  time: "1 day ago"
                }
              ].map((assessment, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="font-medium">{assessment.name}</h4>
                    <p className="text-sm text-gray-400">{assessment.recommendation}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium">{assessment.score}/100</span>
                    <p className="text-sm text-gray-400">{assessment.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle>Assessment Criteria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { name: "Education Qualification", score: 85 },
                { name: "Work Experience", score: 70 },
                { name: "Language Proficiency", score: 90 },
                { name: "Financial Status", score: 75 },
                { name: "Age Factor", score: 80 }
              ].map((criteria, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{criteria.name}</span>
                    <span className="text-sm text-gray-400">{criteria.score}%</span>
                  </div>
                  <Progress value={criteria.score} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EligibilityAssessment;
