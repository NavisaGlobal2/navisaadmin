
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

const formSchema = z.object({
  allowGuestSubmissions: z.boolean(),
  enableProgressSaving: z.boolean(),
  maxFileSize: z.number().min(1).max(10),
  requiredFields: z.object({
    linkedin: z.boolean(),
    skills: z.boolean(),
    achievements: z.boolean(),
  }),
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
    },
  });

  const sections = [
    { title: "Personal Information", required: true },
    { title: "Education", required: true },
    { title: "Experience", required: true },
    { title: "Skills", required: form.watch("requiredFields.skills") },
    { title: "Achievements", required: form.watch("requiredFields.achievements") },
    { title: "Preferred Countries", required: true },
    { title: "CV Upload", required: true },
  ];

  const onSubmit = (data: FormValues) => {
    console.log(data);
    toast({
      title: "Settings Updated",
      description: "Form settings have been successfully saved.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Form Sections</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {sections.map((section, index) => (
            <Card key={index} className="bg-white/5">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {section.title}
                </CardTitle>
                <Badge variant={section.required ? "default" : "secondary"}>
                  {section.required ? "Required" : "Optional"}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-400">
                  Manage {section.title.toLowerCase()} section settings
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="allowGuestSubmissions"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
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
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
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
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
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
                    className="w-20"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Save Form Settings
          </Button>
        </form>
      </Form>
    </div>
  );
};
