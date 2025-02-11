
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  allowGuestSubmissions: z.boolean(),
  enableProgressSaving: z.boolean(),
  maxFileSize: z.number().min(1).max(10),
  requiredFields: z.object({
    linkedin: z.boolean(),
    skills: z.boolean(),
    achievements: z.boolean(),
  }),
  sections: z.array(z.object({
    title: z.string(),
    required: z.boolean(),
    description: z.string(),
    enabled: z.boolean()
  }))
});

type FormValues = z.infer<typeof formSchema>;

export const FormSettings = () => {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      allowGuestSubmissions: false,
      enableProgressSaving: true,
      maxFileSize: 5,
      requiredFields: {
        linkedin: false,
        skills: true,
        achievements: true,
      },
      sections: [
        { title: "Personal Information", required: true, description: "Basic personal details", enabled: true },
        { title: "Education", required: true, description: "Educational background", enabled: true },
        { title: "Experience", required: true, description: "Work experience details", enabled: true },
        { title: "Skills", required: true, description: "Professional skills", enabled: true },
        { title: "Achievements", required: true, description: "Notable achievements", enabled: true },
        { title: "Preferred Countries", required: true, description: "Location preferences", enabled: true },
        { title: "CV Upload", required: true, description: "Resume/CV document", enabled: true },
      ]
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    toast({
      title: "Settings Updated",
      description: "Form settings have been successfully saved.",
    });
  };

  return (
    <div className="space-y-8" role="region" aria-label="Form Settings">
      <nav aria-label="Form sections navigation">
        <h3 className="text-lg font-medium mb-4">Form Sections</h3>
        <div className="grid gap-3">
          {form.watch('sections').map((section, index) => (
            <div 
              key={index} 
              className="p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
              role="region"
              aria-label={`${section.title} section settings`}
            >
              <FormField
                control={form.control}
                name={`sections.${index}.enabled`}
                render={({ field }) => (
                  <div className="flex items-center justify-between mb-2">
                    <FormLabel className="text-base font-medium cursor-pointer">
                      {section.title}
                    </FormLabel>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-label={`Enable ${section.title} section`}
                    />
                  </div>
                )}
              />
              
              {form.watch(`sections.${index}.enabled`) && (
                <div className="space-y-4 mt-4 pl-4 border-l">
                  <FormField
                    control={form.control}
                    name={`sections.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Section description"
                            className="h-8"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`sections.${index}.required`}
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            aria-label={`Make ${section.title} required`}
                          />
                        </FormControl>
                        <FormLabel className="text-sm">
                          Required field
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      <Separator role="separator" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4" role="region" aria-label="General settings">
            <FormField
              control={form.control}
              name="allowGuestSubmissions"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg p-4 border">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Guest Submissions</FormLabel>
                    <FormDescription>
                      Allow non-authenticated users to submit assessments
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="enableProgressSaving"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg p-4 border">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Progress Saving</FormLabel>
                    <FormDescription>
                      Enable users to save their progress and continue later
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxFileSize"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg p-4 border">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Max File Size (MB)</FormLabel>
                    <FormDescription>
                      Maximum allowed size for CV uploads
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="w-24"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full">
            Save Form Settings
          </Button>
        </form>
      </Form>
    </div>
  );
};
