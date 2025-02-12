
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Control } from "react-hook-form";
import { FormSettingsValues } from "./form-settings-schema";

type FormSection = {
  title: string;
  required: boolean;
  description: string;
  enabled: boolean;
};

interface FormSectionProps {
  index: number;
  section: FormSection;
  control: Control<FormSettingsValues>;
}

export const FormSection = ({ index, section, control }: FormSectionProps) => {
  return (
    <div 
      className="p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
      role="region"
      aria-label={`${section.title} section settings`}
    >
      <FormField
        control={control}
        name={`sections.${index}.enabled`}
        render={({ field }) => (
          <div className="flex items-center justify-between mb-2">
            <FormLabel className="text-base font-medium cursor-pointer">
              {section.title}
            </FormLabel>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-label={`Enable ${section.title} section`}
              />
            </FormControl>
          </div>
        )}
      />
      
      {section.enabled && (
        <div className="space-y-4 mt-4 pl-4 border-l">
          <FormField
            control={control}
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
            control={control}
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
  );
};
