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
  const [selectedFramework, setSelectedFramework] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleFrameworkChange = (value) => {
    setSelectedFramework(value);
    toast({ title: "Framework selected", description: value });
  };

  return (
    <DashboardLayout>
      <div>
        <h1>Eligibility Assessment</h1>
        <Select onValueChange={handleFrameworkChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a framework" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="framework1">Framework 1</SelectItem>
            <SelectItem value="framework2">Framework 2</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => setIsDialogOpen(true)}>Open Dialog</Button>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <StatsOverview />
        <SearchFilters />
        <AssessmentList />
        <AssessmentCriteria />
        <HistoricalTrends />
        <FrameworkSettings />
      </div>
    </DashboardLayout>
  );
};

// Add default export
export default EligibilityAssessment;
