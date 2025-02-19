
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AssignExpertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (expertName: string) => void;
}

const experts = [
  "Sarah Wilson",
  "Michael Brown",
  "Emily Davis",
  "James Wilson",
  "Emma Thompson"
];

export const AssignExpertModal = ({
  isOpen,
  onClose,
  onAssign,
}: AssignExpertModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Expert</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Select onValueChange={(value) => onAssign(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select an expert" />
              </SelectTrigger>
              <SelectContent>
                {experts.map((expert) => (
                  <SelectItem key={expert} value={expert}>
                    {expert}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
