
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  ChevronDown,
  Percent,
  ThumbsDown,
  ThumbsUp,
  Search,
  Filter,
  History,
  Settings,
  Edit,
  AlertTriangle,
  FileText,
  ArrowUpDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const EligibilityAssessment = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [manualScore, setManualScore] = useState(85);
  const [overrideReason, setOverrideReason] = useState("");

  const handleAIParamsClick = () => {
    toast({
      title: "AI Parameters",
      description: "Opening AI parameter configuration...",
    });
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    toast({
      title: "Filter Applied",
      description: `Showing ${filter} assessments`,
    });
  };

  const handleManualOverride = () => {
    toast({
      title: "Score Updated",
      description: "Manual override has been recorded with justification",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold">AI Eligibility Assessment</h1>
            <p className="text-sm text-gray-400">Manage and override AI-driven eligibility decisions</p>
          </div>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={() => {}} className="flex-1 sm:flex-none">
              <History className="w-4 h-4 mr-2" />
              Assessment History
            </Button>
            <Button onClick={handleAIParamsClick} className="flex-1 sm:flex-none">
              <Brain className="w-4 h-4 mr-2" />
              Adjust AI Parameters
            </Button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search by name, email, or visa type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex-1 sm:flex-none">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem onClick={() => handleFilterChange("all")}>
                  All Assessments
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange("pending")}>
                  Pending Review
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange("approved")}>
                  Approved
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange("rejected")}>
                  Rejected
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange("manual")}>
                  Manual Adjustments
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" className="flex-1 sm:flex-none">
              <Settings className="w-4 h-4 mr-2" />
              Framework Settings
            </Button>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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

        {/* Recent Assessments and Manual Override */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
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
                    <Button onClick={handleManualOverride} className="w-full">
                      Apply Override
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
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
              ].map((assessment, index) => (
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

          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle>Assessment Criteria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { name: "Education Qualification", score: 85 },
                { name: "Work Experience", score: 70 },
                { name: "Publications & Research", score: 90 },
                { name: "Industry Recognition", score: 75 },
                { name: "Leadership Experience", score: 80 }
              ].map((criteria, index) => (
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

          {/* Historical Trends */}
          <Card className="bg-white/5 border-white/10 lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Historical Assessment Trends</CardTitle>
              <Button variant="outline" size="sm">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                Sort by Date
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: "Mar 2024", score: 85, changes: "+5", notes: "Improved work experience" },
                  { date: "Feb 2024", score: 80, changes: "+10", notes: "Added new qualifications" },
                  { date: "Jan 2024", score: 70, changes: "-5", notes: "Policy changes affected score" }
                ].map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{record.date}</div>
                      <p className="text-sm text-gray-400">{record.notes}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{record.score}/100</div>
                      <span className={`text-sm ${
                        record.changes.startsWith("+") ? "text-green-500" : "text-red-500"
                      }`}>
                        {record.changes} points
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EligibilityAssessment;
