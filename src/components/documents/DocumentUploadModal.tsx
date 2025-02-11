
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DocumentUploadModalProps {
  onUpload: (file: File) => void;
}

export const DocumentUploadModal = ({ onUpload }: DocumentUploadModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (file) {
      onUpload(file);
      setFile(null);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="document">Document</Label>
            <div className="flex items-center gap-2">
              <Input
                id="document"
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
              {file && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setFile(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          {file && (
            <div className="text-sm text-gray-500">
              Selected file: {file.name} ({(file.size / 1024 / 1024).toFixed(2)}MB)
            </div>
          )}
          <Button
            className="w-full"
            onClick={handleUpload}
            disabled={!file}
          >
            Upload
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
