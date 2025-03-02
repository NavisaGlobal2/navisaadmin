
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { UserDetails, UserDocument } from '@/types/user';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UserDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userDetails: UserDetails | null;
  isLoading: boolean;
}

const UserDetailsDialog: React.FC<UserDetailsDialogProps> = ({ isOpen, onClose, userDetails, isLoading }) => {
  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Loading User Details</DialogTitle>
            <DialogDescription>Please wait while we fetch the user details...</DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!userDetails) {
    return null;
  }

  const { data: user, user_documents, user_assessment } = userDetails;

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const handleDownloadDocument = (document: UserDocument) => {
    window.open(document.signedUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            {user_assessment?.personal?.fullName || `${user.first_name || ''} ${user.last_name || ''}`}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="personal">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="assessment">Assessment</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
                <CardDescription>Basic details about the user</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                    <p>
                      {user_assessment?.personal?.fullName ||
                        `${user.first_name || 'Not set'} ${user.last_name || ''}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p>{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">ID</p>
                    <p className="text-xs font-mono">{user.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Joined</p>
                    <p>{formatDate(user.created_at)}</p>
                  </div>
                  {user_assessment?.personal?.nationality && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Nationality</p>
                      <p>{user_assessment.personal.nationality}</p>
                    </div>
                  )}
                  {user_assessment?.personal?.currentLocation && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Current Location</p>
                      <p>{user_assessment.personal.currentLocation}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assessment" className="space-y-4">
            {user_assessment ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Assessment Data</CardTitle>
                    <CardDescription>User assessment details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Field</p>
                        <p className="capitalize">{user_assessment.assessment_data.field}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Language Proficiency</p>
                        <p className="capitalize">{user_assessment.assessment_data.language}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Education</p>
                        <p className="capitalize">{user_assessment.assessment_data.education}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Position Category</p>
                        <p className="capitalize">{user_assessment.assessment_data.positionCategory}</p>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="text-sm font-medium">Experience</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Years</p>
                          <p>{user_assessment.assessment_data.experience.years}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Position</p>
                          <p className="capitalize">{user_assessment.assessment_data.experience.position}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Foreign Years</p>
                          <p>{user_assessment.assessment_data.experience.foreignYears}</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="text-sm font-medium">Achievements</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Achievement Count</p>
                          <p>{user_assessment.assessment_data.achievement.achievementCount}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Achievement Impact</p>
                          <p>{user_assessment.assessment_data.achievement.achievementImpact}</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="text-sm font-medium">Financial Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Salary Category</p>
                          <p className="capitalize">{user_assessment.assessment_data.salaryCategory}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Financial Category</p>
                          <p className="capitalize">{user_assessment.assessment_data.financialCategory}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Assessment Scores</CardTitle>
                    <CardDescription>Visa eligibility scores</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {user_assessment.score.uk && (
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-2 flex items-center justify-between">
                            UK Global Talent
                            <Badge variant={user_assessment.score.uk.finalScore >= 70 ? 'success' : 'destructive'}>
                              {user_assessment.score.uk.finalScore >= 70 ? 'Eligible' : 'Not Eligible'}
                            </Badge>
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Education</span>
                              <span>{user_assessment.score.uk.education}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Experience</span>
                              <span>{user_assessment.score.uk.experience}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Achievements</span>
                              <span>{user_assessment.score.uk.achievements}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-medium">
                              <span>Final Score</span>
                              <span>{user_assessment.score.uk.finalScore}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {user_assessment.score.us && (
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-2 flex items-center justify-between">
                            US EB-1/EB-2
                            <Badge variant={user_assessment.score.us.finalScore >= 70 ? 'success' : 'destructive'}>
                              {user_assessment.score.us.finalScore >= 70 ? 'Eligible' : 'Not Eligible'}
                            </Badge>
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Education</span>
                              <span>{user_assessment.score.us.education}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Experience</span>
                              <span>{user_assessment.score.us.experience}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Achievements</span>
                              <span>{user_assessment.score.us.achievements}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-medium">
                              <span>Final Score</span>
                              <span>{user_assessment.score.us.finalScore}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {user_assessment.score.canada && (
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-2 flex items-center justify-between">
                            Canada Express Entry
                            <Badge variant={user_assessment.score.canada.finalScore >= 67 ? 'success' : 'destructive'}>
                              {user_assessment.score.canada.finalScore >= 67 ? 'Eligible' : 'Not Eligible'}
                            </Badge>
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Language</span>
                              <span>{user_assessment.score.canada.language}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Education</span>
                              <span>{user_assessment.score.canada.education}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Work Experience</span>
                              <span>{user_assessment.score.canada.workExperience}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-medium">
                              <span>Final Score</span>
                              <span>{user_assessment.score.canada.finalScore}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {user_assessment.score.dubai && (
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-2 flex items-center justify-between">
                            Dubai Golden Visa
                            <Badge variant={user_assessment.score.dubai.finalScore >= 65 ? 'success' : 'destructive'}>
                              {user_assessment.score.dubai.finalScore >= 65 ? 'Eligible' : 'Not Eligible'}
                            </Badge>
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Professional</span>
                              <span>{user_assessment.score.dubai.professional}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Financial</span>
                              <span>{user_assessment.score.dubai.financial}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-medium">
                              <span>Final Score</span>
                              <span>{user_assessment.score.dubai.finalScore}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center py-8">
                  <p className="text-muted-foreground">No assessment data available for this user.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            {user_documents && user_documents.data && user_documents.data.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>User Documents</CardTitle>
                  <CardDescription>Documents uploaded by the user</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {user_documents.data.map((document, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{document.path.split('/').pop()}</p>
                            <p className="text-xs text-muted-foreground">
                              {document.path.split('/').slice(-3, -1).join(' > ')}
                            </p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => handleDownloadDocument(document)}>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center py-8">
                  <p className="text-muted-foreground">No documents available for this user.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsDialog;
