
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Filter, ChevronDown, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FrameworkSettings } from "@/components/eligibility/settings/FrameworkSettings";

interface SearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleFilterChange: (filter: string) => void;
}

export const SearchFilters = ({
  searchQuery,
  setSearchQuery,
  handleFilterChange,
}: SearchFiltersProps) => {
  return (
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
  );
};
