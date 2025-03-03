
import { Application } from '@/types/application';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, User } from 'lucide-react';
import { getStatusConfig } from '@/utils/applicationStatusUtils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ApplicationsTableProps {
  applications: Application[];
  onApplicationSelect: (application: Application) => void;
  onAssignExpert: (applicationId: string, expertName: string) => void;
  isLoading?: boolean;
}

export const ApplicationsTable = ({ applications, onApplicationSelect, onAssignExpert, isLoading = false }: ApplicationsTableProps) => {
  const getStatusBadge = (status: Application['status']) => {
    const config = getStatusConfig(status);
    return (
      <Badge variant='secondary' className={config?.className}>
        {config?.icon && <config.icon className='w-3 h-3 mr-1' />}
        {status}
      </Badge>
    );
  };

  return (
    <TooltipProvider>
      <Card>
        <CardHeader>
          <CardTitle>All Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    <div className="flex items-center justify-center">
                      <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
                      <span>Loading applications...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : applications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No applications found.
                  </TableCell>
                </TableRow>
              ) : (
                applications.map((app) => (
                  <TableRow
                    key={app.id}
                    className='cursor-pointer hover:bg-accent/50'
                    onClick={() => onApplicationSelect(app)}
                  >
                    <TableCell>
                      <div className='flex items-center space-x-2'>
                        <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center'>
                          <User className='w-4 h-4' />
                        </div>
                        <div>
                          <div className='font-medium'>
                            {app.user?.first_name} {app.user?.last_name}
                          </div>
                          <div className='text-sm text-muted-foreground'>{app?.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{app.visa_type}</TableCell>
                    <TableCell>{app.stage}</TableCell>
                    <TableCell>{getStatusBadge(app.status)}</TableCell>
                    <TableCell>{new Date(app.updated_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
