
import { Application, DocumentStatus } from "@/types/application";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  MessageSquare,
  User,
  FileText,
  Globe,
  Briefcase,
  ChartBar
} from "lucide-react";

interface ApplicationDetailsProps {
  application: Application;
  onAddNote: (applicationId: string, note: { content: string; assignedTo?: string }) => void;
  onClose: () => void;
}

export const ApplicationDetails = ({ application, onAddNote, onClose }: ApplicationDetailsProps) => {
  const [noteContent, setNoteContent] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const handleAddNote = () => {
    if (noteContent.trim()) {
      onAddNote(application.id, {
        content: noteContent,
        assignedTo: assignedTo || undefined
      });
      setNoteContent("");
      setAssignedTo("");
    }
  };

  const getDocumentStatusBadge = (status: DocumentStatus) => {
    const statusConfig = {
      "Verified": { color: "bg-green-500/10 text-green-500", icon: CheckCircle },
      "Pending": { color: "bg-yellow-500/10 text-yellow-500", icon: AlertCircle },
      "Rejected": { color: "bg-red-500/10 text-red-500", icon: XCircle }
    };

    const config = statusConfig[status];
    return (
      <Badge variant="secondary" className={config.color}>
        <config.icon className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    );
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="fixed inset-y-0 right-0 w-full max-w-xl bg-background shadow-lg p-6 overflow-y-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Application Details</h2>
            <Button variant="ghost" onClick={onClose}>Close</Button>
          </div>

          <div className="space-y-6">
            {/* Applicant Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Applicant Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium">{application.name}</h3>
                    <p className="text-sm text-muted-foreground">{application.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <span>{application.nationality}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <span>{application.workHistory}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {application.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">{doc.name}</span>
                      {getDocumentStatusBadge(doc.status)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Eligibility Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChartBar className="w-5 h-5" />
                  Eligibility Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all"
                      style={{ width: `${application.eligibilityScore}%` }}
                    />
                  </div>
                  <span className="font-medium">{application.eligibilityScore}%</span>
                </div>
              </CardContent>
            </Card>

            {/* Internal Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Internal Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {application.internalNotes?.map((note, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg space-y-2">
                      <p className="text-sm">{note.content}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>By: {note.createdBy}</span>
                        {note.assignedTo && <span>Assigned to: {note.assignedTo}</span>}
                        <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Add a note..."
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                  />
                  <Input
                    placeholder="Assign to (optional)"
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                  />
                  <Button onClick={handleAddNote} className="w-full">
                    Add Note
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
