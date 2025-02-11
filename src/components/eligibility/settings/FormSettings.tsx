
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
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Form Sections</h3>
        <div className="grid gap-3">
          {sections.map((section, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
            >
              <div>
                <h4 className="font-medium">{section.title}</h4>
                <p className="text-sm text-muted-foreground">
                  Configure {section.title.toLowerCase()} requirements
                </p>
              </div>
              <Badge variant={section.required ? "default" : "secondary"}>
                {section.required ? "Required" : "Optional"}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
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
