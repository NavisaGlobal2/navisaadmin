
import { Document } from "@/types/application";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  FileText, 
  History, 
  Edit, 
  Wand2 
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface DocumentValidationProps {
  document: Document;
  onValidate: (documentName: string) => void;
  onApprove: (documentName: string) => void;
  onReject: (documentName: string, reason: string) => void;
  onEdit: (documentName: string, notes: string) => void;
  onImproveWithAI: (documentName: string) => void;
}

export const DocumentValidation = ({
  document,
  onValidate,
  onApprove,
  onReject,
  onEdit,
  onImproveWithAI
}: DocumentValidationProps) => {
  const [editNotes, setEditNotes] = useState(document.notes || "");
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    onEdit(document.name, editNotes);
    setIsEditing(false);
  };

  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">{document.name}</CardTitle>
          <p className="text-sm text-gray-400">Version {document.version || 1}</p>
        </div>
        <Badge
          variant="outline"
          className={
            document.status === "Verified"
              ? "bg-green-500/10 text-green-500"
              : document.status === "Rejected"
              ? "bg-red-500/10 text-red-500"
              : "bg-yellow-500/10 text-yellow-500"
          }
        >
          {document.status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {document.validationResults && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">AI Validation Results</span>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                {document.validationResults.aiConfidenceScore}% Confidence
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                {document.validationResults.isComplete ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                )}
                <span className="text-sm">Completeness Check</span>
              </div>
              <div className="flex items-center space-x-2">
                {document.validationResults.isAccurate ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                )}
                <span className="text-sm">Accuracy Check</span>
              </div>
            </div>
            {document.validationResults.suggestions && (
              <div className="mt-2">
                <h4 className="text-sm font-medium mb-1">Suggestions:</h4>
                <ul className="text-sm text-gray-400 list-disc list-inside">
                  {document.validationResults.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {document.history && document.history.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <History className="w-4 h-4 mr-1" />
              Version History
            </h4>
            <ScrollArea className="h-32">
              {document.history.map((version, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-gray-800"
                >
                  <div className="text-sm">
                    <span className="font-medium">v{version.version}</span>
                    <span className="text-gray-400 ml-2">
                      {new Date(version.uploadedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {version.status}
                  </Badge>
                </div>
              ))}
            </ScrollArea>
          </div>
        )}

        <div>
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Document Notes</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Add notes about this document..."
                  className="min-h-[100px]"
                />
                <Button onClick={handleEdit} className="w-full">
                  Save Changes
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onValidate(document.name)}
                >
                  <FileText className="w-4 h-4 mr-1" />
                  Validate
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Run AI validation checks</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onImproveWithAI(document.name)}
                >
                  <Wand2 className="w-4 h-4 mr-1" />
                  Improve with AI
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Use AI to improve document quality</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit document notes</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-green-500"
                  onClick={() => onApprove(document.name)}
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Approve
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Approve this document</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500"
                  onClick={() => onReject(document.name, "Document does not meet requirements")}
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Reject
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reject this document</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};
