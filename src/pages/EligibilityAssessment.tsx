
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Brain, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { StatsOverview } from "@/components/eligibility/StatsOverview";
import { SearchFilters } from "@/components/eligibility/SearchFilters";
import { AssessmentList } from "@/components/eligibility/AssessmentList";
import { AssessmentCriteria } from "@/components/eligibility/AssessmentCriteria";
import { HistoricalTrends } from "@/components/eligibility/HistoricalTrends";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { FrameworkSettings } from "@/components/eligibility/settings/FrameworkSettings";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const EligibilityAssessment = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

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
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1 sm:flex-none">
                  <Settings className="w-4 h-4 mr-2" />
                  Framework Settings
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl h-[90vh]">
                <DialogHeader>
                  <DialogTitle>Assessment Framework Settings</DialogTitle>
                </DialogHeader>
                <FrameworkSettings />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <SearchFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleFilterChange={handleFilterChange}
        />

        <StatsOverview />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <AssessmentList onManualOverride={handleManualOverride} />
          <AssessmentCriteria />
          <HistoricalTrends />
        </div>
      </div>
    </DashboardLayout>
  );
};

// Add default export
export default EligibilityAssessment;
