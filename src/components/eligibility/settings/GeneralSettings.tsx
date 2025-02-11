
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Control } from "react-hook-form";
import { FormSettingsValues } from "./form-settings-schema";

interface GeneralSettingsProps {
  control: Control<FormSettingsValues>;
}

export const GeneralSettings = ({ control }: GeneralSettingsProps) => {
  return (
    <div className="space-y-4" role="region" aria-label="General settings">
      <FormField
        control={control}
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
        control={control}
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
        control={control}
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
  );
};
