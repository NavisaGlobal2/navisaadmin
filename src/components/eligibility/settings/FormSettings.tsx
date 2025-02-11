
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { FormSection } from "./FormSection";
import { GeneralSettings } from "./GeneralSettings";
import { formSettingsSchema, type FormSettingsValues } from "./form-settings-schema";

const defaultSections = [
  { title: "Personal Information", required: true, description: "Basic personal details", enabled: true },
  { title: "Education", required: true, description: "Educational background", enabled: true },
  { title: "Experience", required: true, description: "Work experience details", enabled: true },
  { title: "Skills", required: true, description: "Professional skills", enabled: true },
  { title: "Achievements", required: true, description: "Notable achievements", enabled: true },
  { title: "Preferred Countries", required: true, description: "Location preferences", enabled: true },
  { title: "CV Upload", required: true, description: "Resume/CV document", enabled: true },
] as const;

export const FormSettings = () => {
  const { toast } = useToast();
  const form = useForm<FormSettingsValues>({
    resolver: zodResolver(formSettingsSchema),
    defaultValues: {
      allowGuestSubmissions: false,
      enableProgressSaving: true,
      maxFileSize: 5,
      requiredFields: {
        linkedin: false,
        skills: true,
        achievements: true,
      },
      sections: defaultSections.map(section => ({
        title: section.title,
        required: section.required,
        description: section.description,
        enabled: section.enabled
      })),
    },
  });

  const onSubmit = (data: FormSettingsValues) => {
    console.log(data);
    toast({
      title: "Settings Updated",
      description: "Form settings have been successfully saved.",
    });
  };

  return (
    <div className="space-y-8" role="region" aria-label="Form Settings">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <nav aria-label="Form sections navigation">
            <h3 className="text-lg font-medium mb-4">Form Sections</h3>
            <div className="grid gap-3">
              {form.watch('sections').map((section, index) => (
                <FormSection
                  key={index}
                  index={index}
                  section={section as { title: string; required: boolean; description: string; enabled: boolean }}
                  control={form.control}
                />
              ))}
            </div>
          </nav>

          <Separator role="separator" />
          
          <GeneralSettings control={form.control} />

          <Button type="submit" className="w-full">
            Save Form Settings
          </Button>
        </form>
      </Form>
    </div>
  );
};
