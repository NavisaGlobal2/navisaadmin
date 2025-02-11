
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
