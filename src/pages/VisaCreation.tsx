import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { adminApi } from '@/services/api';
import { VISA_TYPES, VisaType, VisaFormData } from '@/types/visa';
import { getDefaultValues, formatFormData } from '@/utils/visaFormUtils';
import { UKGlobalTalentForm } from '@/components/visa-forms/UKGlobalTalentForm';
import { USEBVisaForm } from '@/components/visa-forms/USEBVisaForm';
import { CanadaExpressEntryForm } from '@/components/visa-forms/CanadaExpressEntryForm';
import { DubaiGoldenVisaForm } from '@/components/visa-forms/DubaiGoldenVisaForm';
import { VisaCriteriaList } from '@/components/eligibility/settings/VisaCriteriaList';
import { useAuth } from '@/context/AuthContext';

const VisaCreation = () => {
  const { toast } = useToast();
  const [selectedVisaType, setSelectedVisaType] = useState<VisaType | null>(null);

  const { user } = useAuth();

  const { data = [], isLoading } = useQuery({
    queryKey: ['visas'],
    queryFn: adminApi.getAllVisas,
  });

  const [visas, setVisas] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setVisas(data.data);
    }
    console.log(data);
  }, [isLoading]);

  useEffect(() => {}, []);

  const getExistingVisaCriteria = (visaType: VisaType) => {
    const existingVisa = visas.find((v: any) => v.visa_name === visaType);
    return existingVisa?.criteras || getDefaultValues(visaType);
  };

  const form = useForm<VisaFormData>({
    defaultValues: selectedVisaType ? getExistingVisaCriteria(selectedVisaType) : {},
  });

  const createVisaMutation = useMutation({
    mutationFn: (data: { visaName: string; formData: VisaFormData }) =>
      adminApi.createVisa(data.visaName, data.formData),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Visa criteria created successfully',
      });
      form.reset();
      setSelectedVisaType(null);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create visa criteria',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: VisaFormData) => {
    if (!selectedVisaType) return;
    createVisaMutation.mutate({
      visaName: selectedVisaType,
      formData: formatFormData(selectedVisaType, data),
    });
  };

  const handleVisaTypeChange = (value: VisaType) => {
    setSelectedVisaType(value);
    form.reset(getExistingVisaCriteria(value));
  };

  const renderVisaForm = () => {
    switch (selectedVisaType) {
      case 'UK Global Talent Visa':
        return <UKGlobalTalentForm form={form} />;
      case 'US EB-1/EB-2 VISA':
        return <USEBVisaForm form={form} />;
      case 'CANADA EXPRESS ENTRY':
        return <CanadaExpressEntryForm form={form} />;
      case 'DUBAI GOLDEN VISA':
        return <DubaiGoldenVisaForm form={form} />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      {user.role === 'super_admin' ? (
        <div className='space-y-6 p-6'>
          <div>
            <h1 className='text-2xl font-semibold'>Visa Criteria Management</h1>
            <p className='text-sm text-muted-foreground mt-1'>
              View and manage scoring criteria for different visa types
            </p>
          </div>

          <VisaCriteriaList />

          <Card>
            <CardHeader>
              <CardTitle>Create or Update Visa Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                  <div>
                    <Select onValueChange={handleVisaTypeChange} value={selectedVisaType || undefined}>
                      <SelectTrigger>
                        <SelectValue placeholder='Select visa type' />
                      </SelectTrigger>
                      <SelectContent>
                        {VISA_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedVisaType && renderVisaForm()}

                  <Button type='submit' className='w-full' disabled={createVisaMutation.isPending}>
                    {createVisaMutation.isPending ? 'Creating...' : 'Create Visa Criteria'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className='space-y-6 p-6'>
          <h1>Not Authorized</h1>
          <p>You need to be a Super Admin to view this page</p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default VisaCreation;
