
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Application } from '@/types/application';
import { adminApi } from '@/services/api';

export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      try {
        const response = await adminApi.getAllApplications();
        console.log(response.data);
        setApplications(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleStatusChange = (applicationId: string, newStatus: Application['status']) => {
    setApplications(
      applications.map((app) => {
        if (app.id === applicationId) {
          return {
            ...app,
            status: newStatus,
            lastUpdated: new Date().toISOString(),
          };
        }
        return app;
      })
    );

    toast({
      title: 'Status Updated',
      description: `Application status changed to ${newStatus}`,
    });
  };

  const handleDocumentStatusUpdate = (
    applicationId: string,
    documentName: string,
    newStatus: 'Verified' | 'Pending' | 'Rejected'
  ) => {
    setApplications(
      applications.map((app) => {
        if (app.id === applicationId) {
          return {
            ...app,
            documents: app.documents.map((doc) => {
              if (doc.name === documentName) {
                return {
                  ...doc,
                  status: newStatus,
                  lastUpdated: new Date().toISOString(),
                };
              }
              return doc;
            }),
            lastUpdated: new Date().toISOString(),
          };
        }
        return app;
      })
    );

    toast({
      title: 'Document Status Updated',
      description: `${documentName} status changed to ${newStatus}`,
    });
  };

  const handleAssignExpert = (applicationId: string, expertName: string) => {
    setApplications(
      applications.map((app) => {
        if (app.id === applicationId) {
          return {
            ...app,
            assignedExpert: expertName,
            lastUpdated: new Date().toISOString(),
          };
        }
        return app;
      })
    );

    toast({
      title: 'Expert Assigned',
      description: `Application assigned to ${expertName}`,
    });
  };

  const handleAddNote = (applicationId: string, note: { content: string; assignedTo?: string }) => {
    setApplications(
      applications.map((app) => {
        if (app.id === applicationId) {
          return {
            ...app,
            internalNotes: [
              ...(app.internalNotes || []),
              {
                id: Date.now().toString(),
                content: note.content,
                createdBy: 'Admin',
                createdAt: new Date().toISOString(),
                assignedTo: note.assignedTo,
              },
            ],
            lastUpdated: new Date().toISOString(),
          };
        }
        return app;
      })
    );

    toast({
      title: 'Note Added',
      description: 'Internal note has been added to the application',
    });
  };

  const handleUploadDocument = (applicationId: string, file: File) => {
    // Create a new document object
    const newDocument = {
      name: file.name,
      type: file.type,
      status: 'Pending' as const,
      uploadedBy: 'Admin',
      time: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      version: 1,
      validationResults: {
        isComplete: false,
        isAccurate: false,
        suggestions: [],
        aiConfidenceScore: 0,
      },
    };

    setApplications(
      applications.map((app) => {
        if (app.id === applicationId) {
          return {
            ...app,
            documents: [...app.documents, newDocument],
            lastUpdated: new Date().toISOString(),
          };
        }
        return app;
      })
    );

    toast({
      title: 'Document Uploaded',
      description: `${file.name} has been uploaded successfully`,
    });
  };

  return {
    applications,
    isLoading,
    handleStatusChange,
    handleDocumentStatusUpdate,
    handleAssignExpert,
    handleAddNote,
    handleUploadDocument,
  };
};
